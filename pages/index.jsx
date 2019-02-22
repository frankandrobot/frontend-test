import React, { Fragment, useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { CategoryLayout } from '../src/components/Layouts';

import { ListingGrid } from '../src/components/ListingGrid/ListingGrid';
import Listing from '../src/components/Listing';

const FULL_QUERY = gql`
  query restaurantList($price: String!, $categories: String!, $openNow: Boolean, $limit: Int!, $offset: Int!) {
    search(
      location: "Las Vegas"
      categories: $categories
      price: $price
      open_now: $openNow
      limit: $limit
      offset: $offset
    ) {
      business {
        id
        alias
        name
        rating
        price
        photos
        hours {
          is_open_now
        }
        categories {
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
          return (
            <Fragment>
              <ListingGrid>
                {data.search.map((biz) => {
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
              <div>
                <button>Load More</button>
              </div>
            </Fragment>
          );
        }}
      </Query>
    </CategoryLayout>
  );
};

export default index;
