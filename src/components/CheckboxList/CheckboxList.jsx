import React from 'react';
import { css } from '@emotion/core';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import styles from '../../styles';

export const CheckboxList = ({ children, text, isExpanded, isExpandedToggle }) => {
  const listWidth = '150px';
  return (
    <div
      css={css`
        display: inline-block;
        position: relative;
        width: ${listWidth};
        margin-top: 10px;
      `}
      onMouseLeave={() => {
        if (isExpanded) {
          isExpandedToggle({ targetVal: false });
        }
      }}
    >
      <div
        css={css`
          display: inline-grid;
          grid-template-columns: 1fr auto;
          border-bottom: 1px solid ${styles.colors.grayBorderColor};
          padding-bottom: ${styles.marginUnit / 2}px;
          width: 100%;

          font-weight: 500;
          font-size: 16px;
          line-height: 16px;
        `}
        onClick={isExpandedToggle}
      >
        <span>{text}</span>
        <span>{isExpanded ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>
      <div
        css={css`
          height: auto;
          max-height: ${isExpanded ? '5000px' : '0'};
          overflow: hidden;
          position: absolute;
          top: 100%;
          left: 0;
          border: 1px solid ${isExpanded ? styles.colors.grayBorderColor : 'transparent'};
          border-top: none;
          background-color: ${styles.colors.white};
          width: ${listWidth};

          [data-checkbox-item] {
            margin-top: ${styles.marginUnit * 0.75}px;
            padding-left: ${styles.marginUnit}px;
            padding-right: ${styles.marginUnit}px;

            &:last-of-type {
              margin-bottom: ${styles.marginUnit * 0.75}px;
            }
          }
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default CheckboxList;
