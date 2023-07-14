import { useNavigate, useParams } from "react-router-dom";
import styles from "./Book.module.css";
import { useBooksContext } from "../context/BooksContext";
import { useEffect } from "react";
import SpinnerFullPage from "./SpinnerFullPage";
import CalendarIcon from "../icons/CalendarIcon";
import BookIcon from "../icons/BookIcon";
import { StarIconFilled, StarIcon } from "../icons/StarIcon";
import UserIcon from "../icons/UserIcon";

export default function Book() {
  const { bookId } = useParams();
  const { isLoading, currentBook, getBook } = useBooksContext();
  const { name, startingDate, endDate, nrOfPages, nrOfStars, review, author } = currentBook;
  const navigate = useNavigate();

  useEffect(() => {
    getBook(bookId);
  }, [bookId, getBook]);

  const arr = [];
  for (let i = 1; i <= 10; i++) {
    if (i <= nrOfStars) arr[i] = <StarIconFilled key={i} />;
    else arr[i] = <StarIcon key={i} />;
  }

  return (
    <>
      {isLoading ? (
        <SpinnerFullPage />
      ) : (
        <div className={styles.book}>
          <button className="back-btn btn" onClick={() => navigate(-1)}>
            &larr; Back
          </button>
          <h1>{name}</h1>
          <div className={styles["general-information"]}>
            <h2>general information</h2>
            <div className={styles["book-information"]}>
              <CalendarIcon />
              <h4>
                <span>start date -</span> {startingDate}
              </h4>
            </div>
            <div className={styles["book-information"]}>
              <CalendarIcon />
              <h4>
                <span>end date -</span> {endDate}
              </h4>
            </div>
            <div className={styles["book-information"]}>
              <UserIcon />
              <h4>
                <span>author -</span> {author}
              </h4>
            </div>
            <div className={styles["book-information"]}>
              <BookIcon />
              <h4>
                <span>num of pages -</span> {nrOfPages}
              </h4>
            </div>
          </div>
          <div className={styles["general-information"]}>
            <h2>you rated the book with: {nrOfStars}/10</h2>
            {nrOfStars && <div className={styles["stars-row"]}>{arr.map((el, i) => el)}</div>}
          </div>
          <p>{review}</p>
        </div>
      )}
    </>
  );
}
