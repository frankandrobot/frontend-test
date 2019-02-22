import React, { Fragment, useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { css } from '@emotion/core';

import { CategoryLayout } from '../src/components/Layouts';

import { ListingGrid } from '../src/components/ListingGrid/ListingGrid';
import Listing from '../src/components/Listing';

import styles from '../src/styles';

const FULL_QUERY = gql`
  query restaurantList($price: String!, $categories: String!, $openNow: Boolean, $limit: Int!, $offset: Int!) {
    search(location: "Las Vegas", categories: $categories, price: $price, open_now: $openNow, limit: $limit, offset: $offset) {
      business {
        __typename
        id
        alias
        name
        rating
        price
        photos
        hours {
          __typename
          is_open_now
        }
        categories {
          __typename
          alias
          title
        }
      }
    }
  }
`;

const baseCategoryFilter = [
  { alias: 'tradamerican,newamerican', name: 'America', isFilter: false },
  { alias: 'italian', name: 'Italian', isFilter: false },
  { alias: 'seafood', name: 'Seafood', isFilter: false },
  { alias: 'steak', name: 'Steak', isFilter: false },
  { alias: 'japanese', name: 'Japanese', isFilter: false },
  { alias: 'mexican', name: 'Mexican', isFilter: false },
  { alias: 'thai', name: 'Thai', isFilter: false },
];
const basePriceFilter = [
  {
    value: '1',
    label: '$',
    isFilter: false,
  },
  {
    value: '2',
    label: '$$',
    isFilter: false,
  },
  {
    value: '3',
    label: '$$$',
    isFilter: false,
  },
  {
    value: '4',
    label: '$$$$',
    isFilter: false,
  },
];

export const index = () => {
  const businessPerLoad = 20;

  const [onlyShowOpen, updateShowOpen] = useState(false);
  const [queryOffset, setQueryOffset] = useState(0);
  const [categoryFilters, updateCategoryFilters] = useState(baseCategoryFilter);
  const [priceFilters, updatePriceFilters] = useState(basePriceFilter);

  return (
    <CategoryLayout
      onlyShowOpen={onlyShowOpen}
      updateShowOpen={updateShowOpen}
      queryOffset={queryOffset}
      setQueryOffset={setQueryOffset}
      categoryFilters={categoryFilters}
      updateCategoryFilters={updateCategoryFilters}
      priceFilters={priceFilters}
      updatePriceFilters={updatePriceFilters}
    >
      <Query
        query={FULL_QUERY}
        variables={{
          limit: businessPerLoad,
          offset: queryOffset,
          openNow: onlyShowOpen,
          price: priceFilters.some((price) => price.isFilter)
            ? priceFilters
                .filter((price) => price.isFilter)
                .map((price) => price.alias)
                .join(',')
            : '',
          categories: categoryFilters.some((category) => category.isFilter)
            ? categoryFilters
                .filter((category) => category.isFilter)
                .map((category) => category.alias)
                .join(',')
            : categoryFilters.map((category) => category.alias).join(','),
        }}
        fetchPolicy='cache-and-network'
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return <p>Loading....</p>;
          }
          if (error) {
            return <p>ERROR! ${error.message}</p>;
          }
          const {
            search: { business },
          } = data;
          return (
            <Fragment>
              <div
                css={css`
                  max-width: calc(100% - ${styles.marginUnit * 2.5}px);
                  width: ${styles.maxContentWidth};
                  margin-left: auto;
                  margin-right: auto;
                `}
              >
                <h2
                  css={css`
                    font-weight: 300;
                    font-size: 34px;
                    line-height: 40px;
                    color: ${styles.colors.headingText};
                    padding-left: ${styles.marginUnit * 1.25}px;
                    padding-right: ${styles.marginUnit * 1.25}px;
                  `}
                >
                  All Restaurants
                </h2>
              </div>
              <ListingGrid>
                {business.map((biz) => {
                  const { alias, name, rating, price, photos, hours, categories, id } = biz;
                  const open = (hours && hours[0] && hours[0].is_open_now) || false;
                  return (
                    <Listing
                      key={alias}
                      id={id}
                      alias={alias}
                      name={name}
                      rating={rating}
                      price={price}
                      open={open}
                      category={(categories && categories[0] && categories[0].title) || 'Food'}
                      image={(photos && photos[0]) || 'https://source.unsplash.com/random/304x228'}
                    />
                  );
                })}
              </ListingGrid>
              <div
                css={css`
                  color: ${styles.colors.blue};
                  background-color: transparent;
                  border: 1px solid ${styles.colors.blue};
                  text-align: center;
                  margin-top: -40px;
                  margin-bottom: 80px;
                  margin-left: auto;
                  margin-right: auto;
                  width: 416px;
                  max-width: calc(100% - ${styles.marginUnit * 2}px);
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  border-radius: 2px;

                  button {
                    background-color: transparent;
                    border: none;
                    padding-top: ${styles.marginUnit}px;
                    padding-bottom: ${styles.marginUnit}px;
                    color: ${styles.colors.blue};
                    line-height: 16px;
                    font-size: 14px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transform: all 0.35s ease-in;

                    &[disabled] {
                      cursor: not-allowed;
                    }
                    &:hover:not([disabled]) {
                      font-weight: 500;
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
                    setQueryOffset(queryOffset - businessPerLoad);
                  }}
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    setQueryOffset(queryOffset + businessPerLoad);
                  }}
                >
                  Next
                </button>
              </div>
            </Fragment>
          );
        }}
      </Query>
    </CategoryLayout>
  );
};

export default index;
