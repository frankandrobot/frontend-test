import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import _Tile from "./tile";
import _DummyTile from "./tile_placeholder";

const Container = styled.section`
  min-width: ${props => props.theme.bodyWidthPx + "px"};
`;

const Tile = styled(_Tile)`
  display: block;
  margin-right: 32px;
  float: left;
`;

const DummyTile = styled(_DummyTile)`
  display: block;
  margin-right: 32px;
  float: left;
`;

const dummyTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
  <DummyTile key={i} />
));

export default function Tiles(props) {
  const { bizzes, loading } = props;
  return (
    <Container>
      {loading ? dummyTiles : bizzes.map(biz => <Tile key={biz.id} {...biz} />)}
    </Container>
  );
}

Tiles.propTypes = {
  bizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};
