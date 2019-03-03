import styled from "styled-components";
import React from "react";

import {
  Header as DummyHead,
  Title,
  Stars,
  MiscInfo as DummyMiscInfo,
  Category,
  OpenStatus,
} from "./header";
import {
  Photos as _DummyPhotos,
  MapContainer,
  MapCaption,
  Img,
} from "./photos";

const DummyTitle = styled(Title)`
  height: ${props => props.theme.fontSizeH1};
  background: ${props => props.theme.colorPlaceHolder};
  width: 75%;
`;
const DummyStars = styled(Stars)`
  width: 157px;
  background: ${props => props.theme.colorPlaceHolder};
`;
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

const DummyMapContainer = styled(MapContainer)`
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyMapCaption = styled(MapCaption)`
  background: ${props => props.theme.colorPlaceHolder};
`;
const DummyImg = styled(Img)`
  background: ${props => props.theme.colorPlaceHolder};
`;

export function DummyPhotos() {
  return (
    <_DummyPhotos>
      <DummyMapContainer />
      <DummyImg src={""} width={""} height={""} />
      <DummyImg src={""} width={""} height={""} />
      <DummyMapCaption />
    </_DummyPhotos>
  );
}
