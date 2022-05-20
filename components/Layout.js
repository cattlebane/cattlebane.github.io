import Head from "next/head";
import Header from "./Header";
import styles from "@styles/components/layout.module.scss";
import Link from "next/link";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Jacques Altounian - Creative Technologist</title>
        <meta
          name="description"
          content="Breathing life into user experiences through intuitive interactive development and animation. Hailing from a background of digital/ad agencies, he specializes in a wide range of digital marketing disciplines. Constantly learning new tech and building tools to achieve his goals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {props.children}

      <footer className={styles.footer}>
        <p>Powered by the love of marketing and tech</p>
        <p>
          <Link href="mailto:cattlebane@gmail.com">
            <a target="_blank">cattlebane@gmail.com</a>
          </Link>
        </p>
        <p>
          <a href="tel:3109877609">(310) 987-7609</a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
