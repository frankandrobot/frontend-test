import React from 'react';
import { css } from '@emotion/core';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import styles from '../../styles';

export const CheckboxList = ({ children, text, isExpanded, isExpandedToggle }) => {
  return (
    <div
      css={css`
        display: inline-block;
        position: relative;
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
          width: 100%;
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
