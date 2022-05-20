import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";

export default function Experience() {
  return (
    <>
      <Head>
        <title>Jacques Altounian - Creative Technologist - Experience</title>
      </Head>

      <Page title="Experience">
        <p className={styles.description}>Tons of Experience</p>
      </Page>
    </>
  );
}
