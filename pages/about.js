import Head from "next/head";
// import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";
import userContext from "../store/user-context";
import Card from "components/Card";

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
    if (userCtx.data) {
      const { name, label, image, headline, summary } = userCtx.data.basics;
      const basicsItems = (
        <ul>
          <li>
            <h1>{name || ""}</h1>
          </li>
          <li>
            <h2>{label || ""}</h2>
          </li>
          <li>
            <img src={image || ""} alt="hero image" style={{ width: "100px" }} />
          </li>
          <li>
            <h3>{headline || ""}</h3>
          </li>
          <li>
            <p>{summary || ""}</p>
          </li>
        </ul>
      );
      setBasics(basicsItems);
      const awardsItems = userCtx.data.awards.map((item, index) => {
        return <li key={`awards-${index}`}>{`${item.awarder} - ${item.title}`}</li>;
      });
      setAwards(awardsItems);
      const interestsItems = userCtx.data.interests.map((item, index) => {
        return <li key={`interests-${index}`}>{item.name}</li>;
      });
      setInterests(interestsItems);
      const languagesItems = userCtx.data.languages.map((item, index) => {
        return <li key={`languages-${index}`}>{item.language}</li>;
      });
      setLanguages(languagesItems);
      const skillsItems = userCtx.data.skills.map((item, index) => {
        return <li key={`skills-${index}`}>{item.name}</li>;
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

      <Page title="About">
        <Card>{basics}</Card>
        <br />
        <ul>
          <li>
            <Card>
              <h2>My skills</h2>
              <ul>{skills}</ul>
            </Card>
          </li>
          <li>
            <Card>
              <h1>My languages</h1>
              <ul>{languages}</ul>
            </Card>
          </li>
          <li>
            <Card>
              <h1>My awards</h1>
              <ul>{awards}</ul>
            </Card>
          </li>
          <li>
            <Card>
              <h1>My hobbies (guitar/photography/toy collecting)</h1>
              <ul>{interests}</ul>
            </Card>
          </li>
          <li>
            <Card>
              <h1>volunteer</h1>
              <ul>{volunteer}</ul>
            </Card>
          </li>
        </ul>
      </Page>
    </>
  );
}
