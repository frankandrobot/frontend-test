import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

import _Stars from "../../../components/ui/stars";

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const ReviewerPhoto = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  background: ${props => props.theme.backgroundImg};
  float: left;
  margin-right: 32px;
  overflow: hidden;

  & > img {
    width: 80px;
    height: auto;
  }
`;

const ReviewerInfo = styled.div`
  display: inline-block;
  width: 192px;
  margin-right: 32px;
  float: left;
`;

const ReviewerName = styled.span`
  display: block;
  min-height: 24px;
  font-family: ${props => props.theme.fontFamily};
  font-size: 22px;
  color: black;
  margin-bottom: 6px;
`;

const Date = styled.span`
  display: block;
  min-height: 24px;
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeightLight};
  font-size: 16px;
  color: #666666;
`;

const Body = styled.div`
  float: left;
  width: 976px;
`;

const Stars = styled(_Stars)`
  height: 20px;
  font-size: 20px;
  margin-bottom: 19px;
`;

const Text = styled.div`
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeightLight};
  font-size: 20px;
  color: black;
`;

export default function Review(props) {
  return (
    <Container>
      <ReviewerPhoto>
        <img src={props.user.image_url} />
      </ReviewerPhoto>
      <ReviewerInfo>
        <ReviewerName>{props.user.name}</ReviewerName>
        <Date>{props.time_created}</Date>
      </ReviewerInfo>
      <Body>
        <Stars rating={props.rating} max={5} />
        <Text>{props.text}</Text>
      </Body>
    </Container>
  );
}

Review.propTypes = {
  user: PropTypes.object.isRequired,
  time_created: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};
