import { useContext, useEffect, useState } from "react";
import userContext from "../store/user-context";
// import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";
// import Card from "components/Card";
import BioCard from "components/BioCard";
import siteData from "../data/site-data.json";
import About from "./about";

export default function Home() {
  /* const userCtx = useContext(userContext);
  const [basics, setBasics] = useState(null);

  useEffect(() => {
    console.log("Home");
    console.log(" » userCtx.data:", userCtx.data);
    if (userCtx.data) {
    } else {
      const getData = async () => {
        console.log("   » getData()");
        // using local site-data.json instead of remote API
        const data = siteData;

        console.log("   » data:", data);
        userCtx.setData(data);
      };
      getData();
    }
  }, [userCtx.data]); */

  // return <Page title="">{userCtx.data ? <BioCard basics={userCtx.data.basics} /> : ""}</Page>;
  // return <Page title="">{userCtx.data ? <About basics={userCtx.data.basics} /> : ""}</Page>;
  // return <Page title="">{userCtx.data ? <About /> : ""}</Page>;
  return <About />;
}
