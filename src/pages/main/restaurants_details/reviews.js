import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

import _Bar from "../../../components/ui/bar";

import Review from "./review";

const Section = styled.section`
  margin: 0;
  padding: 0;
  margin-top: 48px;
  padding-left: ${props => props.theme.bodyPaddingLeft};
  padding-right: ${props => props.theme.bodyPaddingRight};
`;

const Count = styled.div`
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeightLight};
  font-size: 22px;
  height: 22px;
  color: #666666;
  margin-bottom: 48px;
`;

const ReviewContainer = styled.div`
  width: 100%;
`;

const Bar = styled(_Bar)`
  margin-top: 73px;
`;

export default function Reviews(props) {
  return (
    <Section>
      <Count>{props.total} Reviews</Count>
      {props.reviews.map((r, i) => {
        return (
          <ReviewContainer key={i}>
            <Review {...r} />
            {i < props.reviews.length - 1 ? <Bar /> : null}
          </ReviewContainer>
        );
      })}
    </Section>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number.isRequired,
};
