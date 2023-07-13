import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthCtx";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("user@user.com");
  const [password, setPassword] = useState("12345678");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="page">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className={styles["input-container"]}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn">Login</button>
      </form>
    </div>
  );
}
