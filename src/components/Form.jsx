import { useState } from "react";
import styles from "./Form.module.css";
import LogoIcon from "../icons/LogoIcon";
import UserIcon from "../icons/UserIcon";
import CalendarIcon from "../icons/CalendarIcon";
import BookIcon from "../icons/BookIcon";
import { useBooksContext } from "../context/BooksContext";
import StarRating from "./StarRating";
import { StarIconFilled } from "../icons/StarIcon";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [numOfPages, setNumOfPages] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [review, setReview] = useState("");
  const [nrOfStars, setNrOfStarts] = useState(0);

  const { dispatch, createBook, isLoading } = useBooksContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // ERROR HANDLING
    if (
      !name.trim() ||
      !author.trim() ||
      numOfPages === 0 ||
      !startingDate ||
      !endDate ||
      nrOfStars === 0
    ) {
      dispatch({ type: "rejected", payload: "Make sure you introduce all values" });
      return;
    }
    if (startingDate > endDate) {
      dispatch({ type: "rejected", payload: "Make sure you introduce two valid date" });
      return;
    }

    await createBook({
      name,
      endDate,
      author,
      nrOfStars,
      numOfPages,
      startingDate,
      review,
    });
    navigate("/app");
  }

  return (
    <div>
      <form
        className={`${styles.form} ${isLoading ? styles["loading"] : ""}`}
        onSubmit={handleSubmit}
      >
        <h1>Add a book</h1>
        <div className={styles["input-container"]}>
          <div>
            <LogoIcon />
            <label htmlFor="name">Name of the book</label>
          </div>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles["input-container"]}>
          <div>
            <UserIcon />
            <label htmlFor="author">Author</label>
          </div>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className={styles["input-container"]}>
          <div>
            <BookIcon />
            <label htmlFor="numPages">number of pages</label>
          </div>
          <input
            type="number"
            id="numPages"
            value={numOfPages}
            onChange={(e) => setNumOfPages(e.target.value)}
          />
        </div>
        <div className={styles["input-container"]}>
          <div>
            <CalendarIcon />
            <label htmlFor="startDate">Start date</label>
          </div>
          <input
            type="date"
            id="startDate"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
          />
        </div>
        <div className={styles["input-container"]}>
          <div>
            <CalendarIcon />
            <label htmlFor="endDate">End date</label>
          </div>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={styles["input-container"]}>
          <div>
            <StarIconFilled />
            <label htmlFor="star">Give it a note</label>
          </div>
          <StarRating
            id="star"
            size="22"
            defaultRating={nrOfStars}
            maxRating={10}
            onSetRating={setNrOfStarts}
          />
        </div>
        <div className={styles["input-container"]}>
          <div>
            <CalendarIcon />
            <label htmlFor="review">Review</label>
          </div>
          <textarea
            type="text"
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <button disabled={isLoading} className="btn">
          Add Book{" "}
        </button>
      </form>
    </div>
  );
}
