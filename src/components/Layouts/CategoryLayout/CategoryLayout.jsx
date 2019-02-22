import React, { Fragment } from 'react';
import { css } from '@emotion/core';

import CategoryFilter from '../../CategoryFilter';

import styles from '../../../styles';

export const CategoryLayout = ({
  children,
  onlyShowOpen,
  updateShowOpen,
  queryOffset,
  setQueryOffset,
  categoryFilters,
  updateCategoryFilters,
  priceFilters,
  updatePriceFilters,
}) => (
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni neque doloribus voluptatem laboriosam voluptates animi minima libero, eligendi
        mollitia! Officia, id. Excepturi maiores, ullam nulla voluptatum ut nam voluptate esse.
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
      <CategoryFilter
        onlyShowOpen={onlyShowOpen}
        updateShowOpen={updateShowOpen}
        queryOffset={queryOffset}
        setQueryOffset={setQueryOffset}
        categoryFilters={categoryFilters}
        updateCategoryFilters={updateCategoryFilters}
        priceFilters={priceFilters}
        updatePriceFilters={updatePriceFilters}
      />
    </div>
    {children}
  </Fragment>
);

export default CategoryLayout;
