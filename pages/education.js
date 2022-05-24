import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Page from "components/Page";
import userContext from "../store/user-context";
import Card from "components/Card";

import styles from "@styles/pages/education.module.scss";
import btnStyles from "@styles/components/button.module.scss";

export default function Education() {
  const [educations, setEducations] = useState(null);
  const userCtx = useContext(userContext);

  useEffect(() => {
    console.log("Education");
    console.log(" » userCtx.data:", userCtx.data);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (userCtx.data) {
      const educationItems = userCtx.data.education.map((edu, index) => {
        return (
          <li key={`edu-${index}`} className={styles.section}>
            <Card>
              <div className={styles.school}>
                <h2>{edu.institution}</h2>{" "}
                <a href={edu.website} target="_blank" rel="noreferrer" className={`${btnStyles["btn-text"]} ${styles["school-link"]}`}>
                  {edu.website.split("https://www.")[1].split("/")[0]}
                </a>
              </div>
              <p>
                {edu.studyType}, {edu.area}
              </p>
              <h4>
                {month[edu.start.month - 1]} {edu.start.year} - {month[edu.end.month - 1]} {edu.end.year}
              </h4>
              <p>{edu.activities}</p>
            </Card>
          </li>
        );
      });

      setEducations(educationItems);
    } else {
      const getData = async () => {
        console.log("   » getData()");
        // const response = await fetch('/api/projects')
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
        <title>Jacques Altounian - Creative Technologist - Education</title>
      </Head>

      <Page title="" className={styles.education}>
        <ul>{educations || ""}</ul>
      </Page>
    </>
  );
}
