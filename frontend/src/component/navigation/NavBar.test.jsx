import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import { Button } from '@mui/material'


import { setupStore, renderWithRouterAndProviders } from '../../utils/testUtils'
import NavBar from './NavBar'
// import { setNavBarVisibility } from '../../redux/slices'
import { initialState as initAuthState } from '../../redux/slices/auth'
import { initialState as initLngState } from '../../redux/slices/lng'
import * as device from '../../redux/slices/device'
import { setAxiosAuthAccessToken, setAxiosAuthRefreshToken } from '../../api/apiClient'
// import * as auth from '../../redux/slices/auth'
// import { logOut } from '../../redux/slices/auth'
import { initialState as initDeviceState } from '../../redux/slices/device'
import { Button } from '@mui/material'


jest.mock('../../api/apiClient', () => ({
  __esModule: true,
  ...jest.requireActual('../../api/apiClient'),
  setAxiosAuthAccessToken: jest.fn(),
  setAxiosAuthRefreshToken: jest.fn(),
}))
// jest.mock('../../redux/slices/auth', () => ({
//   ...jest.requireActual('../../redux/slices/auth'),
//   logOut: jest.fn()
// }))
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: jest.fn((key) => key),
    i18n: {
      language: 'mockLng',
      changeLanguage: jest.fn()
    }
  })
}))

