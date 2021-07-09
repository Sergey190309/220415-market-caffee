import React from 'react';
import { Provider } from 'react-redux';
import { connectedRender } from '../../testUtils';
import { screen } from '@testing-library/react';

import Alert from './Alert';
import { createTestStore } from '../../testUtils';
// import alerts from '../../redux/slices/alerts';

describe('Alert component testing', () => {
  let store;

  beforeEach(() => {
    // store = createTestStore();
    // store = createTestStore(alerts);
  });
  test('rendering (snapshot)', () => {
    connectedRender(<Alert />)
    screen.debug()
  });
});
