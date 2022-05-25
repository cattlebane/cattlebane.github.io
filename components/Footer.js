import Link from "next/link";

import styles from "@styles/components/footer.module.scss";

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      {/* <p>Powered by the love of marketing and tech</p> */}
      <h1>Powered by the love of great user experience</h1>
      <p>
        <Link href="mailto:cattlebane@gmail.com">
          <a className={styles["btn-text"]} target="_blank">
            cattlebane@gmail.com
          </a>
        </Link>
      </p>
      <p>
        <a className={styles["btn-text"]} href="tel:3109877609">
          (310) 987-7609
        </a>
      </p>
    </footer>
  );
};

export default Footer;
