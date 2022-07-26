import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginOutlined } from '@mui/icons-material'

import LogInOutButton from './LogInOutButton'

describe('LogInOutButton testing', () => {
  const testProps = {
    title: 'mockTitle',
    Icon: LoginOutlined,
    onClick: jest.fn()
  }
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('screenshot', () => {
    const { baseElement } = render(<LogInOutButton {...testProps} />)
    expect(baseElement).toMatchSnapshot()
    // screen.debug()
  })
  test('actions', async () => {
    const user= userEvent.setup()
    render(<LogInOutButton {...testProps} />)
    const component = screen.getByRole('menuitem')
    expect(component).toHaveTextContent(testProps.title)
    await user.click(component)
    expect(testProps.onClick).toHaveBeenCalledTimes(1);
    // screen.debug(component)
  });
})
