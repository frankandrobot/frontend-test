import React from 'react';
import { css } from '@emotion/core';

import styles from '../../styles';

export const ListingGrid = ({ children }) => {
  return (
    <div
      css={css`
        margin-left: 20px;
        margin-right: 20px;
        max-width: 100vw;

        > div {
          width: 100%;
          height: 90vh;
          max-height: 500px;
          margin-bottom: 80px;
        }

        /* two Listings no longer fit */
        @media screen and (min-width: ${styles.categoryPage.minGridWidth}px) {
          margin-left: auto;
          margin-right: auto;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          max-width: ${styles.maxContentWidth};

          > div {
            width: 310px;
            max-width: 100%;
            height: 450px;
            margin-bottom: 80px;
            margin-left: 20px;
            margin-right: 20px;
          }
        }
      `}
    >
      {children}
    </div>
  );
};

export default ListingGrid;
