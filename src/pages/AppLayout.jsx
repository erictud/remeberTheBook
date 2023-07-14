import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import { useBooksContext } from "../context/BooksContext";
import ErrorModal from "../components/ErrorModal";

export default function AppLayout() {
  const { error } = useBooksContext();
  return (
    <div className="page">
      {error && <ErrorModal />}
      <h1 className={styles["title-logo"]}>
        <span>remember</span>The<span>Book</span>
      </h1>
      <Outlet />
    </div>
  );
}
