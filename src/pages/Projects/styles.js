import styled from 'styled-components'
import { white } from '@carbon/colors'

export const ProjectItem = styled.li`
  margin-top: 1rem;
  padding: 1rem;
  ${'' /* border-bottom: 1px solid ${white}; */}
  background-color: #555555;
`

export const ProjectTitle = styled.h4`
  font-weight: bold;
`

export const SkillContainer = styled.div`
  margin-top: 1.2rem;
  max-width: 600px;
`

export const ProjectSummary = styled.div`
  margin-top: 1.2rem;
  max-width: 600px;
`

export const MediaContainer = styled.div`
  ${'' /* margin-bottom: 1.2rem; */}
`

export const VideoContainer = styled.div`
  margin-bottom: 1.2rem;
`

export const ImageContainer = styled.div`
  margin: 1.2rem;
`
