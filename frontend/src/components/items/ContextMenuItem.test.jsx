import React from 'react'
import { ContextMenuItem } from './ContextMenuItem'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
describe('ContextMenuItem', () => {
  const testProps = {
    name: 'mockName',
    icon: { name: 'cocktail', color: 'red' },
    content: 'mockContent',
    disabled: false,
    onClick: jest.fn()

  }
  describe('appeance', () => {
    test('snapshot', async () => {
      await waitFor(() => {
        render(<ContextMenuItem {...testProps} />)
      })
      expect(document.body).toMatchSnapshot()
      // screen.debug(document.body)
    })
  })
  describe('actions', () => {
    test('click', async () => {
      render(<ContextMenuItem {...testProps} />)
      const item = screen.getByText('mockContent')
      await waitFor(() => { userEvent.click(item) })
      expect(testProps.onClick).toHaveBeenCalledTimes(1)
      // screen.debug(item)
    })
  })
})
