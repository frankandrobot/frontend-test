import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

import {
  Tile,
  ImgContainer as RealImgContainer,
  Name as RealName,
  Misc as RealMisc,
  CatPrice as RealCatPrice,
  OpenStatus as RealOpenStatus,
} from "./tile";

const ImgContainer = styled(RealImgContainer)`
  background: ${props => props.theme.colorTileLightGray};
`;

const Name = styled(RealName)`
  height: 20px;
  width: 100%;
  padding: 0;
  margin-top: 16px;
  margin-bottom: 6px;
  background: ${props => props.theme.colorTileLightGray};
`;

const Stars = styled.div`
  line-height: 1;
  height: 12px;
  width: 35%;
  background: ${props => props.theme.colorTileLightGray};
`;

const Misc = styled(RealMisc)`
  margin-top: 7px;
`;

const CatPrice = styled(RealCatPrice)`
  height: 12px;
  width: 35%;
  background: ${props => props.theme.colorTileLightGray};
`;

const OpenStatus = styled(RealOpenStatus)`
  height: 12px;
  width: 35%;
  background: ${props => props.theme.colorTileLightGray};
`;

export default function DummyTileComponent() {
  return (
    <Tile>
      <ImgContainer />
      <Name />
      <Stars />
      <Misc>
        <CatPrice />
        <OpenStatus />
      </Misc>
    </Tile>
  );
}
