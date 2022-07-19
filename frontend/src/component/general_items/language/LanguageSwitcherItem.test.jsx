import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LanguageSwitcherItem from './LanguageSwitcherItem'
describe('LanguageSwitcherItem', () => {
  test('snap shot', () => {
    const testProps = {
      value: 'ru', flag: 'ru',
      onItemClickHandler: jest.fn()
    }
    const { container } = render(<LanguageSwitcherItem {...testProps} />)
    expect(container).toMatchSnapshot()
  })
  test('onClick handler', async () => {
    const user = userEvent.setup()
    const mockOnItemClickHandler = jest.fn()
    const mockValue='mock value'
    const testProps = {
      value: mockValue, flag: 'ru',
      onItemClickHandler: mockOnItemClickHandler
    }
    render(<LanguageSwitcherItem {...testProps} />)

    const element = screen.getByRole('menuitem')
    await user.click(element)

    expect(mockOnItemClickHandler).toHaveBeenCalledTimes(1)
    expect(mockOnItemClickHandler).toHaveBeenCalledWith(mockValue);
  })
})