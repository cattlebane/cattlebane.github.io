import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";

export default function Education() {
  return (
    <>
      <Head>
        <title>Jacques Altounian - Creative Technologist - Education</title>
      </Head>

      <Page title="Education">
        <p className={styles.description}>My Education</p>
      </Page>
    </>
  );
}
