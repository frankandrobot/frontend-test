import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

import {
  Tile,
  ImgContainer as RealImgContainer,
  Name as RealName,
  Stars as RealStars,
  MiscInfo as RealMisc,
  Category as RealCategory,
  OpenStatus as RealOpenStatus,
  LearnMoreBtn,
} from "./tile";

const ImgContainer = styled(RealImgContainer)`
  background: ${props => props.theme.colorPlaceHolder};
`;

const Name = styled(RealName)`
  height: 20px;
  width: 100%;
  padding: 0;
  margin-top: 16px;
  margin-bottom: 6px;
  background: ${props => props.theme.colorPlaceHolder};
`;

const Stars = styled(RealStars)`
  width: 35%;
  background: ${props => props.theme.colorPlaceHolder};
`;

const Misc = styled(RealMisc)``;

const Category = styled(RealCategory)`
  height: 16px;
  width: 35%;
  background: ${props => props.theme.colorPlaceHolder};
`;

const OpenStatus = styled(RealOpenStatus)`
  height: 16px;
  width: 35%;
  background: ${props => props.theme.colorPlaceHolder};
`;

const Button = styled(LearnMoreBtn)`
  background: ${props => props.theme.colorPlaceHolder};
  border: 1px solid ${props => props.theme.colorPlaceHolder};

  :hover,
  :active {
    background: ${props => props.theme.colorPlaceHolder};
  }
`;

export default function DummyTileComponent(props) {
  return (
    <Tile className={props.className}>
      <ImgContainer />
      <Name />
      <Stars rating={0} max={0} />
      <Misc>
        <Category />
        <OpenStatus />
      </Misc>
      <Button/>
    </Tile>
  );
}

DummyTileComponent.defaultProps = {
  className: "",
};

DummyTileComponent.propTypes = {
  className: PropTypes.string,
};
