import React from 'react';
import { css } from '@emotion/core';

import ToggleRadioItem from './ToggleRadioItem';

import styles from '../../styles';

export const CategoryFilter = ({
  onlyShowOpen,
  updateShowOpen,
  queryOffset,
  setQueryOffset,
  categoryFilters,
  updateCategoryFilters,
  priceFilters,
  updatePriceFilters,
}) => (
  <div
    css={css`
      max-width: calc(100% - ${styles.marginUnit * 2.5}px);
      width: ${styles.maxContentWidth};
      margin-left: auto;
      margin-right: auto;
    `}
  >
    <div
      css={css`
        padding-left: ${styles.marginUnit * 1.25}px;
        padding-right: ${styles.marginUnit * 1.25}px;
        width: 100%;

        display: grid;
        grid-template-areas: 'text open price category button';
        grid-template-columns: repeat(4, auto) 1fr;
      `}
    >
      <div
        css={css`
          color: #606060;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        `}
      >
        Filter By:
      </div>
      <div
        css={css`
          margin-left: ${styles.marginUnit * 2}px;
        `}
      >
        <ToggleRadioItem
          text='Open Now'
          isToggled={onlyShowOpen}
          onClick={() => {
            updateShowOpen(!onlyShowOpen);
          }}
        />
      </div>
      <div />
      <div />
      <div>
        <button />
      </div>
    </div>
  </div>
);

export default CategoryFilter;
