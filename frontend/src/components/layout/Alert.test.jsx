import React from 'react';
import { Provider } from 'react-redux';
import { connectedRender, render } from '../../testUtils';
import { screen } from '@testing-library/react';

import store from '../../redux/store';
import { startAlert, removeAlert, initialState } from '../../redux/slices/alerts';
import Alert from './Alert';
// import { createTestStore } from '../../testUtils';
// import alerts from '../../redux/slices/alerts';

describe('Alert component testing', () => {
  const mockAlertInfo = {
    message: 'mockMessage',
    alertType: 'info',
    timeout: 3000,
    id: 'mockId',
  };
  beforeEach(() => {
    // store = createTestStore();
    // store = createTestStore(alerts);
  });
  test('rendering (snapshot)', async () => {
    render(
      <Provider store={store}>
        <Alert />
      </Provider>
    );
    let state = store.getState().alerts;
    store.dispatch(startAlert(mockAlertInfo));
    store.dispatch(startAlert({
      ...mockAlertInfo,
      message: 'mockMessage1',
      alertType: 'error'
    }));
    state = store.getState().alerts;
    console.log('Alert component testing, state ->', state);
    screen.debug();
  });
});
