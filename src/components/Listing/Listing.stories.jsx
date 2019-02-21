import React from 'react';
import { storiesOf } from '@storybook/react';
import 'typeface-roboto';
import 'typeface-roboto-condensed';

import { Global } from '@emotion/core';

import GlobalStyles from '../GlobalStyles';
import { Listing } from './Listing';

storiesOf('Listing', module)
  .add('Open Restaurant', () => (
    <div style={{ width: '304px', height: '450px' }}>
      <Global styles={GlobalStyles} />
      <Listing
        name='Very Long Name Restaurants Number 1 In List'
        image='https://source.unsplash.com/random/304x228'
        alias='#'
        rating={3.5}
        category='Thai'
        price='$'
        open={true}
      />
    </div>
  ))
  .add('Closed Restaurant', () => (
    <div style={{ width: '304px', height: '450px' }}>
      <Listing
        name='Test Restaurant Two'
        image='https://source.unsplash.com/random/304x228'
        alias='#'
        rating={0.5}
        category='Juice Bars & SmoothiesJuice Bars & Smoothies'
        price='$$'
        open={false}
      />
    </div>
  ));
