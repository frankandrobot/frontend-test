import React from 'react';
import { css } from '@emotion/core';
import { format } from 'date-fns';

import Review from '../Review';

import styles from '../../../styles';

export const ReviewRow = ({ numReviews, reviews }) => {
  return (
    <div
      css={css`
        padding-top: ${styles.marginUnit * 2}px;
        padding-left: ${styles.marginUnit * 1.5}px;
        padding-right: ${styles.marginUnit * 1.5}px;
        max-width: calc(100% - 40px);
        width: ${styles.maxContentWidth};
        @media screen and (min-width: ${styles.detailPage.minWidthDefinedGrid}) {
          margin-left: auto;
          margin-right: auto;
          padding-right: 0;
          padding-left: 0;
        }
      `}
    >
      <div
        css={css`
          font-weight: 300;
          font-size: 22px;
          line-height: 32px;
          margin-bottom: ${styles.marginUnit * 3}px;
        `}
      >
        {numReviews} {numReviews === 1 ? 'Review' : 'Reviews'}
      </div>
      <div>
        {reviews.map(({ id, rating, text, time_created, url, user: { id: user_id, image_url, name } }) => (
          <Review
            key={id}
            rating={rating}
            text={text}
            time={format(new Date(time_created), 'M/D/YYYY')}
            reviewLink={url}
            userId={user_id}
            userImage={image_url}
            userName={name}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewRow;
