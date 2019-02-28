import styled from "styled-components";
import PropTypes from "prop-types";

function baseStar({ rating }) {
  if (rating === 1) {
    return "★";
  }
  return "☆";
}

function showHalfStar({ rating }) {
  if (0 < rating && rating < 1) {
    return "inherit";
  }
  return "none";
}

const Star = styled.div`
  display: inline-block;
  font-size: ${props => props.fontSize};
  color: #002b56;
  position: relative;

  :before {
    content: "${baseStar}";
  }

  :after {
    display: ${showHalfStar};
    content: '★';
    color: #002b56;
    position: absolute;
    left:0;
    right:50%;
    top:0;
    bottom:0;
    overflow: hidden;
}
`;

Star.defaultProps = {
  rating: PropTypes.number,
};
