import React from 'react'
// import { useAppNavigate } from '../../hooks/reactRouterDom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useAppDispatch } from '../../hooks/reactRedux'
import { renderWithRouterAndProviders, setupStore } from '../../utils/testUtils'
import { initialState as initAuthState} from '../../redux/slices/auth'
import { setEditable, logOut } from '../../redux/slices'
import DrawerNavBar from './DrawerNavBar'
// import { setAxiosAuthAccessToken, setAxiosAuthRefreshToken } from '../../api/apiClient'

jest.mock('../../hooks/reactRedux', () => ({
  __esModule: true,
  ...jest.requireActual('../../hooks/reactRedux'),
  useAppDispatch: jest.fn()
}))
// jest.mock('../../api/apiClient', () => ({
//   __esModule: true,
//   ...jest.requireActual('../../api/apiClient'),
//   setAxiosAuthAccessToken: jest.fn(),
//   setAxiosAuthRefreshToken: jest.fn(),
// }))

describe('DrawerNavBar', () => {
  afterAll(() => {
    jest.unmock('../../hooks/reactRedux')
    // jest.unmock('../../api/apiClient')
  })
  beforeEach(() => {
    jest.resetAllMocks()
  })
  const testInitAuthState = { ...initAuthState() }
  describe('appearance', () => {
    test('snapshot, all possible elements', () => {
      const mockedInitAuthState = {
        auth: { ...testInitAuthState, isLoggedIn: true, isAdmin: true }
      }
      // const mockedStore = setupStore(mockedInitAuthState)

      const { container } = renderWithRouterAndProviders(
        <DrawerNavBar />, { preloadedState: mockedInitAuthState })
      expect(container).toMatchSnapshot()
      // screen.debug(container)
    })
    test('not logged', () => {
      const mockedInitAuthState = { auth: testInitAuthState }
      // const mockedStore = setupStore(mockedInitAuthState)

      renderWithRouterAndProviders(<DrawerNavBar />, { preloadedState: mockedInitAuthState })

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
      // screen.debug()
    })
    test('user logged', () => {
      const mockedInitAuthState = { auth: { ...testInitAuthState, isLoggedIn: true } }
      // const mockedStore = setupStore(mockedInitAuthState)

      renderWithRouterAndProviders(<DrawerNavBar />, { preloadedState: mockedInitAuthState })

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
      // screen.debug()
    })
    test('admin logged', () => {
      const mockedInitAuthState = { auth: { ...testInitAuthState, isLoggedIn: true, isAdmin: true } }
      // const mockedStore = setupStore(mockedInitAuthState)

      renderWithRouterAndProviders(<DrawerNavBar />, { preloadedState: mockedInitAuthState })

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
      expect(menuItemAdminView).toBeInTheDocument()
      expect(menuItemAdminView).not.toHaveClass('Mui-disabled')

      const menuItemLogIn = screen.getByRole('menuitem', { name: 'LogOut' })
      expect(menuItemLogIn).toBeInTheDocument()
      expect(menuItemLogIn).not.toHaveClass('Mui-disabled')
      // screen.debug()
    })
  })
  describe('actions', () => {
    test('buttom LandingView', async () => {
      const user = userEvent.setup()
      const mockedCloseDrawer = jest.fn()
      const mockedInitAuthState = { auth: { ...testInitAuthState, isLoggedIn: true, isAdmin: true } }
      const mockedStore = setupStore(mockedInitAuthState)

      renderWithRouterAndProviders(<DrawerNavBar closeDrawer={mockedCloseDrawer} />, {
        preloadedState: mockedInitAuthState, mockedStore
      })
      const menuItem = screen.getByRole('menuitem', { name: 'LandingView' })
      expect(menuItem.href).toMatch(/\/$/)
      await user.click(menuItem)
      expect(mockedCloseDrawer).toHaveBeenCalledTimes(1)
      // screen.debug(menuItem)

    })
    test('buttom PriceListView', async () => {
      const user = userEvent.setup()
      const mockedCloseDrawer = jest.fn()
      const mockedInitAuthState = { auth: { ...testInitAuthState, isLoggedIn: true, isAdmin: true } }
      const mockedStore = setupStore(mockedInitAuthState)

      renderWithRouterAndProviders(<DrawerNavBar closeDrawer={mockedCloseDrawer} />, {
        preloadedState: mockedInitAuthState, mockedStore
      })
      const menuItem = screen.getByRole('menuitem', { name: 'PriceListView' })
      expect(menuItem.href).toMatch(/\/pricelist$/)
      await user.click(menuItem)
      expect(mockedCloseDrawer).toHaveBeenCalledTimes(1)
    })
    test('buttom PicturesView', async () => {
      const user = userEvent.setup()
      const mockedCloseDrawer = jest.fn()
      const mockedInitAuthState = { auth: { ...testInitAuthState, isLoggedIn: true, isAdmin: true } }
      const mockedStore = setupStore(mockedInitAuthState)

      renderWithRouterAndProviders(<DrawerNavBar closeDrawer={mockedCloseDrawer} />, {
        preloadedState: mockedInitAuthState, mockedStore
      })
      const menuItem = screen.getByRole('menuitem', { name: 'PicturesView' })
      expect(menuItem.href).toMatch(/\/pictures$/)
      await user.click(menuItem)
      expect(mockedCloseDrawer).toHaveBeenCalledTimes(1)
    })
    test('buttom UsersOnlyView', async () => {
      const user = userEvent.setup()
      const mockedCloseDrawer = jest.fn()
      const mockedInitAuthState = { auth: { ...testInitAuthState, isLoggedIn: true, isAdmin: true } }
      const mockedStore = setupStore(mockedInitAuthState)

      renderWithRouterAndProviders(<DrawerNavBar closeDrawer={mockedCloseDrawer} />, {
        preloadedState: mockedInitAuthState, mockedStore
      })
      const menuItem = screen.getByRole('menuitem', { name: 'UsersOnlyView' })
      expect(menuItem.href).toMatch(/\/private$/)
      await user.click(menuItem)
      expect(mockedCloseDrawer).toHaveBeenCalledTimes(1)
    })
    test('buttom AdminView', async () => {
      const user = userEvent.setup()
      const mockedCloseDrawer = jest.fn()
      const mockedInitAuthState = { auth: { ...testInitAuthState, isLoggedIn: true, isAdmin: true } }
      const mockedStore = setupStore(mockedInitAuthState)

      renderWithRouterAndProviders(<DrawerNavBar closeDrawer={mockedCloseDrawer} />, {
        preloadedState: mockedInitAuthState, mockedStore
      })
      const menuItem = screen.getByRole('menuitem', { name: 'AdminView' })
      expect(menuItem.href).toMatch(/\/admin$/)
      await user.click(menuItem)
      expect(mockedCloseDrawer).toHaveBeenCalledTimes(1)
    })
    test('buttom LogOut', async () => {
      // setAxiosAuthAccessToken.mockImplementation(jest.fn())
      // setAxiosAuthRefreshToken.mockImplementation(jest.fn())
      const mockedDispatch = jest.fn()
      useAppDispatch.mockImplementation(() => mockedDispatch)
      const user = userEvent.setup()
      const mockedCloseDrawer = jest.fn()
      const mockedInitAuthState = { auth: { ...testInitAuthState, isLoggedIn: true, isAdmin: true } }
      const mockedStore = setupStore(mockedInitAuthState)

      renderWithRouterAndProviders(<DrawerNavBar closeDrawer={mockedCloseDrawer} />, {
        preloadedState: mockedInitAuthState, mockedStore
      })
      const menuItem = screen.getByRole('menuitem', { name: 'LogOut' })
      // expect(screen.getByText('LogOut').href).toMatch(/\/admin$/)
      await user.click(menuItem)
      expect(mockedCloseDrawer).toHaveBeenCalledTimes(1)
      // console.log('mockedDispatch calls =>', mockedDispatch.mock.calls.length)
      expect(mockedDispatch).toHaveBeenCalledTimes(2);
      expect(mockedDispatch.mock.calls[0][0]).toEqual({type: setEditable.type, payload: false});
      expect(mockedDispatch.mock.calls[1][0]).toEqual({type: logOut.type, payload: undefined});
    })
  })
})