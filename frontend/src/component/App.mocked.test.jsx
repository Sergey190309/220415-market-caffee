// This test has mocked some modules
import React from 'react'

import { Provider, useDispatch } from 'react-redux'

import { render, screen } from '@testing-library/react'

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
          <App />
        </Provider>
      )
      expect(mockSetDeviceSize).toHaveBeenCalledTimes(1)
      expect(mockSetDeviceSize).toHaveBeenCalledWith({
        type: setDeviceSize.type, payload: mockDeviceWidth
      })
      // console.log('inner width ->', window.innerWidth)
      // console.log('mockSetDeviceSize ->', mockSetDeviceSize.mock.calls)
      // screen.debug()
    })
  })
})
