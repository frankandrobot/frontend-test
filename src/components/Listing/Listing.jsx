import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Link from 'next/link';

import Rating from '../Rating';
import SiteStyles from '../../styles';

import {
  ButtonStyles,
  CategoryStyles,
  HeadingStyles,
  ImageStyles,
  ImageWrapperStyles,
  InfoRowStyles,
  PriceStyles,
  RatingStyles,
  StatusStyles,
  WrapperStyles,
} from './ListingStyles';

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
                background-color: ${open ? SiteStyles.colors.green : SiteStyles.colors.red};
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
