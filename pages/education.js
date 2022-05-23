import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";
import userContext from "../store/user-context";
import Card from "components/Card";

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
          <li key={`edu-${index}`}>
            <Card>
              <ul>
                <li>
                  {edu.institution}{" "}
                  <a href={edu.website} target="_blank" rel="noreferrer">
                    {edu.website.split("https://www.")[1].split("/")[0]}
                  </a>
                </li>
                <li>
                  {edu.studyType}, {edu.area}
                </li>
                <li>
                  {month[edu.start.month - 1]} {edu.start.year} - {month[edu.end.month - 1]} {edu.end.year}
                </li>
                <li>{edu.activities}</li>
              </ul>
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

      <Page title="Education">
        <ul>{educations || ""}</ul>
      </Page>
    </>
  );
}
