import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

import _Star from "./star";

const Container = styled.div`
  line-height: 1;
`;

const Star = styled(_Star)`
  margin-right: 2px;
`;

export function toArray(rating, max) {
  const arr = new Array(max);
  for (let i = 0; i < max; i++) {
    arr[i] = 0;
  }
  for (let i = 0; i < rating; i++) {
    arr[i] = 1;
  }
  const last = rating - Math.floor(rating);
  if (last > 0) {
    arr[Math.floor(rating)] = last;
  }
  return arr;
}

export default function Stars({ rating, max }) {
  // convert the rating to an array of numbers
  const arr = toArray(rating, max);
  return (
    <Container>
      {arr.map((rat, i) => (
        <Star key={i} rating={rat} />
      ))}
    </Container>
  );
}

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
