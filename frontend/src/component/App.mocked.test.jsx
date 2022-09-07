// This test has mocked some modules
import React from 'react'

import { useAppDispatch } from '../hooks/reactRedux'

import { renderWithRouterAndProviders } from '../utils/testUtils'

import App from './App'

// import OutPut from './OutPut'
// import LogIn from './general_items/auth/LogIn'
// import SignUp from './general_items/auth/SignUp'

jest.mock('../hooks/reactRedux', () => ({
  __esModule: true,
  ...jest.requireActual('../hooks/reactRedux'),
  useAppDispatch: jest.fn()
}))

jest.mock('./OutPut', () => ({
  __esModule: true,
  ...jest.requireActual('./OutPut'),
  default: jest.fn(() => <div />)
}))
jest.mock('./general_items/auth/LogIn', () => ({
  __esModule: true,
  ...jest.requireActual('./general_items/auth/LogIn'),
  default: jest.fn(() => <div />)
}))
jest.mock('./general_items/auth/SignUp', () => ({
  __esModule: true,
  ...jest.requireActual('./general_items/auth/SignUp'),
  default: jest.fn(() => <div />)
}))


describe('App, mocked modules', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('../hooks/reactRedux')
    jest.unmock('./OutPut')
    jest.unmock('./general_items/auth/LogIn')
    jest.unmock('./general_items/auth/SignUp')
  })
  describe('logic', () => {
    test('window width', async () => {
      // mockedRR.useDispatch = jest.fn()
      const mockDispatch = jest.fn()
      const mockSetDeviceSize = jest.fn()

      useAppDispatch.mockImplementation(() => mockDispatch)
      const mockDeviceWidth = 2048
      window.innerWidth = mockDeviceWidth
      renderWithRouterAndProviders(<App setDeviceSize={mockSetDeviceSize} />)
      expect(mockSetDeviceSize).toHaveBeenCalledTimes(1)
      expect(mockSetDeviceSize).toHaveBeenCalledWith(mockDeviceWidth)
      // console.log('inner width ->', window.innerWidth)
      // console.log('mockSetDeviceSize ->', mockSetDeviceSize.mock.calls)
    })
  })
})
