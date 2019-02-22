import React from 'react';
import { css } from '@emotion/core';

import Rating from '../../Rating';

import styles from '../../../styles';

export const Review = ({ rating, text, time, reviewLink, userId, userImage, userName }) => (
  <div
    css={css`
      display: grid;
      @media screen and (min-width: ${styles.detailPage.minHorizontalReviewWidth}px) {
        grid-template-areas: 'user review';
        grid-template-columns: 1fr 3fr;
      }
      @media screen and (max-width: ${styles.detailPage.minHorizontalReviewWidth - 1}px) {
        grid-template-areas: 'user' 'review';
        grid-template-rows: repeat(2, auto);
      }

      & + & {
        border-top: 1px solid ${styles.colors.grayBorderColor};
        padding-top: ${styles.marginUnit * 3}px;
        margin-top: ${styles.marginUnit * 3}px;
      }
    `}
  >
    <div
      css={css`
        grid-area: user;
        display: grid;
        grid-template-areas: 'image name';
        grid-template-columns: 80px 1fr;
        @media screen and (max-width: ${styles.detailPage.minHorizontalReviewWidth - 1}px) {
          margin-bottom: ${styles.marginUnit}px;
        }
      `}
    >
      <img
        css={css`
          grid-area: image;
          height: 80px;
          width: 80px;
          object-fit: cover;
          object-position: center center;
          @media screen and (max-width: ${styles.detailPage.mobileWidth}) {
            height: 64px;
            width: 64px;
          }
        `}
        src={userImage}
        alt={`${userName} portrait`}
        height='64'
        height='64'
      />
      <div
        css={css`
          grid-area: name;
          padding-left: ${styles.marginUnit * 2}px;
        `}
      >
        <div
          css={css`
            font-weight: 300;
            font-size: 22px;
            line-height: 24px;
          `}
        >
          {userName}
        </div>
        <div
          css={css`
            color: ${styles.colors.lightText};
            font-weight: 300;
            font-size: 16px;
            line-height: 24px;
          `}
        >
          {time}
        </div>
      </div>
    </div>
    <div
      css={css`
        grid-area: review;
      `}
    >
      <div
        css={css`
          margin-bottom: ${styles.marginUnit * 1.25}px;
        `}
      >
        <Rating rating={rating} />
      </div>
      <div
        css={css`
          font-weight: 300;
          font-size: 20px;
          line-height: 28px;
        `}
      >
        {text}
        {text.indexOf('...') !== -1 && (
          <a
            css={css`
              text-decoration: none;
            `}
            href={reviewLink}
            target='_blank'
          >
            read more
          </a>
        )}
      </div>
    </div>
  </div>
);

export default Review;
