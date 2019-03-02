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
const toDummyTiles = dum => dum.map(i => <DummyTile key={i} />);

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

export default function TilesComp(props) {
  const { bizzes: allBizzes, loading } = props;
  const elRef = useRef(null);
  const [bizzes, setBizzes] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [lastBizzIndex, setLastBizzIndex] = useState(0);
  const [dummyTiles, setDummyTiles] = useState(
    toDummyTiles(dummyBizzes.slice(0, 8))
  );

  useLayoutEffect(
    function initialDisplay() {
      const tileWidth = props.theme.widthTilePx + props.theme.marginRightTilePx;
      const containerWidth = elRef.current.offsetWidth;
      const count = Math.floor(containerWidth / tileWidth);
      const lastIndex = Math.min(allBizzes.length, 2 * count);
      setDummyTiles(toDummyTiles(dummyBizzes.slice(0, 2 * count)));
      setBizzes(allBizzes.slice(0, 2 * count));
      setLastBizzIndex(lastIndex);
      setRowCount(count);
    },
    // (re)populate tiles when component mounts or when it
    // receives data
    [elRef, allBizzes]
  );

  useEffect(
    function rowCountOnResize() {
      window.addEventListener("resize", _rowCountOnResize);
      function _rowCountOnResize() {
        const tileWidth =
          props.theme.widthTilePx + props.theme.marginRightTilePx;
        const containerWidth = elRef.current.offsetWidth;
        const newRowCount = Math.floor(containerWidth / tileWidth);
        setRowCount(newRowCount);
        return () => window.removeEventListener("resize", _rowCountOnResize);
      }
    },
    [elRef]
  );

  function handleLoadMore() {
    const newLastBizzIndex =
      lastBizzIndex +
      // rowCount may have actually changed because of a resize
      // so this is the amount to make a full row
      (lastBizzIndex % rowCount) +
      // plus the new row
      2 * rowCount;
    setBizzes(allBizzes.slice(0, newLastBizzIndex));
    setLastBizzIndex(newLastBizzIndex);
  }

  const showLoadMoreButton = !loading && lastBizzIndex < allBizzes.length - 1;

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
