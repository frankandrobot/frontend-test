import React from 'react';
import { css } from '@emotion/core';

import styles from '../../styles';

export const ToggleCheckItem = ({ text, isToggled, onToggleHandler, asRadio }) => {
  // ! There is the possibility that this won't be unique as is, but given the data it will be in these scenarios.
  const slug = `${text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')}`;

  const toggleFillStyles = asRadio
    ? css`
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
      `
    : css`
        &:before {
          content: '';
          display: block;
          border: solid ${isToggled ? styles.colors.white : 'transparent'};
          border-width: 0 2px 2px 0;
          height: ${styles.marginUnit / 2.5}px;
          width: ${styles.marginUnit / 5}px;
          transition: border 0.3s ease, opacity 0.3s ease;

          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%) rotate(45deg);
        }
      `;
  return (
    <div data-checkbox-item onClick={onToggleHandler}>
      <label
        htmlFor={slug}
        css={css`
          font-weight: 500;
          font-size: 16px;
          line-height: 1.4;
          color: ${styles.colors.secondaryBorderColor};
        `}
      >
        <span
          css={[
            css`
              border: 1px solid ${isToggled && !asRadio ? styles.colors.black : '#c8c8c8'};
              border-radius: 50%;
              cursor: pointer;
              display: inline-block;
              margin-right: ${styles.marginUnit / 2}px;
              height: ${styles.marginUnit}px;
              width: ${styles.marginUnit}px;
              transform: translateY(${styles.marginUnit / 4}px);
              position: relative;
              background-color: ${isToggled && !asRadio ? styles.colors.black : 'transparent'};
            `,
            toggleFillStyles,
          ]}
        />
        {text}
      </label>
      <input
        css={css`
          display: none;
        `}
        type='checkbox'
        name={slug}
        id={slug}
        onChange={onToggleHandler}
        checked={isToggled}
      />
    </div>
  );
};

export default ToggleCheckItem;
