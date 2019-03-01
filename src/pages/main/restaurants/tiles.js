import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import _Tile from "./tile";
import _DummyTile from "./tile_placeholder";

const calcInteriorWidth = props => {
  const interiorWidth =
    props.theme.bodyWidthPx - 2 * props.theme.bodySideMarginPx;
  return interiorWidth + "px";
};

const calcMaxWidth = props => {
  // allow at most 6 tiles in a row
  const {
    theme: { widthTilePx, marginRightTilePx },
  } = props;
  const maxWidth = 6 * (widthTilePx + marginRightTilePx);
  return maxWidth + "px";
};

const Container = styled.section`
  min-width: ${calcInteriorWidth};
  padding-left: ${props => props.theme.bodyPaddingLeft};
  max-width: ${calcMaxWidth};
`;

const Tile = styled(_Tile)`
  display: block;
  margin-right: ${props => props.theme.marginRightTilePx + "px"};
  float: left;
`;

const DummyTile = styled(_DummyTile)`
  display: block;
  margin-right: ${props => props.theme.marginRightTilePx + "px"};
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
