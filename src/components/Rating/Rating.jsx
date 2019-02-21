/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { IconContext } from 'react-icons';
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';
import PropTypes from 'prop-types';

import SiteStyles from '../../styles';

const partialStarMinVal = 0.3;
const partialStarMaxVal = 0.7;

const numberFullStars = (rating) => {
  return rating - (rating % 1) + (rating % 1 > partialStarMaxVal ? 1 : 0);
};

const numberPartialStars = (rating) => {
  const partialVal = rating % 1;
  return partialVal >= partialStarMinVal && partialVal <= partialStarMaxVal ? 1 : 0;
};

const numberEmptyStars = ({ maxStars, rating }) => {
  return maxStars - numberFullStars(rating) - numberPartialStars(rating);
};

export const Rating = ({ maxStars, rating }) => {
  return (
    <IconContext.Provider value={{ color: SiteStyles.colors.blue, size: '21px' }}>
      <span
        css={css`
          & > svg {
            + svg {
              margin-left: -2px;
            }
          }
        `}
      >
        {Array.from(Array(numberFullStars(rating))).map((_, idx) => (
          <IoMdStar key={idx} />
        ))}
        {numberPartialStars(rating) === 1 && <IoMdStarHalf />}
        {Array.from(Array(numberEmptyStars({ maxStars, rating }))).map((_, idx) => (
          <IoMdStarOutline key={idx} />
        ))}
      </span>
    </IconContext.Provider>
  );
};

Rating.defaultProps = {
  maxStars: 5,
  rating: 0,
};

Rating.propTypes = {
  maxStars: PropTypes.number,
  rating: PropTypes.number,
};

export default Rating;
