/* global __API_KEY__, __API_URL__ */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { CancelToken } from "axios";
import axios from "axios";

import About from "./about";
import Filter from "./filter";
import toMap from "../../../utils/toMap";

const Bar = styled.hr`
  color: ${props => props.theme.colorLine}; /* old IE */
  background-color: ${props => props.theme.colorLine};
  border: none;
  height: 1px;
`;

const Main = styled.main``;

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
  } else if (prevFilters.indexOf("All") < 0 && nextFilters.indexOf("All") >= 0) {
    // uncheck everything except "All" when checked
    return ["All"];
  }
  return nextFilters
}

export default function Resturants() {
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

  useEffect(() => {
    const source = CancelToken.source();
    axios
      .get(`${__API_URL__}/v3/businesses/search`, {
        params: {
          location: "New York",
        },
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
      .then(bizzes => setCurBizzes(bizzes));
    return () => {
      // cancel the promise whenever the catFilters change
      // or the component is dismounted
      source.cancel();
    };
  }, [...catFilter]);

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

  return (
    <Main>
      <About />
      <Bar />
      <Filter
        openNow={openNow}
        onChangeOpenNow={handleOpenNowFilter}
        priceFilter={priceFilter}
        onChangePriceFilter={handlePriceFilter}
      />
      <span>{rawBizzes.length}</span>
      <span>{curBizzes.length}</span>
      <Bar />
    </Main>
  );
}
