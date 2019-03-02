import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import _Tile from "./tile";
import _DummyTile from "./tile_placeholder";
import _Button from "../../../components/ui/button_square";

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
  min-width: ${props => props.theme.bodyWidthPx + "px"};
  padding-bottom: 64px;
`;

const Tiles = styled.div`
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

const dummyBizzes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const dummyTiles = dummyBizzes.map(i => <DummyTile key={i} />);

const Button = styled(_Button)`
  /* size */
  height: 48px;
  width: 416px;
  line-height: 48px;
  font-size: 14px;
  /* styles */
  color: #002b53;
  border: 1px solid #002b53;
  clear: both;
  /* position */
  margin: 0 auto;
`;

function calcItemsPerRow({ widthTilePx, marginRightTilePx }, elRef) {
  const tileWidth = widthTilePx + marginRightTilePx;
  const containerWidth = elRef.current.offsetWidth;
  return Math.floor(containerWidth / tileWidth);
}

function useDummyTiles({ widthTilePx, marginRightTilePx }, elRef) {
  const [tiles, setTiles] = useState(null);

  useLayoutEffect(
    // populate tiles when component mounts
    function initialDisplay() {
      const itemsPerRow = calcItemsPerRow(
        { widthTilePx, marginRightTilePx },
        elRef
      );
      setTiles(dummyTiles.slice(0, 2 * itemsPerRow));
    },
    [elRef]
  );

  useEffect(
    function updateRowsOnResize() {
      window.addEventListener("resize", _updateRowsOnResize);
      function _updateRowsOnResize() {
        const itemsPerRow = calcItemsPerRow(
          { widthTilePx, marginRightTilePx },
          elRef
        );
        setTiles(dummyTiles.slice(0, itemsPerRow));
        return () => window.removeEventListener("resize", _updateRowsOnResize);
      }
    },
    [elRef]
  );

  return tiles;
}

export default function TilesComp(props) {
  const { bizzes: allBizzes, loading, theme } = props;
  const elRef = useRef(null);
  const dummyTiles = useDummyTiles(theme, elRef);
  const [bizzes, setBizzes] = useState([]);
  const [itemsPerRow, setItemsPerRow] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);

  useLayoutEffect(
    function initialDisplay() {
      const newItemsPerRow = calcItemsPerRow(theme, elRef);
      setItemsPerRow(newItemsPerRow);
      const newLastIndex = Math.min(allBizzes.length, 2 * newItemsPerRow);
      setLastIndex(newLastIndex);
      setBizzes(allBizzes.slice(0, 2 * newItemsPerRow));
    },
    // run initialDisplay when component mounts
    [elRef]
  );

  useLayoutEffect(
    function updateBizData() {
      if (!elRef.current) {
        // make sure this runs after initialDisplay
        return;
      }
      // reset everything (except itemsPerRow)
      const newLastIndex = Math.min(allBizzes.length, 2 * itemsPerRow);
      setLastIndex(newLastIndex);
      setBizzes(allBizzes.slice(0, 2 * itemsPerRow));
    },
    // run updateBizData when receive new data
    [elRef, allBizzes]
  );

  useEffect(
    function updateItemsPerRowOnResize() {
      window.addEventListener("resize", _updateItemsPerRowOnResize);
      function _updateItemsPerRowOnResize() {
        const newItemsPerRow = calcItemsPerRow(theme, elRef);
        setItemsPerRow(newItemsPerRow);
        return () =>
          window.removeEventListener("resize", _updateItemsPerRowOnResize);
      }
    },
    // setup resize listener on mount
    [elRef]
  );

  function handleLoadMore() {
    const newLastIndex =
      lastIndex +
      // itemsPerRow may have actually changed because of a resize
      // so this is the amount to make a full row
      (lastIndex % itemsPerRow) +
      // plus the new rows
      2 * itemsPerRow;
    setLastIndex(newLastIndex);
    setBizzes(allBizzes.slice(0, newLastIndex));
  }

  const showLoadMoreButton = !loading && lastIndex <= allBizzes.length - 1;

  return (
    <Container ref={elRef}>
      <Tiles>
        {loading
          ? dummyTiles
          : bizzes.map(biz => <Tile key={biz.id} {...biz} />)}
      </Tiles>
      {showLoadMoreButton ? (
        <Button onClick={handleLoadMore}>Load More</Button>
      ) : null}
    </Container>
  );
}

TilesComp.propTypes = {
  bizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};
