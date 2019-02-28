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

function filter(bizzes, { priceFilter, openNowValue }) {
  bizzes = filterByOpenNow(bizzes, openNowValue);
  bizzes = filterByPrice(bizzes, priceFilter);
  return bizzes;
}

function filterByOpenNow(bizzes, openNowValue) {
  if (openNowValue) {
    return bizzes.filter(biz => biz.is_closed === false);
  }
  return bizzes;
}

function filterByPrice(bizzes, priceFilters) {
  const prices = toMap(priceFilters);
  if (prices.all) {
    return bizzes;
  }
  return bizzes.filter(biz => prices[biz.price]);
}

export function allDropdownBehavior(prevFilters, nextFilters) {
  if (nextFilters.length === 0) {
    // when checking nothing it becomes "all"
    return ["all"];
  } else if (prevFilters[0] === "all" && nextFilters.length > 1) {
    // uncheck "all" when it was checked but now checked something else
    return nextFilters.filter(f => f !== "all");
  } else if (prevFilters.length > 1 && nextFilters.indexOf("all") >= 0) {
    // uncheck everything except "all" when checked
    return ["all"];
  }
  return nextFilters
}

export default function Resturants() {
  // this is the unfiltered bizzes from the endpoint
  const [rawBizzes, setRawBizzes] = useState([]);
  // these are the filtered bizzes
  const [curBizzes, setCurBizzes] = useState([]);
  // the OpenNow filter
  const [openNowValue, setOpenNowValue] = useState(false);
  // the Price filters
  const [priceFilter, setPriceFilter] = useState(["all"]);
  // the Category filters
  const [catFilter, setCatFilter] = useState(["all"]);

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
      .then(bizzes => filter(bizzes, { priceFilter, openNowValue }))
      .then(bizzes => setCurBizzes(bizzes));
    return () => {
      // cancel the promise whenever the catFilters change
      // or the component is dismounted
      source.cancel();
    };
  }, [...catFilter]);

  function handleOpenNowFilter(openNowValue) {
    setOpenNowValue(openNowValue);
    // recompute the current bizzes from all the filters
    setCurBizzes(filter(rawBizzes, { openNowValue, priceFilter }));
  }

  return (
    <Main>
      <About />
      <Bar />
      <Filter
        openNowValue={openNowValue}
        onChangeOpenNow={handleOpenNowFilter}
      />
      <span>{rawBizzes.length}</span>
      <span>{curBizzes.length}</span>
      <Bar />
    </Main>
  );
}
