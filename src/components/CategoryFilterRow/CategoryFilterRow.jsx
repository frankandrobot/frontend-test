import React, { useContext } from 'react';
import { css } from '@emotion/core';

import CheckboxList from '../CheckboxList';
import ToggleCheckItem from '../ToggleCheckItem';

import SuperProvider from '../../context/SuperProvider';
import styles from '../../styles';

export const CategoryFilterRow = () => {
  const {
    onlyShowOpen,
    updateShowOpen,
    updateIsCategoryExpanded,
    categoryFilters,
    toggleCategoryFilter,
    isCategoryExpanded,
    isCategoryFiltered,
    isPriceFiltered,
    isPriceExpanded,
    updateIsPriceExpanded,
    priceFilters,
    togglePriceFilter,
    clearFilters,
    resetPriceFilters,
    resetCategoryFilters,
  } = useContext(SuperProvider.Context);

  return (
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
            padding-top: 8px;
          `}
        >
          Filter By:
        </div>
        <div
          css={css`
            margin-left: ${styles.marginUnit * 2}px;
            margin-right: ${styles.marginUnit * 2}px;
          `}
        >
          <div
            css={css`
              border-bottom: 1px solid ${styles.colors.grayBorderColor};
              padding-bottom: ${styles.marginUnit / 2}px;
              margin-top: 6px;
            `}
          >
            <ToggleCheckItem
              text='Open Now'
              isToggled={onlyShowOpen}
              onToggleHandler={() => {
                updateShowOpen();
              }}
            />
          </div>
        </div>
        <div
          css={css`
            margin-right: ${styles.marginUnit * 2}px;
          `}
        >
          <CheckboxList text='Price' isExpanded={isPriceExpanded} isExpandedToggle={updateIsPriceExpanded}>
            {priceFilters.map((price) => (
              <ToggleCheckItem
                key={price.value}
                text={price.label}
                id={`price-${price.value}`}
                isToggled={(!isPriceFiltered() && price.label === 'All') || price.isFilter}
                onToggleHandler={() => {
                  if (price.value === '') {
                    resetPriceFilters();
                  } else {
                    togglePriceFilter(price);
                  }
                }}
              />
            ))}
          </CheckboxList>
        </div>
        <div>
          <CheckboxList text='Categories' isExpanded={isCategoryExpanded} isExpandedToggle={updateIsCategoryExpanded}>
            {categoryFilters.map((category) => (
              <ToggleCheckItem
                key={category.alias}
                text={category.name}
                id={`category-${category.name
                  .toLowerCase()
                  .replace(/ /g, '-')
                  .replace(/[^\w-]+/g, '')}`}
                isToggled={(!isCategoryFiltered() && category.name === 'All') || category.isFilter}
                onToggleHandler={() => {
                  if (category.name === 'All') {
                    resetCategoryFilters();
                  } else {
                    toggleCategoryFilter({ ...category });
                  }
                }}
              />
            ))}
          </CheckboxList>
        </div>
        <div
          css={css`
            text-align: right;
          `}
        >
          <button
            css={css`
              background-color: ${styles.colors.white};
              color: ${styles.colors.secondaryBorderColor};
              border: 1px solid ${styles.colors.secondaryBorderColor};
              padding: ${styles.marginUnit * 0.75}px ${styles.marginUnit * 2.25}px;
              text-transform: uppercase;
              line-height: 16px;
              font-size: 12px;
              transition: all 0.15s ease-in;
              &:hover {
                color: ${styles.colors.white};
                background-color: ${styles.colors.secondaryBorderColor};
              }
            `}
            onClick={clearFilters}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterRow;
