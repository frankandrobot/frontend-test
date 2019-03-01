import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

import Stars from "../../../components/ui/stars";

export const Tile = styled.div`
  width: 304px;
  height: 428px;
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 228px;
  overflow: hidden;
  background: #d8d8d8;
`;

const landscape = `min-width: 304px; width: auto; height: 100%`;
const portrait = `width: 100%; height: auto; min-height: 228px;`;

function handleImgOnLoad(evt) {
  const node = evt.target;
  let landscapeMode = node.offsetWidth > node.offsetHeight;
  node.setAttribute("style", landscapeMode ? landscape : portrait);
}

function Img({ src }) {
  return <img src={src} onLoad={handleImgOnLoad} />;
}

Img.propTypes = {
  src: PropTypes.string.isRequired,
};

export const Name = styled.h1`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.fontFamily};
  font-size: 20px;
  color: black;
  line-height: 1.5;
  padding-top: 16px;
  padding-bottom: 6px;
`;

export const Misc = styled.div`
  margin: 0;
  padding: 0;
  margin-top: 14px;
  margin-bottom: 18px;
  width: 100%;
  line-height: 1;
`;

export const CatPrice = styled.div`
  display: inline-block;
  float: left;
  font-family: ${props => props.theme.fontFamily};
  font-size: 12px;
  color: #757575;
  text-transform: uppercase;
`;

export const OpenStatus = styled.div`
  display: inline-block;
  float: right;
  font-family: ${props => props.theme.fontFamily};
  font-size: 12px;
  color: #757575;
  text-transform: uppercase;
`;

const Status = styled.span`
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 100%;
  background: ${props => (props.is_closed ? "#FF3548" : "#00e8a4")};
  border: 1px solid ${props => (props.is_closed ? "#FF3548" : "#00e8a4")};
  margin-right: 4px;
`;

export default function TileComponent(props) {
  return (
    <Tile>
      <ImgContainer>
        <Img src={props.image_url} />
      </ImgContainer>
      <Name>{props.name}</Name>
      <Stars rating={props.rating} max={5} />
      <Misc>
        <CatPrice>
          {props.categories[0].title} • {props.price}
        </CatPrice>
        <OpenStatus>
          <Status />
          {props.is_closed ? "closed" : "open now"}
        </OpenStatus>
      </Misc>
    </Tile>
  );
}

TileComponent.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  is_closed: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};
