import { useBooksContext } from "../context/BooksContext";
import styles from "./ErrorModal.module.css";

export default function ErrorModal() {
  const { error, dispatch } = useBooksContext();

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <button
          onClick={() => {
            dispatch({ type: "clearError" });
          }}
        >
          {" "}
          &times;
        </button>
        <h1>💀 Something went wrong</h1>
        <p>{error}</p>
      </div>
    </>
  );
}
