import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { css } from '@emotion/core';

import Rating from '../src/components/Rating';

const RESTAURANT_QUERY = gql`
  query restaurantDetail($id: String!) {
    business(id: $id) {
      name
      rating
      categories {
        title
        alias
      }
      price
      hours {
        is_open_now
      }
      location {
        address1
        address2
        address3
        city
        state
        postal_code
        formatted_address
      }
      coordinates {
        latitude
        longitude
      }
      photos
      review_count
      reviews(limit: 3, offset: 0) {
        id
        rating
        text
        time_created
        url
        user {
          id
          image_url
          name
        }
      }
    }
  }
`;

const addReview = (review) => {
  return (
    <div key={review.id}>
      <img src={review.user.image_url} alt={`${review.user.name} portrait`} />
      <span>{review.user.name}</span>
      <span>{review.time_created}</span>
      <Rating rating={review.rating} />
      <span>
        {review.text}
        {review.text.indexOf('...') !== -1 && (
          <a href={review.url} target='_blank'>
            {' '}
            read more
          </a>
        )}
      </span>
    </div>
  );
};

export const detail = ({ query: { alias, id } }) => {
  return (
    <Query query={RESTAURANT_QUERY} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading....</p>;
        }
        if (error) {
          return <p>ERROR! ${error.message}</p>;
        }

        const {
          categories,
          coordinates: { latitude, longitude },
          hours,
          location,
          name,
          photos,
          price,
          rating,
          review_count,
          reviews,
          reviews2,
          reviews3,
        } = data.business;
        const open = hours[0] && hours[0].is_open_now;

        return (
          <div>
            <h1>{name}</h1>
            <Rating rating={rating} />
            <div>
              <span title={categories[0].title || 'Food'}>{categories[0].title || 'Food'}</span>
              <span>&nbsp;&nbsp;•&nbsp;&nbsp;{price}</span>
              <span
                css={[
                  css`
                    &:before {
                      background-color: ${open ? 'green' : 'red'};
                    }
                  `,
                ]}
              >
                {open ? 'Open Now' : 'Closed'}
              </span>
            </div>
            <hr />
            <span>[THE MAP]</span>
            <span>{location.formatted_address.replace('\n', ' ')}</span>
            {photos[0] && <img src={photos[0]} alt={`${name} photo`} />}
            <hr />
            <span>
              {review_count} {review_count === 1 ? 'Review' : 'Reviews'}
            </span>
            <div>{reviews && reviews.length > 0 && reviews.map(addReview)}</div>
          </div>
        );
      }}
    </Query>
  );
};

detail.getInitialProps = ({ query }) => ({ query });

export default detail;