describe('NavBar testing', () => {
  describe('non react testing', () => {
    test('dummy', () => {
    })
  })
  describe('react components testing', () => {
    const mockAuthState = { ...initAuthState }
    const mockLngState = { ...initLngState }
    const mockDeviceState = { ...initDeviceState }

    beforeEach(() => {
      jest.resetAllMocks()
    })
    afterEach(() => {
      // restore the spy created with spyOn
      jest.restoreAllMocks()
    })
    afterAll(() => {
      jest.unmock('../../api/apiClient')
      jest.unmock('react-i18next')
    })

    describe('appearance', () => {
      test('not be available without isNavBarOpened: true', () => {
        const testState = {
          auth: mockAuthState, lng: mockLngState, device: mockDeviceState
          // {
          //   ...mockDeviceState, isNavBarOpened: true
          // }
        }
        // const mockedAnchorEl =
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)

        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )
        const navBar = screen.queryByRole('presentation')
        expect(navBar).toBeNull()
      })
      test('snapshot', () => {
        const testState = {
          auth: mockAuthState, lng: mockLngState, device: {
            ...mockDeviceState, isNavBarOpened: true
          }
        }
        // const mockedAnchorEl =
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)

        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )
        const navBar = screen.getByRole('presentation')
        expect(navBar).toMatchSnapshot()
        // screen.debug(navBar)
      })
      test('elements qnt and status not logged', () => {
        const testState = {
          auth: mockAuthState, lng: mockLngState, device: {
            ...mockDeviceState, isNavBarOpened: true
          }
        }
        // const mockedAnchorEl =
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)
        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )
        // const menu = screen.getByTestId('menu-list')
        // console.log('menu.length ->', menu.children.length)

        const menuItemLandingView = screen.getByRole('menuitem', { name: 'LandingView' })
        expect(menuItemLandingView).toBeInTheDocument()
        expect(menuItemLandingView).not.toHaveClass('Mui-disabled')


        const menuItemPriceListView = screen.getByRole('menuitem', { name: 'PriceListView' })
        expect(menuItemPriceListView).toBeInTheDocument()
        expect(menuItemPriceListView).not.toHaveClass('Mui-disabled')

        const menuItemPicturesView = screen.getByRole('menuitem', { name: 'PicturesView' })
        expect(menuItemPicturesView).toBeInTheDocument()
        expect(menuItemPicturesView).not.toHaveClass('Mui-disabled')

        const menuItemUsersOnlyView = screen.getByRole('menuitem', { name: 'UsersOnlyView' })
        expect(menuItemUsersOnlyView).toBeInTheDocument()
        expect(menuItemUsersOnlyView).toHaveClass('Mui-disabled')

        const menuItemAdminView = screen.queryByRole('menuitem', { name: 'AdminView' })
        expect(menuItemAdminView).toBeNull()

        const menuItemLogIn = screen.getByRole('menuitem', { name: 'LogIn' })
        expect(menuItemLogIn).toBeInTheDocument()
        expect(menuItemLogIn).not.toHaveClass('Mui-disabled')
      })
      test('elements qnt and status admin logged', () => {
        const testState = {
          auth: { ...mockAuthState, isAdmin: true, isLoggedIn: true },
          lng: mockLngState,
          device: { ...mockDeviceState, isNavBarOpened: true }
        }
        // const mockedAnchorEl =
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)
        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )
        const menuItemLandingView = screen.getByRole('menuitem', { name: 'LandingView' })
        expect(menuItemLandingView).toBeInTheDocument()
        expect(menuItemLandingView).not.toHaveClass('Mui-disabled')


        const menuItemPriceListView = screen.getByRole('menuitem', { name: 'PriceListView' })
        expect(menuItemPriceListView).toBeInTheDocument()
        expect(menuItemPriceListView).not.toHaveClass('Mui-disabled')

        const menuItemPicturesView = screen.getByRole('menuitem', { name: 'PicturesView' })
        expect(menuItemPicturesView).toBeInTheDocument()
        expect(menuItemPicturesView).not.toHaveClass('Mui-disabled')

        const menuItemUsersOnlyView = screen.getByRole('menuitem', { name: 'UsersOnlyView' })
        expect(menuItemUsersOnlyView).toBeInTheDocument()
        expect(menuItemUsersOnlyView).not.toHaveClass('Mui-disabled')

        const menuItemAdminView = screen.getByRole('menuitem', { name: 'AdminView' })
        expect(menuItemAdminView).toBeInTheDocument()
        expect(menuItemAdminView).not.toHaveClass('Mui-disabled')

        const menuItemLogIn = screen.getByRole('menuitem', { name: 'LogOut' })
        expect(menuItemLogIn).toBeInTheDocument()
        expect(menuItemLogIn).not.toHaveClass('Mui-disabled')
      })
      test('elements qnt and status user logged', () => {
        const testState = {
          auth: { ...mockAuthState, isLoggedIn: true },
          lng: mockLngState,
          device: { ...mockDeviceState, isNavBarOpened: true }
        }
        // const mockedAnchorEl =
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)
        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )

        const menuItemLandingView = screen.getByRole('menuitem', { name: 'LandingView' })
        expect(menuItemLandingView).toBeInTheDocument()
        expect(menuItemLandingView).not.toHaveClass('Mui-disabled')


        const menuItemPriceListView = screen.getByRole('menuitem', { name: 'PriceListView' })
        expect(menuItemPriceListView).toBeInTheDocument()
        expect(menuItemPriceListView).not.toHaveClass('Mui-disabled')

        const menuItemPicturesView = screen.getByRole('menuitem', { name: 'PicturesView' })
        expect(menuItemPicturesView).toBeInTheDocument()
        expect(menuItemPicturesView).not.toHaveClass('Mui-disabled')

        const menuItemUsersOnlyView = screen.getByRole('menuitem', { name: 'UsersOnlyView' })
        expect(menuItemUsersOnlyView).toBeInTheDocument()
        expect(menuItemUsersOnlyView).not.toHaveClass('Mui-disabled')

        const menuItemAdminView = screen.queryByRole('menuitem', { name: 'AdminView' })
        expect(menuItemAdminView).toBeNull()

        const menuItemLogIn = screen.getByRole('menuitem', { name: 'LogOut' })
        expect(menuItemLogIn).toBeInTheDocument()
        expect(menuItemLogIn).not.toHaveClass('Mui-disabled')
      })
    })
    describe('actions', () => {
      test('button clicked actions admin loggedin, LandingView', async () => {
        const spy = jest.spyOn(device, 'setNavBarVisibility')
        const user = userEvent.setup()
        const testState = {
          auth: { ...mockAuthState, isAdmin: true, isLoggedIn: true },
          lng: mockLngState,
          device: { ...mockDeviceState, isNavBarOpened: true }
        }
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)
        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )
        const menu = screen.getByTestId('menu-list')
        expect(menu).toBeInTheDocument()
        const menuItem = screen.getByRole('menuitem', { name: 'LandingView' })
        // console.log('screen.getByText.href', screen.getByText('LandingView').href)
        expect(screen.getByText('LandingView').href).toMatch(/\/$/)
        // screen.debug(screen.getByText('LandingView').href)
        await user.click(menuItem)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(false)
        // const menuAfter = screen.queryByTestId('menu-list')
        expect(menu).not.toBeVisible()
      })
      test('button clicked actions admin loggedin, PriceListView', async () => {
        const spy = jest.spyOn(device, 'setNavBarVisibility')
        const user = userEvent.setup()
        const testState = {
          auth: { ...mockAuthState, isAdmin: true, isLoggedIn: true },
          lng: mockLngState,
          device: { ...mockDeviceState, isNavBarOpened: true }
        }
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)
        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )
        const menu = screen.getByTestId('menu-list')
        expect(menu).toBeInTheDocument()
        const menuItem = screen.getByRole('menuitem', { name: 'PriceListView' })
        // console.log('screen.getByText.href', screen.getByText('PriceListView').href)
        expect(screen.getByText('PriceListView').href).toMatch(/\/pricelist$/)
        await user.click(menuItem)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(false)
        expect(menu).not.toBeVisible()
        // screen.debug(menuItem)
      })
      test('button clicked actions admin loggedin, PicturesView', async () => {
        const spy = jest.spyOn(device, 'setNavBarVisibility')
        const user = userEvent.setup()
        const testState = {
          auth: { ...mockAuthState, isAdmin: true, isLoggedIn: true },
          lng: mockLngState,
          device: { ...mockDeviceState, isNavBarOpened: true }
        }
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)
        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )
        const menu = screen.getByTestId('menu-list')
        expect(menu).toBeInTheDocument()
        const menuItem = screen.getByRole('menuitem', { name: 'PicturesView' })
        // console.log('screen.getByText.href', screen.getByText('PicturesView').href)
        expect(screen.getByText('PicturesView').href).toMatch(/\/pictures$/)
        await user.click(menuItem)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(false)
        expect(menu).not.toBeVisible()
        // screen.debug(menuItem)
      })
      test('button clicked actions admin loggedin, UsersOnlyView', async () => {
        const spy = jest.spyOn(device, 'setNavBarVisibility')
        const user = userEvent.setup()
        const testState = {
          auth: { ...mockAuthState, isAdmin: true, isLoggedIn: true },
          lng: mockLngState,
          device: { ...mockDeviceState, isNavBarOpened: true }
        }
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)
        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )
        const menu = screen.getByTestId('menu-list')
        expect(menu).toBeInTheDocument()
        const menuItem = screen.getByRole('menuitem', { name: 'UsersOnlyView' })
        // console.log('screen.getByText.href', screen.getByText('UsersOnlyView').href)
        expect(screen.getByText('UsersOnlyView').href).toMatch(/\/private$/)
        await user.click(menuItem)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(false)
        expect(menu).not.toBeVisible()
        // screen.debug(menuItem)
      })
      test('button clicked actions admin loggedin, AdminView', async () => {
        const spy = jest.spyOn(device, 'setNavBarVisibility')
        const user = userEvent.setup()
        const testState = {
          auth: { ...mockAuthState, isAdmin: true, isLoggedIn: true },
          lng: mockLngState,
          device: { ...mockDeviceState, isNavBarOpened: true }
        }
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)
        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )
        const menu = screen.getByTestId('menu-list')
        expect(menu).toBeInTheDocument()
        const menuItem = screen.getByRole('menuitem', { name: 'AdminView' })
        // console.log('screen.getByText.href', screen.getByText('AdminView').href)
        expect(screen.getByText('AdminView').href).toMatch(/\/admin$/)
        await user.click(menuItem)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(false)
        expect(menu).not.toBeVisible()
        // screen.debug(menuItem)
      })
      test('button clicked actions admin loggedin, LogOut', async () => {
        // setAxiosAuthAccessToken=jest.fn()
        const spySetNavBarVisibility = jest.spyOn(device, 'setNavBarVisibility')
        // const spyLogOut = jest.spyOn(auth, 'logOut')
        const user = userEvent.setup()
        const testState = {
          auth: { ...mockAuthState, isAdmin: true, isLoggedIn: true },
          lng: mockLngState,
          device: { ...mockDeviceState, isNavBarOpened: true }
        }
        const testStore = setupStore(testState)
        render(<Button id='MockedButton' />)
        renderWithRouterAndProviders(
          // eslint-disable-next-line testing-library/no-node-access
          <NavBar anchorEl={document.getElementById('MockedButton')} />,
          { preloadedState: { ...testState }, testStore }
        )
        const menu = screen.getByTestId('menu-list')
        expect(menu).toBeInTheDocument()
        const menuItem = screen.getByRole('menuitem', { name: 'LogOut' })
        // console.log('screen.getByText.href', screen.getByText('LogOut').href)
        expect(screen.getByText('LogOut').href).toBeUndefined()
        await user.click(menuItem)
        expect(spySetNavBarVisibility).toHaveBeenCalledTimes(1)
        expect(spySetNavBarVisibility).toHaveBeenCalledWith(false)
        expect(setAxiosAuthAccessToken).toHaveBeenCalledTimes(1);
        expect(setAxiosAuthAccessToken).toHaveBeenCalledWith('');
        expect(setAxiosAuthRefreshToken).toHaveBeenCalledTimes(1);
        expect(setAxiosAuthRefreshToken).toHaveBeenCalledWith('');
        expect(menu).not.toBeVisible()
        // screen.debug(menuItem)
      })
    })
  })
})
