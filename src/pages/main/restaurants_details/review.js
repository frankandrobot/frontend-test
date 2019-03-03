import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

import _Stars from "../../../components/ui/stars";
import Img from "../../../components/ui/img";

const Container = styled.div`
  margin: 0;
  padding: 0;
  overflow: auto;
`;

const ReviewerPhoto = styled(Img)`
  float: left;
  margin-right: 32px;
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

const Text = styled.p`
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeightLight};
  font-size: 20px;
  color: black;
  margin-bottom: 34px;

  :last-child {
    margin-bottom: 0;
  }
`;

export default function Review(props) {
  const pars = props.text
    .split(/\n+/)
    .map((par, i) => <Text key={i}>{par}</Text>);

  return (
    <Container>
      <ReviewerPhoto
        src={props.user.image_url}
        width={"80px"}
        height={"80px"}
      />
      <ReviewerInfo>
        <ReviewerName>{props.user.name}</ReviewerName>
        <Date>{props.time_created}</Date>
      </ReviewerInfo>
      <Body>
        <Stars rating={props.rating} max={5} />
        {pars}
      </Body>
    </Container>
  );
}

Review.defaultProps = {
  text: "",
};

Review.propTypes = {
  user: PropTypes.object.isRequired,
  time_created: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};
