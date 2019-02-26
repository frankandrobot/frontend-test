import React, { Fragment, useContext } from 'react';
import { Query } from 'react-apollo';
import { css } from '@emotion/core';

import { CategoryLayout } from '../src/components/Layouts';
import { ListingGrid } from '../src/components/ListingGrid/ListingGrid';
import Listing from '../src/components/Listing';
import Loading from '../src/components/Loading';
import CategoryPagingRow from '../src/components/CategoryPagingRow';

import SuperProvider from '../src/context/SuperProvider';
import styles from '../src/styles';

export const index = () => {
  const context = useContext(SuperProvider.Context);
  const {
    categoryFilterValue,
    priceFilterValue,
    businessPerLoad,
    onlyShowOpen,
    queryOffset,
    isCategoryFiltered,
    CATEGORY_QUERY,
  } = context;
  return (
    <CategoryLayout>
      <Query
        query={CATEGORY_QUERY}
        variables={{
          limit: businessPerLoad,
          offset: queryOffset,
          openNow: onlyShowOpen,
          price: priceFilterValue(),
          categories: categoryFilterValue(),
        }}
        fetchPolicy='cache-and-network'
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return (
              <p>
                <strong>OH SNAP!</strong> {error.message}
              </p>
            );
          }
          const {
            search: { business, total },
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
                  let categoryName = (categories && categories[0] && categories[0].title) || 'Food';
                  if (isCategoryFiltered()) {
                    const selectedCategory = categories.find((category) => categoryFilterValue().includes(category.alias));
                  }
                  return (
                    <Listing
                      key={alias}
                      id={id}
                      alias={alias}
                      name={name}
                      rating={rating}
                      price={price}
                      open={open}
                      category={categoryName}
                      image={(photos && photos[0]) || 'https://source.unsplash.com/random/304x228'}
                    />
                  );
                })}
              </ListingGrid>
              <CategoryPagingRow total={total} />
            </Fragment>
          );
        }}
      </Query>
    </CategoryLayout>
  );
};

export default index;
