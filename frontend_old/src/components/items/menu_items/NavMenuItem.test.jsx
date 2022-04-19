import React from 'react'
import { screen } from '@testing-library/react'

import NavMenuItem from './NavMenuItem'
import { testLinkedRender } from '../../../tstHelpers'
import userEvent from '@testing-library/user-event'
describe('NavMenuItem', () => {
  const testProps = {
    disabled: false,
    name: 'mockName',
    to: 'mockUrl',
    active: true,
    content: 'mockContent',
    onClick: jest.fn()
  }
  describe('appearance', () => {
    test('normal rendering (snapshot)', () => {
      const activeProps = { ...testProps }
      testLinkedRender(<NavMenuItem {...activeProps} />)
      const menuItem = screen.getByTestId('MenuItem')
      expect(menuItem).toMatchSnapshot()
      expect(menuItem).toHaveClass('active')
      expect(menuItem).toHaveAttribute('href', `/${activeProps.to}`)
      expect(menuItem).toHaveTextContent(activeProps.content)
      // screen.debug(menuItem)
    })
    test('rendering, disabled, not active (snapshot)', () => {
      const activeProps = { ...testProps, active: false, disabled: true }
      testLinkedRender(<NavMenuItem {...activeProps} />)
      const menuItem = screen.getByTestId('MenuItem')
      expect(menuItem).not.toHaveClass('active')
      expect(menuItem).not.toHaveAttribute('href')
      expect(menuItem).toHaveAttribute('to', activeProps.to)
      // screen.debug(menuItem)
    })
  })
  describe('actions', () => {
    test.skip('click', () => {
      /**
       * Unable to find the "window" object for the given node.
       * Producer offer to report to there project.
       */
      const activeProps = { ...testProps }
      testLinkedRender(<NavMenuItem {...activeProps} />)
      const menuItem = screen.getByTestId('MenuItem')
      userEvent.click('menuItem')
      // expect(activeProps.onClick).toHaveBeenCalledTimes(1)
      // expect(menuItem).toHaveClass('active')
      // expect(menuItem).toHaveAttribute('href', `/${activeProps.to}`)
      // expect(menuItem).toHaveTextContent(activeProps.content)
      screen.debug(menuItem)
    })
  })
})
