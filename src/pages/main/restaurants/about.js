import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 300;
  font-size: 54px;
  color: #333333;
`;

const Description = styled.div`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 300;
  font-size: 22px;
  color: #666666;
`;

export default React.memo(function About() {
  return (
    <section>
      <Title>Restaurants</Title>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Description>
    </section>
  );
});