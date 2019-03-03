import styled from "styled-components";
import React from "react";

import { Header, Title, Stars, MiscInfo, Category, OpenStatus } from "./header";

const DummyHead = styled(Header)``;
const DummyTitle = styled(Title)`
  height: ${props => props.theme.fontSizeH1};
  background: ${props => props.theme.colorPlaceHolder};
  width: 75%;
`;
const DummyStars = styled(Stars)`
  width: 157px;
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyMiscInfo = styled(MiscInfo)``;
const DummyCategory = styled(Category)`
  height: 22px;
  width: 157px;
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyOpen = styled(OpenStatus)`
  height: 22px;
  width: 165px;
  background: ${props => props.theme.colorPlaceHolder};
`;

export function DummyHeader() {
  return (
    <DummyHead>
      <DummyTitle />
      <DummyStars rating={0} max={0} />
      <DummyMiscInfo>
        <DummyCategory />
        <DummyOpen />
      </DummyMiscInfo>
    </DummyHead>
  );
}
