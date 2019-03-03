/* global __API_KEY__, __API_URL__ */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import axios from "axios";
import { CancelToken } from "axios";

import _Stars from "../../../components/ui/stars";
import Bar from "../../../components/ui/bar";
import _Img from "../../../components/ui/img";

import {
  MiscInfo as _MiscInfo,
  Category as _Category,
  Price as _Price,
  OpenStatus as _OpenStatus,
  Status as _Status,
} from "../restaurants/tile";

import Reviews from "./reviews";
import Header from "./header";

export const Main = styled.main`
  padding: 0;
  margin: 0;
  padding-top: 36px;
  min-width: ${props => props.theme.bodyWidthPx + "px"};
`;

const Photos = styled.section`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: ${props => props.theme.bodyPaddingLeft};
  padding-right: ${props => props.theme.bodyPaddingRight};
  padding-top: 49px;
  padding-bottom: 49px;
`;

const MapContainer = styled.div`
  display: inline-block;
  width: 640px;
  height: 228px;
  background: ${props => props.theme.backgroundImg};
  float: left;
  margin-bottom: 15px;
  margin-right: 32px;
`;

const MapCaption = styled.span`
  display: block;
  font-family: ${props => props.theme.fontFamily};
  font-size: 20px;
  font-weight: ${props => props.theme.fontWeightLight};
  color: black;
  clear: both;
`;

const Img = styled(_Img)`
  float: left;
  margin-bottom: 15px;
  margin-right: 32px;
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
      {!details ? null : <Header {...details} />}
      <Bar />
      {!details ? null : (
        <Photos>
          <MapContainer />
          {details.photos.slice(0, 2).map((src, i) => (
            <Img key={i} width={"304px"} height={"228px"} src={src} />
          ))}
          <MapCaption>{details.location.display_address}</MapCaption>
        </Photos>
      )}
      <Bar />
      {!reviews ? null : (
        <Reviews reviews={reviews.reviews} total={reviews.total} />
      )}
    </Main>
  );
}

RestaurantDetails.propTypes = {};
