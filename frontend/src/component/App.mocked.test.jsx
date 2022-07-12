// This test has mocked some modules
import React from 'react'

import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { render } from '@testing-library/react'

import store from '../redux/store'

import App from './App'

import { setDeviceSize } from '../redux/slices'


jest.mock('react-redux', () => ({
  __esModule: true,
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}))

describe('App, mocked modules', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('react-redux')
  })
  describe('logic', () => {
    test('window width', () => {
      // mockedRR.useDispatch = jest.fn()

      const mockSetDeviceSize = jest.fn()

      useDispatch.mockImplementation(() => mockSetDeviceSize)
      const mockDeviceWidth = 2048
      window.innerWidth = mockDeviceWidth
      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      )
      expect(mockSetDeviceSize).toHaveBeenCalledTimes(3)
      expect(mockSetDeviceSize).toHaveBeenCalledWith({
        type: setDeviceSize.type, payload: mockDeviceWidth
      })
      // console.log('inner width ->', window.innerWidth)
      // console.log('mockSetDeviceSize ->', mockSetDeviceSize.mock.calls)
      // screen.debug()
    })
  })
})
