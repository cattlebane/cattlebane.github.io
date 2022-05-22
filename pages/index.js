import { useContext, useEffect } from "react";
import userContext from "../store/user-context";
import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";

export default function Home() {
  const userCtx = useContext(userContext);

  useEffect(() => {
    console.log("Home");
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

  useEffect(() => {
    console.log("Home");
    console.log(" » userCtx.data:", userCtx.data);
  }, [userCtx.data]);

  return <Page title="Home">{userCtx.data ? <p className={styles.description}>Lets put a reel here</p> : <h1 className={styles.title}>LOADING</h1>}</Page>;
}
