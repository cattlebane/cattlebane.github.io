import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";

export default function About() {
  return (
    <>
      <Head>
        <title>Jacques Altounian - Creative Technologist - About</title>
      </Head>

      <Page title="About">
        <p className={styles.description}>About Me!</p>
        <br />
        <ul>
          <li>My thesis statement</li>
          <li>My skills</li>
          <li>My languages</li>
          <li>My awards</li>
          <li>My hobbies (guitar/photography/toy collecting</li>
        </ul>
      </Page>
    </>
  );
}
