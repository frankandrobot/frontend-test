import React from 'react';
import { storiesOf } from '@storybook/react';

import { Rating } from './Rating';

storiesOf('Rating', module)
  .add('Zero Stars', () => <Rating rating={0} />)
  .add('3.5 Stars', () => <Rating rating={3.5} />)
  .add('5 Stars', () => <Rating rating={5} />)
  .add('With 5 out of 10', () => <Rating rating={5} maxStars={10} />);
