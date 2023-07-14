import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./FakeAuthCtx";

const BooksContext = createContext();

const URL = "http://localhost:8000/books";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "books/loaded":
      return { ...state, books: action.payload, isLoading: false };
    case "book/loaded":
      return { ...state, currentBook: action.payload, isLoading: false };
    case "book/deleted":
      return {
        ...state,
        isLoading: false,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case "book/created":
      return {
        ...state,
        isLoading: false,
        books: [...state.books, action.payload],
      };
    case "clearError":
      return { ...state, error: "" };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error(`${action.type} action not supported`);
  }
}

const initialState = {
  isLoading: false,
  books: [],
  currentBook: {},
  error: "",
};

const BooksContextProvider = function ({ children }) {
  const [{ isLoading, books, error, currentBook }, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    async function getBooks() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(URL);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "books/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: "There was an error when fetching the books" });
      }
    }
    getBooks();
  }, [isAuthenticated]);

  const getBook = useCallback(
    async function getBook(id) {
      if (+id === +currentBook.id) return;
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${URL}/${id}`);
        const data = await res.json();
        dispatch({ type: "book/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: "There was an error when fetching the book" });
      }
    },
    [currentBook.id]
  );

  async function deleteBook(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "book/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: "There was an error when deleting the book" });
    }
  }

  async function createBook(book) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}`, {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "book/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "There was an error when creating the book" });
    }
  }

  return (
    <BooksContext.Provider
      value={{
        isLoading,
        books,
        error,
        currentBook,
        getBook,
        deleteBook,
        dispatch,
        createBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

const useBooksContext = () => {
  const ctx = useContext(BooksContext);
  if (ctx === undefined) throw new Error("Cannot use the book context outside its provider!");
  return ctx;
};

export { BooksContextProvider, useBooksContext };
