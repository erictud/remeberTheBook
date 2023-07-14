import { Link } from "react-router-dom";
import { StarIconFilled } from "../icons/StarIcon";
import styles from "./BookItem.module.css";

export default function BookItem({ name, stars, id, onClick }) {
  return (
    <li className={styles["book-item"]}>
      <Link to={`${id}`}>
        <h4>{name}</h4>
        <div>
          <p>{stars}</p>
          <StarIconFilled />
        </div>
        <button onClick={onClick} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}
