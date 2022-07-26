import React from 'react'
// import { MenuOutlined } from '@mui/icons-material'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '../../utils/testUtils'

import NavBarToggle from './NavBarToggle'
import { setNavBarVisibility } from '../../redux/slices/device'

jest.mock('../../redux/slices/device', () => ({
  __esModule: true,
  setNavBarVisibility: jest.fn()
}))
describe('NavBarToggle testing', () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('../../redux/slices/device')
  })
  describe('appearance', () => {
    test('snapshot', () => {
      const { baseElement } = renderWithProviders(<NavBarToggle />)
      expect(baseElement).toMatchSnapshot()
      // screen.debug()
    })
    test('action', async () => {
      setNavBarVisibility.mockImplementation(jest.fn())
      const user = userEvent.setup()
      renderWithProviders(<NavBarToggle />)
      const component = screen.getByRole('button')
      await user.click(component)
      expect(setNavBarVisibility).toHaveBeenCalledTimes(1);
      expect(setNavBarVisibility).toHaveBeenCalledWith(true);

      screen.debug(component)

    })
  })
})
