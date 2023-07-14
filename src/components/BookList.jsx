import { useBooksContext } from "../context/BooksContext";
import BookItem from "./BookItem";
import styles from "./BookList.module.css";
import SpinnerFullPage from "./SpinnerFullPage";

export default function BookList() {
  const { books, isLoading, deleteBook } = useBooksContext();

  return (
    <>
      {isLoading ? (
        <SpinnerFullPage />
      ) : (
        <div className={styles["books-container"]}>
          <h2>All books read</h2>
          <ul className={styles["books-list"]}>
            {books.map((book) => (
              <BookItem
                name={book.name}
                id={book.id}
                stars={book.nrOfStars}
                key={book.id}
                onClick={(e) => {
                  e.preventDefault();
                  deleteBook(book.id);
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
