/* global __API_KEY__, __API_URL__ */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import axios from "axios";
import { CancelToken } from "axios";

import Bar from "../../../components/ui/bar";

import Reviews from "./reviews";
import Header from "./header";
import Photos from "./photos";
import { DummyHeader, DummyPhotos } from "./details_placeholder";

export const Main = styled.main`
  padding: 0;
  margin: 0;
  padding-top: 36px;
  min-width: ${props => props.theme.bodyWidthPx + "px"};
`;

export default function RestaurantDetails(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [loadDetails, setLoadDetails] = useState(true);
  const [details, setDetails] = useState(null);

  const [loadReviews, setLoadReviews] = useState(true);
  const [reviews, setReviews] = useState(null);

  useEffect(
    function loadDetails() {
      const source = CancelToken.source();
      axios
        .get(`${__API_URL__}/v3/businesses/${id}`, {
          headers: {
            Authorization: `Bearer ${__API_KEY__}`,
          },
          cancelToken: source.token,
        })
        .then(x => {
          setDetails(x.data);
          setLoadDetails(false);
        })
        .catch(thrown => {
          if (axios.isCancel(thrown)) {
            // cancelled ignore
          } else {
            console.log("something bad happened, retrying", { thrown });
            setLoadDetails(true);
          }
        });
      return () => {
        // cancel the promise whenever the catFilters change
        // or the component is dismounted
        source.cancel();
      };
      // run the effect when we're told
    },
    [id, loadDetails]
  );

  useEffect(
    function loadReviews() {
      const source = CancelToken.source();
      axios
        .get(`${__API_URL__}/v3/businesses/${id}/reviews`, {
          headers: {
            Authorization: `Bearer ${__API_KEY__}`,
          },
          cancelToken: source.token,
        })
        .then(x => {
          setReviews(x.data);
          setLoadReviews(false);
        })
        .catch(thrown => {
          if (axios.isCancel(thrown)) {
            // cancelled ignore
          } else {
            console.log("something bad happened, retrying", { thrown });
            setLoadReviews(true);
          }
        });
      return () => {
        // cancel the promise whenever the catFilters change
        // or the component is dismounted
        source.cancel();
      };
      // run the effect when we're told
    },
    [id, loadReviews]
  );

  return (
    <Main>
      {!details ? <DummyHeader /> : <Header {...details} />}
      <Bar />
      {!details ? <DummyPhotos /> : <Photos {...details} />}
      <Bar />
      {!reviews ? null : (
        <Reviews reviews={reviews.reviews} total={reviews.total} />
      )}
    </Main>
  );
}

RestaurantDetails.propTypes = {};
