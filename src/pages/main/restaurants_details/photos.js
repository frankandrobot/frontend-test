import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import _Img from "../../../components/ui/img";

export const Photos = styled.section`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: ${props => props.theme.bodyPaddingLeft};
  padding-right: ${props => props.theme.bodyPaddingRight};
  padding-top: 49px;
  padding-bottom: 49px;
`;

export const MapContainer = styled.div`
  display: inline-block;
  width: 640px;
  height: 228px;
  background: ${props => props.theme.backgroundImg};
  float: left;
  margin-bottom: 15px;
  margin-right: 32px;
`;

export const MapCaption = styled.span`
  display: block;
  font-family: ${props => props.theme.fontFamily};
  font-size: 20px;
  font-weight: ${props => props.theme.fontWeightLight};
  min-height: 20px;
  max-width: 640px;
  color: black;
  clear: both;
`;

export const Img = styled(_Img)`
  float: left;
  margin-bottom: 15px;
  margin-right: 32px;
  min-width: 304px;
  min-height: 228px;
`;

export default function PhotoComp(props) {
  return (
    <Photos>
      <MapContainer />
      {props.photos.slice(0, 2).map((src, i) => (
        <Img key={i} width={"304px"} height={"228px"} src={src} />
      ))}
      <MapCaption>{props.location.display_address}</MapCaption>
    </Photos>
  );
}

PhotoComp.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.object.isRequired,
};
