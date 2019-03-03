import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import _Stars from "../../../components/ui/stars";

import {
  MiscInfo as _MiscInfo,
  Category as _Category,
  Price as _Price,
  OpenStatus as _OpenStatus,
  Status as _Status,
} from "../restaurants/tile";

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

export default function HeaderComp(props) {
  const { className, name, rating, categories, price, is_closed } = props;
  return (
    <Header className={className}>
      <Title>{name}</Title>
      <Stars rating={rating} max={5} />
      <MiscInfo>
        <Category>{categories[0].title}</Category>
        {price ? <Price>{price}</Price> : null}
        <OpenStatus>
          <Status />
          {is_closed ? "Closed" : "Open Now"}
        </OpenStatus>
      </MiscInfo>
    </Header>
  );
}

HeaderComp.defaultPropTypes = {
  className: "",
};

HeaderComp.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  price: PropTypes.string,
  is_closed: PropTypes.bool,
};
