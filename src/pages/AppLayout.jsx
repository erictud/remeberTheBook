import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className="page">
      <h1 className={styles["title-logo"]}>
        <span>remember</span>The<span>Book</span>
      </h1>
      <Outlet />
    </div>
  );
}
