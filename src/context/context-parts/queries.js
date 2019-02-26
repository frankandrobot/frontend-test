import gql from 'graphql-tag';

export const contextQueries = {
  // #region 'GraphQL Queries'
  // * Add the graphql queries used to clean up the views
  CATEGORY_QUERY: gql`
    query restaurantList($price: String!, $categories: String!, $openNow: Boolean, $limit: Int!, $offset: Int!) {
      search(
        location: "Las Vegas"
        categories: $categories
        price: $price
        open_now: $openNow
        limit: $limit
        offset: $offset
      ) {
        total
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
  `,
  DETAIL_QUERY: gql`
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
  `,
  // #endregion 'GraphQL Queries'
};

export default contextQueries;
