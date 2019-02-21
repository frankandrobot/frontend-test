import { css } from '@emotion/core';

import SiteStyles from '../../styles';

export const ButtonStyles = css`
  grid-area: button;
  display: grid;

  a {
    align-self: end;
    background-color: ${SiteStyles.colors.blue};
    border-radius: 2px;
    color: ${SiteStyles.colors.white};
    display: block;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding-bottom: ${SiteStyles.marginUnit}px;
    padding-top: ${SiteStyles.marginUnit}px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    width: 100%;
  }
`;

export const CategoryStyles = css`
  grid-area: category;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HeadingStyles = css`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 20px;
  grid-area: name;
  line-height: 28px;
  margin: 0;
  margin-bottom: ${SiteStyles.marginUnit / 2}px;
`;

export const ImageStyles = css`
  object-fit: cover;
  object-position: center center;
  width: inherit;
  height: 100%;
`;

export const ImageWrapperStyles = css`
  width: 100%;
  height: 230px;
  margin-bottom: ${SiteStyles.marginUnit}px;
  grid-area: image;
  overflow: hidden;
`;

export const InfoRowStyles = css`
  font-size: 12px;
  font-weight: 500;
  grid-area: details;
  line-height: 16px;
  margin-bottom: ${SiteStyles.marginUnit * 1.25}px;
  text-transform: uppercase;

  display: grid;
  grid-template-areas: 'category price status';
  grid-template-columns: repeat(2, auto) 1fr;
`;

export const PriceStyles = css`
  grid-area: price;
`;

export const RatingStyles = css`
  grid-area: rating;
  margin-bottom: ${SiteStyles.marginUnit}px;
`;

export const StatusStyles = css`
  grid-area: status;
  min-width: 90px;
  text-align: right;

  &:before {
    content: '';
    display: inline-block;
    margin-left: ${SiteStyles.marginUnit}px;
    margin-right: 4px;

    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: transparent;
  }
`;

export const WrapperStyles = css`
  display: grid;
  font-family: 'Roboto', sans-serif;
  grid-template-areas:
    'image'
    'name'
    'rating'
    'details'
    'button';
  grid-template-rows: repeat(4, auto) 1fr;
  height: 100%;
`;

export default {
  ImageStyles,
  ImageWrapperStyles,
  InfoRowStyles,
  PriceStyles,
  RatingStyles,
  StatusStyles,
  WrapperStyles,
};
