import React, { Fragment } from 'react';
import { css } from '@emotion/core';

import CategoryFilterRow from '../../CategoryFilterRow';

import styles from '../../../styles';

export const CategoryLayout = ({ children }) => (
  <Fragment>
    <div
      css={css`
        max-width: calc(100% - ${styles.marginUnit * 2.5}px);
        width: ${styles.maxContentWidth};
        margin-left: auto;
        margin-right: auto;
      `}
    >
      <h1
        css={css`
          font-weight: 300;
          line-height: 64px;
          font-size: 54px;
          color: ${styles.colors.headingText};
          margin-bottom: ${styles.marginUnit * 1.5}px;
          padding-left: ${styles.marginUnit * 1.25}px;
          padding-right: ${styles.marginUnit * 1.25}px;
        `}
      >
        Restaurants
      </h1>
      <p
        css={css`
          padding-left: ${styles.marginUnit * 1.25}px;
          padding-right: ${styles.marginUnit * 1.25}px;
          margin-bottom: ${styles.marginUnit * 2.25}px;
          color: ${styles.colors.lightText};
          font-weight: 300;
          line-height: 32px;
          font-size: 22px;
        `}
      >
        Take a look around and find your next place to eat in beautiful Las Vegas!
      </p>
    </div>
    <div
      css={css`
        border-top: 1px solid ${styles.colors.grayBorderColor};
        border-bottom: 1px solid ${styles.colors.grayBorderColor};
        margin-bottom: ${styles.marginUnit * 4}px;
        padding-top: ${styles.marginUnit * 1.25}px;
        padding-bottom: ${styles.marginUnit * 1.25}px;
      `}
    >
      <CategoryFilterRow />
    </div>
    {children}
  </Fragment>
);

export default CategoryLayout;
