import React from 'react'
import { useAppNavigate } from '../hooks/reactRouterDom'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouterAndProviders } from '../utils/testUtils'
import OutPut from './OutPut'

jest.mock('../hooks/reactRouterDom', () => ({
  ...jest.requireActual('../hooks/reactRouterDom'),
  useAppNavigate: jest.fn()
}))
describe('OutPut', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    // jest.unmock('../../../redux/slices/auth')
    jest.unmock('../hooks/reactRouterDom')
  })
  describe('appearance', () => {
    test('snapshot', async () => {
      const user = userEvent.setup()
      const { container } = renderWithRouterAndProviders(<OutPut />)
      const openDrawerButton = screen.getByTestId('open-drawer-icon')
      await user.click(openDrawerButton)
      // expect(drawerMenu).toBeVisible()
      expect(container).toMatchSnapshot()
      // screen.debug(drawerMenu)
    })
  })
  describe('actions', () => {
    test('open / close drawer', async () => {
      const user = userEvent.setup()
      renderWithRouterAndProviders(<OutPut />)

      const drawerMenu = screen.getByTestId('drawer-menu')
      expect(drawerMenu).not.toBeVisible()
      expect(drawerMenu).toBeInTheDocument()

      const openDrawerButton = screen.getByTestId('open-drawer-icon')
      await user.click(openDrawerButton)
      expect(drawerMenu).toBeVisible()

      const drawerCloseButton = screen.getByTestId('drawer-close-button')
      await user.click(drawerCloseButton)
      await waitFor(() => {
        expect(drawerMenu).not.toBeVisible()
      })

      await user.click(openDrawerButton)
      expect(drawerMenu).toBeVisible()

      const pageContainer = screen.getByTestId('page-container')
      await user.click(pageContainer)
      await waitFor(() => {
        expect(drawerMenu).not.toBeVisible()
      })
    })
    test('toLanding', async () => {
      const mockedNavigate = jest.fn()
      useAppNavigate.mockImplementation(() => mockedNavigate)
      const user = userEvent.setup()
      renderWithRouterAndProviders(<OutPut />)

      const toLandingIcon = screen.getByTestId('to-landing-icon')
      await user.click(toLandingIcon)
      expect(mockedNavigate).toHaveBeenCalledTimes(1)
      // screen.debug(toLandingIcon)
    })
  })
})