import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding-top: 36px;
  padding-left: ${props => props.theme.bodyPaddingLeft};
  padding-right: ${props => props.theme.bodyPaddingRight};
  margin: 0;
  max-width: 753px;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeightLight};
  font-size: 54px;
  color: ${props => props.theme.colorHeading};
  margin: 0;
  padding: 0;
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeightLight};
  font-size: 22px;
  color: ${props => props.theme.colorText};
  margin: 0;
  padding: 0;
  margin-bottom: 36px;
`;

export default function About() {
  return (
    <Section>
      <Title>Restaurants</Title>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Description>
    </Section>
  );
}
