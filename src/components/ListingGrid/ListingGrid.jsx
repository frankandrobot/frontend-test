import React from 'react';
import { css } from '@emotion/core';

export const ListingGrid = ({ children }) => {
  return (
    <div
      css={css`
        margin-left: 10px;
        margin-right: 10px;
        max-width: 100vw;
        @media screen and (min-width: 330px) {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        > div {
          width: 310px;
          max-width: 100%;
          height: 450px;
          margin-bottom: 80px;
          margin-left: 20px;
          margin-right: 20px;
        }
      `}
    >
      {children}
    </div>
  );
};

export default ListingGrid;
