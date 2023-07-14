import { Link, NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import { useState } from "react";
import LogoIcon from "../icons/LogoIcon";
import NavIcon from "../icons/NavIcon";
import CloseNavIcon from "../icons/CloseNavIcon";
import { useAuth } from "../context/FakeAuthCtx";
import User from "./User";

export default function Nav() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <LogoIcon />
        </Link>
      </div>
      <button
        className={`btn-transparent ${styles["nav-btn"]}`}
        onClick={() => setNavIsOpen((prev) => !prev)}
      >
        {!navIsOpen ? <NavIcon /> : <CloseNavIcon />}
      </button>
      {navIsOpen && (
        <div className={styles.nav}>
          <img src="../logo.png" alt="application logo" />
          {isAuthenticated && <User />}
          <ul className={styles["link-list"]} onClick={() => setNavIsOpen((prev) => !prev)}>
            <li className={styles["link-item"]}>
              <NavLink to="/">Home</NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li className={styles["link-item"]}>
                  <NavLink to="app/books">All books read</NavLink>
                </li>
                <li className={styles["link-item"]}>
                  <NavLink to="app/form">Add Book</NavLink>
                </li>
              </>
            )}
            {!isAuthenticated ? (
              <button className="btn">
                <Link to="login">Login</Link>
              </button>
            ) : (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
          </ul>
          <p className={styles["credits"]}>App made by Tudorica Eric</p>
        </div>
      )}
    </header>
  );
}
