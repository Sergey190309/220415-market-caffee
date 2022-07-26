import React from 'react'
import { useAppDispatch } from '../../hooks/reactRedux'
// import { MenuOutlined } from '@mui/icons-material'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders, setupStore } from '../../utils/testUtils'

import NavBarToggle from './NavBarToggle'
import {
  initialState as initialDeviceState,
  setNavBarVisibility
} from '../../redux/slices/device'

jest.mock('../../hooks/reactRedux', () => ({
  __esModule: true,
  ...jest.requireActual('../../hooks/reactRedux'),
  useAppDispatch: jest.fn()
}))
describe('NavBarToggle testing', () => {
  const testDeviceState = { ...initialDeviceState }
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('../../hooks/reactRedux')
  })
  describe('appearance', () => {
    test('snapshot', () => {
      const { baseElement } = renderWithProviders(<NavBarToggle />)
      expect(baseElement).toMatchSnapshot()
      // screen.debug()
    })
    test('action', async () => {
      const mockedDispatch = jest.fn()
      useAppDispatch.mockImplementation(() => mockedDispatch)
      const user = userEvent.setup()
      const testStore = setupStore({ device: { ...testDeviceState } })

      renderWithProviders(<NavBarToggle />, {
        preloadedState: { device: testDeviceState }, testStore
      })
      const component = screen.getByRole('button')
      await user.click(component)
      expect(mockedDispatch).toHaveBeenCalledTimes(1)
      expect(mockedDispatch).toHaveBeenCalledWith({ type: setNavBarVisibility.type, payload: true })
    })
  })
})
