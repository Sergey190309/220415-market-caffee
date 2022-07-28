import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FoodBankOutlined } from '@mui/icons-material'
import { renderWithRouter } from '../../utils/testUtils'

import NavBarItem from './NavBarItem'

describe('NavBarItem testing', () => {
  const testProps = {
    title: 'mockTitle',
    linkto: '/mockLink',
    // eslint-disable-next-line testing-library/no-node-access
    Icon: FoodBankOutlined,
    disabled: true,
    onClick: jest.fn()
  }
  beforeEach(() => {
    jest.resetAllMocks()
  })
  // afterEach(() => {
  //   // restore the spy created with spyOn
  //   jest.restoreAllMocks()
  // })

  describe('appearance', () => {
    test('screenshot', () => {
      // render(<FoodBankOutlined id='mocked-icon' />)
      const { baseElement } = renderWithRouter(<NavBarItem {...testProps} />)
      expect(baseElement).toMatchSnapshot()
      // screen.debug()
    })
  })
  describe('actions', () => {
    test('item enabled', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NavBarItem {...testProps} disabled={false} />)
      const component = screen.getByRole('menuitem')
      expect(component).not.toHaveClass('Mui-disabled')
      expect(component.href).toMatch(testProps.linkto)
      await user.click(component)
      expect(testProps.onClick).toHaveBeenCalledTimes(1)
      // screen.debug(component)
    })
    test('item disabled', async () => {
      renderWithRouter(<NavBarItem {...testProps} />)
      const component = screen.getByRole('menuitem')
      expect(component).toHaveClass('Mui-disabled')
      // screen.debug(component)
    })
  })
})