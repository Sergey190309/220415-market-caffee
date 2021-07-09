import React from 'react'
import { Provider } from 'react-redux'
import { render } from '../../testUtils'
import Alert from './Alert'

import { createTestStore } from '../../testUtils'
import alerts from '../../redux/slices/alerts'

describe('Alert component testing', () => {
  let store
  beforeEach(() => {
    store = createTestStore(alerts)
    })
  test('rendering (snapshot)', () => {
    render(<Provider store={store}>
      <Alert />
    </Provider>)
  });
});
