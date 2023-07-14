import { Link } from "react-router-dom";
import LightBulbIcon from "../icons/LightBulbIcon";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className="page">
      <div className={styles["app-hero-section"]}>
        <h1>
          <span>remember</span>The <span>Book</span>
        </h1>
        <p>
          You can now store in a concise manner the information and the opinion about every book
          you've read
        </p>
        <button className="btn">
          <Link to="login">Login</Link>
        </button>
      </div>
      <h2 className={styles.title}>Features</h2>
      <div className={styles["feature-row"]}>
        <div className={styles.feature}>
          <LightBulbIcon />
          <h3>feature</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, corporis.</p>
        </div>
        <div className={styles.feature}>
          <LightBulbIcon />
          <h3>feature</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, corporis.</p>
        </div>
        <div className={styles.feature}>
          <LightBulbIcon />
          <h3>feature</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, corporis.</p>
        </div>
        <div className={styles.feature}>
          <LightBulbIcon />
          <h3>feature</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, corporis.</p>
        </div>
      </div>
    </main>
  );
}
