import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import styles from "@styles/pages/Home.module.scss";
import Page from "components/Page";
import userContext from "../store/user-context";

export default function Projects() {
  const [projects, setProjects] = useState(null);
  const userCtx = useContext(userContext);

  useEffect(() => {
    console.log("Projects");
    console.log(" » userCtx.data:", userCtx.data);
    if (userCtx.data) {
      const projectItems = userCtx.data.projects.map((project, index) => {
        const sizes = project.summary.split(",");
        return (
          <li key={`project-${index}`} style={{ border: "1px solid grey", margin: "15px" }}>
            <ul>
              <li>{project.name}</li>
              <li>
                <ul>
                  {project.images.map((imageData, imageIndex) => {
                    return (
                      <li key={`project-${index}-image-${imageIndex}`}>
                        <img src={`https://www.youtube.com/embed/${imageData.sourceId}`} alt="" />
                      </li>
                    );
                  })}
                  {project.videos.map((videoData, videoIndex) => {
                    const videoSize = sizes[videoIndex].split("x");
                    return (
                      <li key={`project-${index}-video-${videoIndex}`}>
                        <iframe
                          width={videoSize[0]}
                          height={videoSize[1]}
                          // width="560"
                          // height="315"
                          // style={{ width: "100px", height: "auto" }}
                          src={`https://www.youtube.com/embed/${videoData.sourceId}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>{project.description}</li>
              <li>
                Libraries
                <br />
                {project.libraries}
              </li>
              <li>
                Languages
                <br />
                {project.languages}
              </li>
            </ul>
          </li>
        );
      });

      setProjects(projectItems);
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
        <title>Jacques Altounian - Creative Technologist - Projects</title>
      </Head>

      <Page title="Projects">
        <ul>{projects || ""}</ul>
      </Page>
    </>
  );
}
