import React from "react";
import styled from "styled-components";

import About from "./about";

const Bar = styled.hr`
  color: #e6e6e6;
`;

export default function Resturants() {
  return (
    <main className="restaurants">
      <About />
      <Bar />
    </main>
  );
}
