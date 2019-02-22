import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import styles from '../../styles';

export const InfoRow = ({ category = 'Food', price = '$', open = false, fontSize = 14 }) => (
  <div
    css={css`
      font-weight: 300;
      font-size: ${fontSize}px;
      line-height: ${fontSize * 1.45}px;
      display: grid;
      grid-template-areas: 'category price status';
      grid-template-columns: repeat(2, auto) 1fr;
    `}
  >
    <span
      css={css`
        grid-area: category;
      `}
      title={category}
    >
      {category}
    </span>
    <span
      css={css`
        grid-area: price;
      `}
    >
      &nbsp;&nbsp;•&nbsp;&nbsp;{price}
    </span>
    <span
      css={css`
        grid-area: status;
        min-width: 90px;
        text-align: right;

        &:before {
          content: '';
          background-color: ${open ? styles.colors.green : styles.colors.red};
          border-radius: 50%;
          display: inline-block;
          height: 22px;
          margin-left: ${styles.marginUnit}px;
          margin-right: ${styles.marginUnit / 2}px;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          width: 22px;
        }
      `}
    >
      {open ? 'Open Now' : 'Closed'}
    </span>
  </div>
);

InfoRow.propTypes = {
  category: PropTypes.string,
  price: PropTypes.string,
  open: PropTypes.bool,
  fontSize: PropTypes.number,
};

export default InfoRow;
