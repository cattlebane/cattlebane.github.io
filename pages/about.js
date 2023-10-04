import Head from "next/head";
// import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Page from "components/Page";
import userContext from "../store/user-context";
import Card from "components/Card";
import BioCard from "components/BioCard";

import bioCardStyles from "@styles/components/bioCard.module.scss";
import styles from "@styles/pages/about.module.scss";
import btnStyles from "@styles/components/button.module.scss";
import Link from "next/link";

export default function About() {
  const userCtx = useContext(userContext);
  const [awards, setAwards] = useState(null);
  const [interests, setInterests] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [skills, setSkills] = useState(null);
  const [volunteer, setVolunteer] = useState(null);
  const [basics, setBasics] = useState(null);

  useEffect(() => {
    console.log("Experience");
    console.log(" » userCtx.data:", userCtx.data);
    const addLinks = (copy) => {
      const splitCopy = copy.split(" ");
      const processedCopy = splitCopy.map((fragment) => {
        if (fragment.indexOf(".com") > -1) {
          return `<a href="http://www.${fragment}" className=${btnStyles["btn-text"]}>${fragment}</a>`;
          /* return (
            <a href={`http://www.${fragment}`} className={btnStyles["btn-text"]}>
              {fragment}
            </a>
          ); */
        } else {
          return fragment;
        }
      });
      return <div>{processedCopy.join(" ")}</div>;
    };
    const htmlToElement = (html) => {
      var template = document.createElement("template");
      html = html.trim(); // Never return a text node of whitespace as the result
      template.innerHTML = html;
      return template.content.firstChild;
    };
    if (userCtx.data) {
      const { name, label, image, headline, summary } = userCtx.data.basics;
      const basicsItems = (
        <ul>
          {/* <li>
            <h1>{name || ""}</h1>
          </li> */}
          <li className={bioCardStyles.headline}>
            <img src={image || ""} alt="hero image" style={{ width: "100px" }} />
            <div className={bioCardStyles.copyBlock}>
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
      setBasics(basicsItems);
      const awardsItems = userCtx.data.awards.map((item, index) => {
        const copyAr = item.summary.split("<a>");
        const summary = copyAr[0];
        const linkCopy = copyAr[1];
        const link = linkCopy && linkCopy.replace("<a>", "").replace("</a>", "");
        return (
          <li key={`awards-${index}`} className={styles.award}>
            <h3>{item.title}</h3>
            <h4>
              {item.awarder} | {item.fullDate.year}
            </h4>
            {/* <p>{String.raw`${item.summary}`}</p> */}
            {/* <p>{item.summary}</p> */}
            <p>
              {summary}
              {link && (
                <Link href={link}>
                  <a className={btnStyles["btn-text"]} target="_blank">
                    {link}
                  </a>
                </Link>
              )}
            </p>
          </li>
        );
      });
      setAwards(awardsItems);
      const interestsItems = userCtx.data.interests.map((item, index) => {
        return (
          <li key={`interests-${index}`} className={styles.stackItem}>
            {/* {addLinks(item.name)} */}
            {/* {htmlToElement(item.name)} */}
            {item.name}
          </li>
        );
      });
      setInterests(interestsItems);
      const languagesItems = userCtx.data.languages.map((item, index) => {
        return (
          <li key={`languages-${index}`} className={styles.stackItem}>
            {item.language}
          </li>
        );
      });
      setLanguages(languagesItems);
      const skillsItems = userCtx.data.skills.map((item, index) => {
        return (
          <li key={`skills-${index}`} className={styles.stackItem}>
            {item.name}
          </li>
        );
      });
      setSkills(skillsItems);
      const volunteerItems = userCtx.data.volunteer.map((item, index) => {
        return <li key={`volunteer-${index}`}>{item.organization}</li>;
      });
      setVolunteer(volunteerItems);
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

  if (!userCtx.data) {
    return <div></div>;
  }

  return (
    <>
      <Head>
        <title>Jacques Altounian - Creative Technologist - About</title>
      </Head>

      <Page title="" className={styles.about}>
        <ul>
          <li>{userCtx.data ? <BioCard basics={userCtx.data.basics} /> : ""}</li>
          <li className={styles.section}>
            <Card>
              <h2>Awards</h2>
              <ul>{awards}</ul>
            </Card>
          </li>
          <li className={`${styles.section} ${styles.skills}`}>
            <Card>
              <h2>Skills</h2>
              <ul>{skills}</ul>
            </Card>
          </li>
          <li className={styles.section}>
            <Card>
              <h2>My Hobbies</h2>
              <ul>{interests}</ul>
            </Card>
          </li>
          {/* <li className={styles.section}>
            <Card>
              <h2>Spoken Languages</h2>
              <ul>{languages}</ul>
            </Card>
          </li> */}
          {/* <li className={styles.section}>
            <Card>
              <h2>volunteer</h2>
              <ul>{volunteer}</ul>
            </Card>
          </li> */}
        </ul>
      </Page>
    </>
  );
}
