import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";
import userContext from "../store/user-context";

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
          <li key={`work-${index}`} style={{ border: "1px solid grey", margin: "15px" }}>
            <ul>
              <li>
                {work.name}, {work.location.split(",")[0]} - {work.position}
              </li>
              <li>
                {months[work.start.month - 1]} {work.start.year} - {months[work.end.month - 1]} {work.end.year}
              </li>
              <li>{work.summary}</li>
              <li>
                <ul>
                  {work.highlights.map((highlight, index) => {
                    return <li key={`highlight-${index}`}>{highlight}</li>;
                  })}
                </ul>
              </li>
            </ul>
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

      <Page title="Experience">
        <ul>{experiences || ""}</ul>
      </Page>
    </>
  );
}
