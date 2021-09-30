import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Indicator from './Indicator'
import userEvent, { specialChars } from '@testing-library/user-event'

describe('Indicator', () => {
  const testProps = {
    isOpened: false,
    context: {},
    header: 'mockHeader',
    content: 'mockContent'

  }
  describe('Appeance', () => {
    test('indicator exists (snapshot)', async () => {
      const activeProps = { ...testProps, isOpened: true }
      await waitFor(() => {
        render(<Indicator {...activeProps} />)
      })
      const popup = screen.getByTestId('Popup')
      expect(popup).toMatchSnapshot()
      // screen.debug()
    })
    test('inidcator does not exitst', async () => {
      const activeProps = { ...testProps }
      await waitFor(() => {
        render(<Indicator {...activeProps} />)
      })
      // const popup = screen.getByTestId('Popup')
      // expect(screen.queryByTestId('Popup')).toBe(null)
    })
  })
  describe('Actions', () => {
    test('escape', async () => {
      const activeProps = { ...testProps, isOpened: true }
      await waitFor(() => {
        render(<Indicator {...activeProps} />)
      })
      // const popup = screen.getByTestId('Popup')
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      await waitFor(() => { (userEvent.keyboard(specialChars.escape)) })
      // expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
    test('click outside', async () => {
      const activeProps = { ...testProps, isOpened: true }
      await waitFor(() => {
        render(<Indicator {...activeProps} />)
      })
      // const popup = screen.getByTestId('Popup')
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      await waitFor(() => { (userEvent.click(document.body)) })
      // expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
  })
})
