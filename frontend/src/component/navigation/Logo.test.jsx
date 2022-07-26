import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Logo from './Logo'

describe('Logo testing', () => {
  const testProps = {
    toLanding: jest.fn()
  }
  test('apperance', () => {
    const { baseElement } = render(<Logo {...testProps} />)
    expect(baseElement).toMatchSnapshot()
  })
  test('action', async () => {
    const user = userEvent.setup()
    render(<Logo {...testProps} />)
    const component = screen.getByRole('button')
    await user.click(component)
    expect(testProps.toLanding).toHaveBeenCalledTimes(1)
    // screen.debug(component)
  })
})
