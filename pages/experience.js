import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Page from "components/Page";
import userContext from "../store/user-context";
import Card from "components/Card";

import styles from "@styles/pages/experience.module.scss";

export default function Experience() {
  const [experiences, setExperiences] = useState(null);
  const userCtx = useContext(userContext);

  useEffect(() => {
    console.log("Experience");
    console.log(" » userCtx.data:", userCtx.data);
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUN", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    if (userCtx.data) {
      const experienceItems = userCtx.data.work.map((work, index) => {
        return (
          <li key={`work-${index}`} className={styles.section}>
            <Card>
              <h3>
                <span className={styles.workName}>{work.name}</span>, {work.location.split(",")[0]} - {work.position}
              </h3>
              <h4>
                {months[work.start.month - 1]} {work.start.year} - {months[work.end.month - 1]} {work.end.year}
              </h4>
              <p>{work.summary}</p>
              <li>
                <ul>
                  {work.highlights.map((highlight, index) => {
                    return <li key={`highlight-${index}`}>{highlight}</li>;
                  })}
                </ul>
              </li>
            </Card>
          </li>
        );
      });

      setExperiences(experienceItems);
    } else {
      const getData = async () => {
        console.log("   » getData()");
        const response = await fetch("https://gitconnected.com/v1/portfolio/cattlebane");

        const data = await response.json();

        console.log("   » data:", data);
        userCtx.setData(data);
      };
      getData();
    }
  }, [userCtx.data]);

  return (
    <>
      <Head>
        <title>Jacques Altounian - Creative Technologist - Experience</title>
      </Head>

      <Page title="" className={styles.experience}>
        <ul>{experiences || ""}</ul>
      </Page>
    </>
  );
}
