import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Container, Button } from 'components/common'
import dev from 'assets/illustrations/skills.svg'
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles'

export const Skills = () => (
  <Wrapper id="about">
    <SkillsWrapper as={Container}>
      <Thumbnail>
        <img src={dev} alt="I’m Aaron and I’m a student Web Developer!" />
      </Thumbnail>
      <Details>
        <h1>Hi There!</h1>
        <p>
          I'm a 21 years old student from The Netherlands. My skills and interest in web development are Javascript (ES6), ReactJS, React Native & PHP.
        </p>
        <Button as={AnchorLink} href="#contact">
          Contact me
        </Button>
      </Details>
    </SkillsWrapper>
  </Wrapper>
);
