import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Jacques Altounian - Creative Technologist - Projects</title>
      </Head>

      <Page title="Projects">
        <p className={styles.description}>Tons of projects</p>
      </Page>
    </>
  );
}
