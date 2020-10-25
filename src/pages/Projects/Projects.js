import React from 'react';
import Layout from '../../components/Layout';
import { SectionTitle, Pill } from '../../styles';
import { ProjectItem, ProjectTitle, SkillContainer, MediaContainer, VideoContainer, ImageContainer } from './styles';

const Projects = ({ user }) => {

  return (
    <Layout user={user}>
      <div>
        <SectionTitle>Projects</SectionTitle>
        <ul>
          {user.projects.map((project, i) => (
            <ProjectItem key={i}>
              <MediaContainer key={"videoContainer" + i}>
                {[...project.videos].map((item, j) => (
                    <iframe key={"video" + j} width="560" height="315" style={{margin: "0 1.2rem 1.2rem 0"}} src={"https://www.youtube.com/embed/" + item.sourceId} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                ))}
              </MediaContainer>
              <MediaContainer key={"MediaContainer" + i}>
                {[...project.images].map((item, j) => (
                    <a key={"imaeLink" + j} href={item.resolutions.desktop.url} target="_blank"><img key={"image" + j} src={item.resolutions.thumbnail.url} width={item.resolutions.thumbnail.width} height={item.resolutions.thumbnail.height} style={{margin: "0 1.2rem 1.2rem 0"}} /></a> 
                ))}
              </MediaContainer>
              <ProjectTitle>{project.displayName}</ProjectTitle>
              <p>{project.summary}</p>
              <SkillContainer>
                {[...project.languages, ...project.libraries].map((item, j) => (
                  <Pill key={j}>{item}</Pill>
                ))}
              </SkillContainer>
            </ProjectItem>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Projects;
