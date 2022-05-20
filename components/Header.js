import styles from "@styles/components/Header.module.scss";
import btnStyles from "@styles/components/button.module.scss";
import Link from "next/link";
import GlobalNav from "./GlobalNav";

const Header = (props) => {
  return (
    <header className={styles.Header}>
      <div className={styles["Header-lockup"]}>
        <Link href="/">
          <a className={`${btnStyles["btn-global-controls"]} ${btnStyles["btn-global-controls-white"]} ${styles["Header-lockup-apple"]}`}>
            <span className={btnStyles["btn-global-controls-icon"]}></span> Jacques
          </a>
        </Link>
        <h1 className={styles["Header-lockup-title"]}>
          &nbsp;
          <GlobalNav />
        </h1>
      </div>
    </header>
  );
};

export default Header;
