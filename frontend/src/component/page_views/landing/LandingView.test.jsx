import React from 'react'
import { renderWithProviders } from '../../../utils/testUtils'
import { screen } from '@testing-library/react'

import { useAppSelector } from '../../../hooks/reactRedux'
import LandingView from './LandingView'
// import ElementSwitcher from '../page_elements/ElementSwitcher'

jest.mock('../../../hooks/reactRedux', () => ({
  __esModule: true,
  ...jest.requireActual('../../../hooks/reactRedux'),
  useAppSelector: jest.fn()
}))
jest.mock('../page_elements/ElementSwitcher', () => ({
  __esModule: true,
  ...jest.requireActual('../page_elements/ElementSwitcher'),
  default: () => <div data-testid='element-switcher' />
}))

describe('LandingView testing', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('../../../hooks/reactRedux')
    jest.unmock('../page_elements/ElementSwitcher')
  })
  test('be empty if loaded false', () => {
    useAppSelector.mockImplementation(() => ({ loaded: false }))
    const { container } = renderWithProviders(<LandingView />)
    expect(container).toBeEmptyDOMElement()
    // screen.debug(container)

  })
  test('calling Element switcher', () => {
    useAppSelector.mockImplementation(() => ({ loaded: true }))
    renderWithProviders(<LandingView />)
    expect(screen.getByTestId('element-switcher')).toBeInTheDocument()
    // screen.debug()
  })
})