import React from "react";
import styled from "styled-components";

import About from "./about";

const Bar = styled.hr`
  color: #e6e6e6; /* old IE */
  background-color: #e6e6e6;
  border: none;
  height: 1px;
`;

const Main = styled.main`
  padding-top: 36px;
  padding-left: 64px;
  padding-right: 64px;
`;

export default function Resturants() {
  return (
    <Main>
      <About />
      <Bar />
    </Main>
  );
}
