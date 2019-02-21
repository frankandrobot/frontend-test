// import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { ListingGrid } from '../src/components/ListingGrid/ListingGrid';
import Listing from '../src/components/Listing';

const FULL_QUERY = gql`
  query restaurantList(
    $price: String = "1"
    $categories: String = "italian,seafood,steak,japanese,tradamerican,newamerican,mexican,thai"
  ) {
    search(location: "Las Vegas", categories: $categories, limit: 50, price: $price) {
      business {
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

export default () => {
  return (
    <Query query={FULL_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading....</p>;
        }
        if (error) {
          return <p>ERROR! ${error.message}</p>;
        }

        return (
          <ListingGrid>
            {data.search.business.map((biz) => {
              const { alias, name, rating, price, photos, hours, categories } = biz;
              return (
                <Listing
                  key={alias}
                  alias={alias}
                  name={name}
                  rating={rating}
                  price={price}
                  open={(hours && hours[0] && hours[0].is_open_now) || false}
                  category={(categories && categories[0] && categories[0].title) || 'Food'}
                  image={(photos && photos[0]) || 'https://source.unsplash.com/random/304x228'}
                />
              );
            })}
          </ListingGrid>
        );
      }}
    </Query>
  );
};
