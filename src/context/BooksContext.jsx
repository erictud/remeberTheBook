import { createContext, useContext, useReducer } from "react";

const BooksContext = createContext();

function reducer(state, action) {}

const initialState = {
  isLoading: false,
  books: [],
  currentBook: {},
  error: "",
};

const BooksProvider = function ({ children }) {
  const [{ isLoading, books, error, currentBook }, dispatch] = useReducer(reducer, initialState);

  return (
    <BooksContext.Provider
      value={{
        isLoading,
        books,
        error,
        currentBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

const useBookContext = () => {
  const ctx = useContext(BooksContext);
  if (ctx === undefined) throw new Error("Cannot use the book context outside its provider!");
  return ctx;
};

export { BooksProvider, useBookContext };
