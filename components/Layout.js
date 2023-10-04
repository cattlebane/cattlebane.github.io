import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

import styles from "@styles/components/layout.module.scss";

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

      <Footer />
    </div>
  );
};

export default Layout;
