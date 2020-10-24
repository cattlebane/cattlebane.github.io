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
                  <VideoContainer key={"video" + j}>
                    <iframe key={j} width="560" height="315" src={"https://www.youtube.com/embed/" + item.sourceId} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </VideoContainer>
                ))}
              </MediaContainer>
              <MediaContainer key={"MediaContainer" + i}>
                {[...project.images].map((item, j) => (
                  <ImageContainer key={"image" + j}>
                    <a href={item.resolutions.desktop.url} target="_blank"><img key={j} src={item.resolutions.thumbnail.url} width={item.resolutions.thumbnail.width} height={item.resolutions.thumbnail.height} /></a>
                  </ImageContainer>
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
