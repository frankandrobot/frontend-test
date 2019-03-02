/* global __API_KEY__, __API_URL__ */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { CancelToken } from "axios";
import axios from "axios";

import About from "./about";
import Filter from "./filter";
import { categories, categoriesByValue } from "./filter";
import Tiles from "./tiles";

import toMap from "../../../utils/toMap";
import theme from "../../../components/theme";

const Main = styled.main``;

const Bar = styled.hr`
  color: ${props => props.theme.colorLine}; /* old IE */
  background-color: ${props => props.theme.colorLine};
  border: none;
  height: 1px;
`;

const FilterTitle = styled.h2`
  font-family: ${props => props.theme.fontFamily};
  font-size: 34px;
  font-weight: ${props => props.theme.fontWeightLight};
  color: #333333;
  margin-top: 64px;
  margin-bottom: 43px;
  padding-left: ${props => props.theme.bodyPaddingLeft};
`;

function filter(bizzes, { priceFilter, openNow }) {
  bizzes = filterByOpenNow(bizzes, openNow);
  bizzes = filterByPrice(bizzes, priceFilter);
  return bizzes;
}

function filterByOpenNow(bizzes, openNow) {
  if (openNow) {
    return bizzes.filter(biz => biz.is_closed === false);
  }
  return bizzes;
}

function filterByPrice(bizzes, priceFilters) {
  const prices = toMap(priceFilters);
  if (prices.All) {
    return bizzes;
  }
  return bizzes.filter(biz => prices[biz.price]);
}

export function allDropdownBehavior(prevFilters, nextFilters) {
  if (nextFilters.length === 0) {
    // when checking nothing it becomes "All"
    return ["All"];
  } else if (prevFilters[0] === "All" && nextFilters.length > 1) {
    // uncheck "All" when it was checked but now checked something else
    return nextFilters.filter(f => f !== "All");
  } else if (
    prevFilters.indexOf("All") < 0 &&
    nextFilters.indexOf("All") >= 0
  ) {
    // uncheck everything except "All" when checked
    return ["All"];
  }
  return nextFilters;
}

export default function Restaurants() {
  // this is the unfiltered bizzes from the endpoint
  const [rawBizzes, setRawBizzes] = useState([]);
  // these are the filtered bizzes
  const [curBizzes, setCurBizzes] = useState([]);
  // the OpenNow filter
  const [openNow, setOpenNow] = useState(false);
  // the Price filters
  const [priceFilter, setPriceFilter] = useState(["All"]);
  // the Category filters
  const [catFilter, setCatFilter] = useState(["All"]);
  const [load, setLoad] = useState(true);

  useEffect(
    function loadYelpData() {
      const source = CancelToken.source();
      const cats =
        catFilter.indexOf("All") < 0
          ? // if not filtering by all filter by catFilters
            catFilter.join(",")
          : // else filter by all categories
            categories.slice(1).map(cat => cat.value);
      const params = {
        location: "Las Vegas",
        categories: cats,
      };

      axios
        .get(`${__API_URL__}/v3/businesses/search`, {
          params,
          headers: {
            Authorization: `Bearer ${__API_KEY__}`,
          },
          cancelToken: source.token,
        })
        .then(x => {
          setRawBizzes(x.data.businesses);
          return x.data.businesses;
        })
        .then(bizzes => filter(bizzes, { priceFilter, openNow }))
        .then(bizzes => setCurBizzes(bizzes))
        .then(() => setLoad(false))
        .catch(thrown => {
          if (axios.isCancel(thrown)) {
            // cancelled ignore
          } else {
            console.log("something bad happened, retrying", thrown);
            setLoad(true);
          }
        });
      return () => {
        // cancel the promise whenever the catFilters change
        // or the component is dismounted
        source.cancel();
      };
      // run the effect when we're told
    },
    [catFilter, load]
  );

  function handleOpenNowFilter(nextOpenNowValue) {
    setOpenNow(nextOpenNowValue);
    // recompute the current bizzes from all the filters
    setCurBizzes(filter(rawBizzes, { openNow: nextOpenNowValue, priceFilter }));
  }

  function handlePriceFilter(nextPriceFilter) {
    // first handle the "All" behavior
    nextPriceFilter = allDropdownBehavior(priceFilter, nextPriceFilter);
    setPriceFilter(nextPriceFilter);
    // recompute the current bizzes from all the filters
    setCurBizzes(filter(rawBizzes, { openNow, priceFilter: nextPriceFilter }));
  }

  function handleCatFilter(nextCatFilter) {
    // first handle the "All" behavior
    nextCatFilter = allDropdownBehavior(catFilter, nextCatFilter);
    setCatFilter(nextCatFilter);
    setLoad(true);
  }

  function handleClearFilters() {
    setOpenNow(false);
    setPriceFilter(["All"]);
    if (catFilter[0] === "All") {
      // save an AJAX call if we're already in All
      setCurBizzes(filter(rawBizzes, { openNow, priceFilter }));
    } else {
      setCatFilter(["All"]);
      setLoad(true);
    }
  }

  return (
    <Main>
      <About />
      <Bar />
      <Filter
        openNow={openNow}
        onChangeOpenNow={handleOpenNowFilter}
        priceFilter={priceFilter}
        onChangePriceFilter={handlePriceFilter}
        catFilter={catFilter}
        onChangeCatFilter={handleCatFilter}
        onClear={handleClearFilters}
      />
      <Bar />
      <FilterTitle>{`${catFilter
        .map(x => categoriesByValue[x].label)
        .sort()
        .join(", ")} Restaurants`}</FilterTitle>
      <Tiles bizzes={curBizzes} loading={load} theme={theme} />
    </Main>
  );
}
