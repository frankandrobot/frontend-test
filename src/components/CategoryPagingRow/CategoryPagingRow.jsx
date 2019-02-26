import React, { Fragment } from 'react';
import { css } from '@emotion/core';

import SuperProvider from '../../context/SuperProvider';
import styles from '../../styles';

export const CategoryPagingRow = ({ total }) => {
  const { businessPerLoad, queryOffset, setQueryOffset } = SuperProvider.Context;
  return (
    <Fragment>
      <div
        css={css`
          color: ${styles.colors.blue};
          background-color: transparent;
          border: 1px solid ${styles.colors.blue};
          text-align: center;
          margin-top: -${styles.marginUnit * 2.5}px;
          margin-bottom: ${styles.marginUnit}px;
          margin-left: auto;
          margin-right: auto;
          width: 416px;
          max-width: calc(100% - ${styles.marginUnit * 2}px);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-radius: 2px;

          button {
            background-color: white;
            border: none;
            padding-top: ${styles.marginUnit}px;
            padding-bottom: ${styles.marginUnit}px;
            color: ${styles.colors.blue};
            line-height: 16px;
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.35s ease-in;

            &[disabled] {
              cursor: not-allowed;
            }
            &:hover:not([disabled]) {
              color: white;
              background-color: ${styles.colors.blue};
            }

            + button {
              border-left: 1px solid ${styles.colors.blue};
            }
          }
        `}
      >
        <button
          disabled={queryOffset < businessPerLoad}
          onClick={() => {
            if (queryOffset < businessPerLoad) {
              return false;
            }
            setQueryOffset();
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setQueryOffset(true);
          }}
        >
          Next
        </button>
      </div>
      <p
        css={css`
          color: ${styles.colors.lighterText};
          margin-bottom: ${styles.marginUnit * 4.5}px;
          text-align: center;
        `}
      >
        <em>
          Showing restaurants {queryOffset + 1} to {queryOffset + businessPerLoad} of {total}.
        </em>
      </p>
    </Fragment>
  );
};

export default CategoryPagingRow;
