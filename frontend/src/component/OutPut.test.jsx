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
      // const user = userEvent.setup()
      renderWithRouterAndProviders(<OutPut />)
      let rootBox
      await waitFor(() => {
        rootBox = screen.getByTestId('output-root-box')
        // expect(drawerMenu).toBeVisible()
      })
      // user.click(openDrawerButton)
      // screen.debug(rootBox)
      expect(rootBox).toMatchSnapshot()

      // await waitFor(() => screen.debug())
    })
  })
  describe('actions', () => {
    test('open / close drawer', async () => {
      const user = userEvent.setup()
      renderWithRouterAndProviders(<OutPut />)

      await waitFor(async () => {

        const drawerMenu = screen.getByTestId('drawer-menu')
        expect(drawerMenu).toBeInTheDocument()
        await waitFor(() => {
          expect(drawerMenu).not.toBeVisible()
        })

        const openDrawerButton = screen.getByTestId('open-drawer-icon')
        await user.click(openDrawerButton)
        await waitFor(() => {
          expect(drawerMenu).toBeVisible()
        })

        const drawerCloseButton = screen.getByTestId('drawer-close-button')
        await user.click(drawerCloseButton)
        await waitFor(() => {
          expect(drawerMenu).not.toBeVisible()
        })

        await user.click(openDrawerButton)
        await waitFor(() => {
          expect(drawerMenu).toBeVisible()
        })

        const pageContainer = screen.getByTestId('page-container-root-box')
        await user.click(pageContainer)
        await waitFor(() => {
          expect(drawerMenu).not.toBeVisible()
        })
      })
    })
    test('toLanding', async () => {
      const mockedNavigate = jest.fn()
      useAppNavigate.mockImplementation(() => mockedNavigate)
      const user = userEvent.setup()
      renderWithRouterAndProviders(<OutPut />)
      await waitFor(async () => {
        const toLandingIcon = screen.getByTestId('to-landing-icon')
        await user.click(toLandingIcon)
        // expect(mockedNavigate).toHaveBeenCalledTimes(2)
        // screen.debug(toLandingIcon)
      })
      // console.log(mockedNavigate.mock.calls)
      expect(mockedNavigate).toHaveBeenCalledTimes(1);
      expect(mockedNavigate).toHaveBeenCalledWith('/');
      // expect(mockedNavigate.mock.calls).toHaveLength(3)
    })
  })
})