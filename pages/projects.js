import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Page from "components/Page";
import userContext from "../store/user-context";
import Card from "components/Card";

import styles from "@styles/pages/projects.module.scss";
import siteData from "../data/site-data.json";

export default function Projects() {
  const [projects, setProjects] = useState(null);
  const userCtx = useContext(userContext);

  useEffect(() => {
    console.log("Projects");
    console.log(" » userCtx.data:", userCtx.data);
    if (userCtx.data) {
      const projectItems = userCtx.data.projects.map((project, index) => {
        const sizes = project.summary.split(",");
        const projectImages = Object.values(project.images);
        const projectVideos = Object.values(project.videos);
        console.log("   » sizes:", sizes);
        console.log("   » projectImages:", projectImages);
        console.log("   » projectVideos:", projectVideos);
        const libraries = project.libraries.map((lib) => {
          return (
            <li key={`stack-${lib}`} className={styles.stackItem}>
              {lib}
            </li>
          );
        });
        const languages = project.languages.map((lang) => {
          return (
            <li key={`stack-${lang}`} className={styles.stackItem}>
              {lang}
            </li>
          );
        });
        const stack = [...libraries, ...languages];
        return (
          <li key={`project-${index}`} className={styles.projects}>
            <Card>
              <ul>
                <li>
                  <h2>{project.displayName}</h2>
                </li>
                <li>
                  <ul className={styles.mediaList}>
                    {projectImages.map((imageData, imageIndex) => {
                      return (
                        <li key={`project-${index}-image-${imageIndex}`}>
                          <img src={imageData.resolutions.desktop.url} style={{ maxWidth: "400px" }} alt="" />
                        </li>
                      );
                    })}
                    {projectVideos.map((videoData, videoIndex) => {
                      const videoSize = videoIndex < sizes.length ? sizes[videoIndex].split("x") : sizes[sizes.length - 1].split("x");
                      const videoWidth = videoSize[0] > window.innerWidth * 0.8 ? window.innerWidth * 0.8 : videoSize[0];
                      const videoHeight = videoWidth != videoSize[0] ? videoSize[1] * (videoWidth / videoSize[0]) : videoSize[1];
                      return (
                        <li key={`project-${index}-video-${videoIndex}`}>
                          <iframe
                            width={videoWidth}
                            height={videoHeight}
                            // width="560"
                            // height="315"
                            // style={{ width: "100px", height: "auto" }}
                            src={`https://www.youtube.com/embed/${videoData.sourceId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            controls="0"
                            iv_load_policy="3"
                            modestBranding="1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen="1"
                          ></iframe>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                {/* <li className={styles.content}>{project.description}</li> */}
                <li className={styles.content} dangerouslySetInnerHTML={{ __html: project.description }} />
                <li className={styles.content}>
                  <h4>Tech Stack</h4>
                  <ul>{stack}</ul>
                  {/* {project.libraries} */}
                </li>
                {/* <li>
                  Languages
                  {project.languages}
                  <br />
                </li> */}
              </ul>
            </Card>
          </li>
        );
      });

      setProjects(projectItems);
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

  return (
    <>
      <Head>
        <title>Jacques Altounian - Creative Technologist - Projects</title>
      </Head>

      {/* <Page title="Projects"> */}
      <Page>
        <ul>{projects || ""}</ul>
      </Page>
    </>
  );
}
