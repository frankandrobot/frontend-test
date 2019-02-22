import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Link from 'next/link';

import Rating from '../Rating';
import styles from '../../styles';

// #region 'Listing Styles'
const ButtonStyles = css`
  grid-area: button;
  display: grid;

  a {
    align-self: end;
    background-color: ${styles.colors.blue};
    border-radius: 2px;
    color: ${styles.colors.white};
    display: block;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding-bottom: ${styles.marginUnit}px;
    padding-top: ${styles.marginUnit}px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    width: 100%;
  }
`;

const CategoryStyles = css`
  grid-area: category;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HeadingStyles = css`
  font-weight: 500;
  font-size: 20px;
  grid-area: name;
  line-height: 28px;
  margin: 0;
  margin-bottom: ${styles.marginUnit / 2}px;
`;

const ImageStyles = css`
  object-fit: cover;
  object-position: center center;
  width: inherit;
  height: 100%;
`;

const ImageWrapperStyles = css`
  width: 100%;
  height: 230px;
  margin-bottom: ${styles.marginUnit}px;
  grid-area: image;
  overflow: hidden;

  @media screen and (max-width: ${styles.categoryPage.maxColumnWidth}px) {
    height: auto;
    img {
      margin-bottom: 20px;
    }
  }
`;

const InfoRowStyles = css`
  font-size: 12px;
  font-weight: 500;
  grid-area: details;
  line-height: 16px;
  margin-bottom: ${styles.marginUnit * 1.25}px;
  text-transform: uppercase;

  display: grid;
  grid-template-areas: 'category price status';
  grid-template-columns: repeat(2, auto) 1fr;
`;

const PriceStyles = css`
  grid-area: price;
`;

const RatingStyles = css`
  grid-area: rating;
  margin-bottom: ${styles.marginUnit}px;
`;

const StatusStyles = css`
  grid-area: status;
  min-width: 90px;
  text-align: right;

  &:before {
    content: '';
    display: inline-block;
    margin-left: ${styles.marginUnit}px;
    margin-right: 4px;

    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: transparent;
  }
`;

const WrapperStyles = css`
  display: grid;
  grid-template-areas:
    'image'
    'name'
    'rating'
    'details'
    'button';
  grid-template-rows: repeat(4, auto) 1fr;
  height: 100%;

  @media screen and (max-width: ${styles.categoryPage.maxColumnWidth}px) {
    grid-template-rows: 1fr repeat(4, auto);
  }
`;
// #endregion 'Listing Styles'

export const Listing = (props) => {
  const { id, image, imageAlt, name, alias, rating, category, price, open } = props;
  return (
    <div css={WrapperStyles}>
      <div css={ImageWrapperStyles}>
        <img src={image} alt={imageAlt || `${name} image`} css={ImageStyles} />
      </div>
      <h3 css={HeadingStyles}>{name}</h3>
      <div css={RatingStyles} title={`${rating} stars`}>
        <Rating rating={rating} />
      </div>
      <div css={InfoRowStyles}>
        <span css={CategoryStyles} title={category}>
          {category}
        </span>
        <span css={PriceStyles}>&nbsp;&nbsp;•&nbsp;&nbsp;{price}</span>
        <span
          css={[
            StatusStyles,
            css`
              &:before {
                background-color: ${open ? styles.colors.green : styles.colors.red};
              }
            `,
          ]}
        >
          {open ? 'Open Now' : 'Closed'}
        </span>
      </div>
      <div css={ButtonStyles}>
        <Link href={`/detail?alias=${alias}&id=${id}`} as={`/detail/${alias}/${id}`} prefetch>
          <a>LEARN MORE</a>
        </Link>
      </div>
    </div>
  );
};

Listing.defaultProps = {
  imageAlt: '',
  price: '$',
  open: false,
};

Listing.propTypes = {
  alias: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  name: PropTypes.string.isRequired,
  open: PropTypes.bool,
  price: PropTypes.string,
  rating: PropTypes.number.isRequired,
};

export default Listing;
