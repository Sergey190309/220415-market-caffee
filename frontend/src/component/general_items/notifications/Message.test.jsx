import React from 'react'
import { renderWithProviders, setupStore } from '../../../utils/testUtils'

import Message from './Message'
describe('Message', () => {
  const testAlertsState = [{
    message: 'mockMessage',
    alertType: 'error',
    timeout: 3000,
    id: 'mockId'
  }]
  describe('appearance', () => {
    test('snapshot', () => {
      const mockedAlertsState = { alerts: testAlertsState }
      const mockedStore = setupStore({alerts: mockedAlertsState})
      const { container } = renderWithProviders(<Message />, {
        preloadedState: {alerts: mockedAlertsState }, mockedStore
      })
      expect(container).toMatchSnapshot();
      // screen.debug()
    })
  })
})