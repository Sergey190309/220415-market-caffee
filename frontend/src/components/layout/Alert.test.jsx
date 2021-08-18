import React from 'react'
import { Provider } from 'react-redux'
import { render } from '../../testUtils'
import { screen } from '@testing-library/react'

import store from '../../redux/store'
import { startAlert, removeAlert } from '../../redux/slices/alerts'
import Alert from './Alert'
// import { createTestStore } from '../../testUtils';
// import alerts from '../../redux/slices/alerts';

describe('Alert component testing', () => {
  const mockAlertInfo = {
    message: 'mockMessage',
    alertType: 'info',
    timeout: 3000,
    id: 'mockId'
  }
  beforeEach(() => {
    // store = createTestStore();
    // store = createTestStore(alerts);
  })
  test('rendering changing state with action creators', async () => {
    const { container } = render(
      <Provider store={store}>
        <Alert />
      </Provider>
    )

    store.dispatch(startAlert(mockAlertInfo))
    let result = screen.getAllByRole('heading')
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveTextContent(mockAlertInfo.message)
    expect(result[0]).toHaveClass('teal')

    store.dispatch(
      startAlert({
        ...mockAlertInfo,
        message: 'mockMessage1',
        alertType: 'error',
        id: 'mockId1'
      })
    )
    result = screen.getAllByRole('heading')
    expect(result).toHaveLength(2)
    expect(result[1]).toHaveTextContent('mockMessage1')
    expect(result[1]).toHaveClass('orange')

    store.dispatch(removeAlert(mockAlertInfo.id))
    result = screen.getAllByRole('heading')
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveTextContent('mockMessage1')
    expect(result[0]).toHaveClass('orange')

    store.dispatch(removeAlert('mockId1'))
    expect(container).toBeEmptyDOMElement()
    // console.log('Alert component testing, byRole->', container);

    // screen.debug();
  })
})
