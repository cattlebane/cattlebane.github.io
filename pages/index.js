import { useContext, useEffect, useState } from "react";
import userContext from "../store/user-context";
// import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";
// import Card from "components/Card";
import BioCard from "components/BioCard";
import siteData from "../data/site-data.json";

export default function Home() {
  const userCtx = useContext(userContext);
  const [basics, setBasics] = useState(null);

  useEffect(() => {
    console.log("Home");
    console.log(" » userCtx.data:", userCtx.data);
    if (userCtx.data) {
      /* const { name, label, image, headline, summary } = userCtx.data.basics;
      const basicsItems = (
        <ul>
          <li className={styles.headline}>
            <img src={image || ""} alt="hero image" style={{ width: "100px" }} />
            <div className={styles.copyBlock}>
              <h2>{label || ""}</h2>
              <h3>{headline || ""}</h3>
            </div>
          </li>
          <li></li>
          <li>
            <p>{summary || ""}</p>
          </li>
        </ul>
      );
      setBasics(basicsItems); */
    } else {
      const getData = async () => {
        console.log("   » getData()");
        // using local site-data.json instead of remote API
        const data = siteData;

        console.log("   » data:", data);
        userCtx.setData(data);
      };
      getData();
      /* const getData = async () => {
        console.log("   » getData()");
        // const response = await fetch('/api/projects')
        const response = await fetch("https://gitconnected.com/v1/portfolio/cattlebane");

        const data = await response.json();

        console.log("   » data:", data);
        userCtx.setData(data);
      };
      getData(); */
    }
  }, [userCtx.data]);

  return <Page title="">{userCtx.data ? <BioCard basics={userCtx.data.basics} /> : ""}</Page>;
}
