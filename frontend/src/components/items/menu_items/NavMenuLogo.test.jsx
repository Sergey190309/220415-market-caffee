import React from 'react'
import { screen } from '@testing-library/react'
import NavMenuLogo from './NavMenuLogo'
import { testLinkedRender } from '../../../tstHelpers'
import userEvent from '@testing-library/user-event'

jest.mock('../../../assets/images/logo.png')

describe('NavMenuLogo', () => {
  const testProps = {
    disabled: false,
    name: '',
    to: '',
    active: true,
    onClick: jest.fn()
  }
  describe('appearance', () => {
    test('normal rendering (snapshot)', () => {
      const activeProps = { ...testProps }
      testLinkedRender(<NavMenuLogo {...activeProps} />)
      const navMenuLogo = screen.getByTestId('NavMenuLogo')
      expect(navMenuLogo).toMatchSnapshot()
      expect(navMenuLogo).toHaveClass('active')
      expect(navMenuLogo).not.toHaveAttribute('to')
      expect(navMenuLogo).toHaveAttribute('href')
      // screen.debug(navMenuLogo)
    })
    test('rendering, disabled, unactive', () => {
      const activeProps = {
        ...testProps,
        disabled: true,
        active: false
      }
      testLinkedRender(<NavMenuLogo {...activeProps} />)
      const navMenuLogo = screen.getByTestId('NavMenuLogo')
      expect(navMenuLogo).toHaveClass('disabled')
      expect(navMenuLogo).toHaveAttribute('to')
      expect(navMenuLogo).not.toHaveAttribute('href')
      // expect(navMenuLogo).toMatchSnapshot()
      // screen.debug(navMenuLogo)
    })
  })
  describe('action', () => {
    test('normal click', () => {
      const activeProps = { ...testProps }
      testLinkedRender(<NavMenuLogo {...activeProps} />)
      const navMenuLogo = screen.getByTestId('NavMenuLogo')
      userEvent.click(navMenuLogo)
      expect(activeProps.onClick).toHaveBeenCalledTimes(1)
      // console.log('NavMenuLogo.test:\n normal click',
      //   '\n  call ->', activeProps.onClick.mock.calls)
    })
    test('disabled click', () => {
      const activeProps = { ...testProps, disabled: true }
      testLinkedRender(<NavMenuLogo {...activeProps} />)
      const navMenuLogo = screen.getByTestId('NavMenuLogo')
      userEvent.click(navMenuLogo)
      expect(activeProps.onClick).toHaveBeenCalledTimes(0)
      // console.log('NavMenuLogo.test:\n normal click',
      //   '\n  call ->', activeProps.onClick.mock.calls)
    })
  })
})
