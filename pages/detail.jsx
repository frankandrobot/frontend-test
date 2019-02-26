import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import { css } from '@emotion/core';
import Head from 'next/head';

import InfoRow from '../src/components/InfoRow';
import Rating from '../src/components/Rating';

import MediaRow from '../src/components/DetailView/MediaRow';
import ReviewRow from '../src/components/DetailView/ReviewRow';

import { SuperProvider } from '../src/context/SuperProvider';
import styles from '../src/styles';

export const detail = ({ query: { alias, id } }) => {
  const context = useContext(SuperProvider.Context);
  return (
    <Query query={context.DETAIL_QUERY} variables={{ id }}>
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
        } = data.business;
        const open = hours[0] && hours[0].is_open_now;

        return (
          <main>
            <Head>
              <title>{name} Details | Superformula Frontend Test</title>
            </Head>
            <header
              css={css`
                max-width: calc(100% - ${styles.marginUnit * 2}px);
                width: ${styles.maxContentWidth};
                margin-left: auto;
                margin-right: auto;
                margin-bottom: ${styles.marginUnit * 2.25}px;
                padding-left: ${styles.marginUnit}px;
                padding-right: ${styles.marginUnit}px;
                @media screen and (max-width: ${styles.detailPage.mobileWidth}) {
                }
              `}
            >
              <h1
                css={css`
                  font-weight: 300;
                  font-size: 54px;
                  line-height: 64px;
                  margin-bottom: 16px;
                `}
              >
                {name}
              </h1>
              <div
                css={css`
                  margin-bottom: ${styles.marginUnit}px;
                `}
              >
                <Rating rating={rating} fontSize='30px' />
              </div>
              <InfoRow category={categories[0].title || 'Food'} price={price} open={open} fontSize={22} />
            </header>
            <hr
              css={css`
                @media screen and (max-width: ${styles.detailPage.mobileWidth}) {
                  display: none;
                }
              `}
            />
            <MediaRow
              name={name}
              lat={latitude}
              lng={longitude}
              image={photos[0]}
              open={open}
              address={location.formatted_address.replace('\n', ' ')}
            />
            <hr />
            <ReviewRow numReviews={review_count} reviews={reviews} />
          </main>
        );
      }}
    </Query>
  );
};

detail.getInitialProps = ({ query }) => ({ query });

export default detail;
