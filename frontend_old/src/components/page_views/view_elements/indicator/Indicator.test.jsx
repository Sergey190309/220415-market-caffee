import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Indicator from './Indicator'
import userEvent, { specialChars } from '@testing-library/user-event'
import { LandingProvider } from '../../../../context'

describe('Indicator', () => {
  const testProps = {
    isOpened: false,
    context: {},
    content: 'mockContent',
    setIndicatorOpened: jest.fn()
  }
  const mockContext = {
    componentName: { componentName: 'landing' }
  }
  const contextRender = (actualProps, context = mockContext) => {
    render(
      <LandingProvider value={context.componentName} >
        <Indicator {...actualProps} />
      </LandingProvider>
    )
  }
  describe('Appeance', () => {
    test('indicator exists (snapshot)', async () => {
      const actualProps = { ...testProps, isOpened: true }
      await waitFor(() => {
        contextRender(actualProps)
      })
      const popup = screen.getByTestId('Popup')
      expect(popup.children).toHaveLength(2)
      expect(popup.children[0])
        .toHaveTextContent(mockContext.componentName.componentName)
      expect(popup.children[1])
        .toHaveTextContent(testProps.content)
      expect(popup).toMatchSnapshot()
      // screen.debug(popup)
    })
    test('inidcator does not exitst', async () => {
      const actualProps = { ...testProps }
      await waitFor(() => {
        contextRender(actualProps)
      })
      // const popup = screen.getByTestId('Popup')
      expect(screen.queryByTestId('Popup'))
        .not.toBeInTheDocument()
    })
  })
  describe.skip('Actions', () => {
    /**
     * I'm unable to simulate esc and click out of element.
     */
    test('escape', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        contextRender(actualProps)
      })
      // const popup = screen.getByTestId('Popup')
      expect(screen.getByTestId('Popup'))
        .toBeInTheDocument()
      userEvent.keyboard(specialChars.escape)
      // await waitFor(() => {
      // })
      console.log('Indicator.test:\n escape',
        '\n  specialChars.escape ->', specialChars.escape)
      screen.debug(screen.getByTestId('Popup'))
      // expect(screen.queryByTestId('Popup'))
      //   .not.toBeInTheDocument()
    })
    test('click outside', async () => {
      const actualProps = { ...testProps, isOpened: true }
      await waitFor(() => {
        contextRender(actualProps)
      })
      // const popup = screen.getByTestId('Popup')
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      userEvent.click(document.body)
      // expect(screen.queryByTestId('Popup')).toBe(null)
      screen.debug(document.body)
    })
  })
})
