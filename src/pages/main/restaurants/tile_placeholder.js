import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

import {
  Tile,
  ImgContainer as RealImgContainer,
  Name as RealName,
  MiscInfo as RealMisc,
  Category as RealCategory,
  Price as RealPrice,
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

const Misc = styled(RealMisc)``;

const CatPrice = styled(RealPrice)`
  height: 12px;
  width: 35%;
  background: ${props => props.theme.colorTileLightGray};
`;

const OpenStatus = styled(RealOpenStatus)`
  height: 12px;
  width: 35%;
  background: ${props => props.theme.colorTileLightGray};
`;

export default function DummyTileComponent(props) {
  return (
    <Tile className={props.className}>
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

DummyTileComponent.defaultProps = {
  className: "",
};

DummyTileComponent.propTypes = {
  className: PropTypes.string,
};
