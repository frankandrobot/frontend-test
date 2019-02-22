import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import fetch from 'node-fetch';
import { Global } from '@emotion/core';

import GlobalStyles from '../src/GlobalStyles';

const client = new ApolloClient({ fetch });

export class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Superformula Frontend Test</title>
          <link rel='icon' type='image/png' href='/static/images/SF.png' />
          <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' rel='stylesheet' />>
        </Head>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
        <Global styles={GlobalStyles} />
      </Container>
    );
  }
}

export default MyApp;
