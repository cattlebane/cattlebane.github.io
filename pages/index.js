import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect } from "react";
import userContext from "../store/user-context";
import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";

export default function Home() {
  const userCtx = useContext(userContext);

  useEffect(() => {
    console.log("Projects");
    console.log(" » userCtx.data:", userCtx.data);

    const getData = async () => {
      console.log("   » getData()");
      // const response = await fetch('/api/projects')
      const response = await fetch("https://gitconnected.com/v1/portfolio/cattlebane");

      const data = await response.json();

      console.log("   » data:", data);
      userCtx.setData(data);
    };

    getData();
  }, []);

  // useEffect(() => {}, [userCtx.data])

  return <Page title="Home">{userCtx.data ? <p className={styles.description}>Lets put a reel here</p> : <h1 className={styles.title}>LOADING</h1>}</Page>;
}
