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

export const Main = styled.main`
  padding: 0;
  margin: 0;
  padding-top: 36px;
  min-width: ${props => props.theme.bodyWidthPx + "px"};
`;

export const Header = styled.header`
  padding: 0;
  margin: 0;
  padding-left: ${props => props.theme.bodyPaddingLeft};
  padding-right: ${props => props.theme.bodyPaddingRight};
  margin-bottom: 42px;
`;

export const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeightLight};
  font-size: ${props => props.theme.fontSizeH1};
  color: ${props => props.theme.colorHeading};
  margin-bottom: 16px;
`;

export const Stars = styled(_Stars)`
  height: 30px;
  font-size: 30px;
  padding: 0;
  margin: 0;
`;

export const MiscInfo = styled(_MiscInfo)`
  margin: 0;
  padding: 0;
  margin-top: 16px;
  width: 100%;
  height: 22px;
  line-height: 1;
`;

export const Category = styled(_Category)`
  font-size: 22px;
  font-weight: ${props => props.theme.fontWeightLight};
  color: #666666;
  max-width: none;
  text-transform: none;
`;

export const Price = styled(_Price)`
  font-size: 22px;
  font-weight: ${props => props.theme.fontWeightLight};
  color: #666666;
  text-transform: none;

  :before {
    margin-left: 8px;
    margin-right: 8px;
  }
`;

export const OpenStatus = styled(_OpenStatus)`
  font-size: 22px;
  font-weight: ${props => props.theme.fontWeightLight};
  color: #666666;
  text-transform: none;
  margin-bottom: -3px;
`;

const Status = styled(_Status)`
  height: 22px;
  width: 22px;
  margin-right: 8px;
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
            console.log("something bad happened, retrying", thrown);
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
            console.log("something bad happened, retrying", thrown);
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
      {!details ? null : (
        <Header>
          <Title>{details.name}</Title>
          <Stars rating={details.rating} max={5} />
          <MiscInfo>
            <Category>{details.categories[0].title}</Category>
            {details.price ? <Price>{details.price}</Price> : null}
            <OpenStatus>
              <Status />
              {details.is_closed ? "closed" : "Open Now"}
            </OpenStatus>
          </MiscInfo>
        </Header>
      )}
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
