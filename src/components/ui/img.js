import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ImgContainer = styled.div`
  display: inline-block;
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => props.theme.backgroundImg};
  overflow: hidden;
`;

function handleImgOnLoad(width, height, evt) {
  // onLoad adjust the image cropping so that the Container
  // is fully filled.
  const node = evt.target;
  let landscapeMode = node.offsetWidth > node.offsetHeight;
  const landscape = `min-width: ${width}; width: auto; height: 100%`;
  const portrait = `width: 100%; height: auto; min-height: ${height};`;
  node.setAttribute("style", landscapeMode ? landscape : portrait);
}

export default function ImgComponent(props) {
  return (
    <ImgContainer className={props.className} {...props}>
      <img
        src={props.src}
        onLoad={handleImgOnLoad.bind(this, props.width, props.height)}
      />
    </ImgContainer>
  );
}

ImgComponent.defaultPropTypes = {
  className: "",
};

ImgComponent.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
