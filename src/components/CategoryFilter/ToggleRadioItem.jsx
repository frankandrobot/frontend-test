import React from 'react';
import { css } from '@emotion/core';

import styles from '../../styles';

export const ToggleRadioItem = ({ text, isToggled, onClick }) => {
  return (
    <div>
      <span
        css={css`
          border: 1px solid #c8c8c8;
          border-radius: 50%;
          display: inline-block;
          margin-right: ${styles.marginUnit / 2}px;
          height: ${styles.marginUnit}px;
          width: ${styles.marginUnit}px;
          transform: translateY(${styles.marginUnit / 4}px);
          position: relative;

          &:before {
            content: '';
            display: block;
            height: ${styles.marginUnit / 2}px;
            width: ${styles.marginUnit / 2}px;
            background-color: ${isToggled ? '#002B56' : 'transparent'};
            border-radius: 50%;

            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
          }
        `}
      />
      <button
        css={css`
          font-weight: 500;
          font-size: 16px;
          line-height: 1.4;
          color: ${styles.colors.secondaryBorderColor};

          border: none;
          background-color: transparent;
        `}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default ToggleRadioItem;
