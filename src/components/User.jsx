import { useAuth } from "../context/FakeAuthCtx";
import UserIcon from "../icons/UserIcon";
import styles from "./User.module.css";

export default function User() {
  const { user } = useAuth();
  return (
    <div className={styles.user}>
      <UserIcon />
      <div className={styles["user-details"]}>
        <h5>{user?.username}</h5>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}
