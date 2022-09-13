// import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithRouterAndProviders } from '../utils/testUtils'

import App from './App'

jest.mock('./OutPut', () => ({
  __esModule: true,
  ...jest.requireActual('./OutPut'),
  default: jest.fn(() => <div id='OutPut' />)
}))
jest.mock('./general_items/auth/LogIn', () => ({
  __esModule: true,
  ...jest.requireActual('./general_items/auth/LogIn'),
  default: jest.fn(() => <div id='LogIn' />)
}))
jest.mock('./general_items/auth/SignUp', () => ({
  __esModule: true,
  ...jest.requireActual('./general_items/auth/SignUp'),
  default: jest.fn(() => <div id='SignUp' />)
}))


describe('App, no mocks', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('./OutPut')
    jest.unmock('./general_items/auth/LogIn')
    jest.unmock('./general_items/auth/SignUp')
  })
  describe('snapshot', () => {
    test('Snapshot', () => {
      // const { useDispatch } = jest.requireActual('react-redux')
      const { container } = renderWithRouterAndProviders(<App />)
      expect(container).toMatchSnapshot()
      // screen.debug(container)
    })
  })
})
