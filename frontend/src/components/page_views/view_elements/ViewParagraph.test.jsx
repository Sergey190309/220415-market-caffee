/* eslint-disable react/display-name */
import React from 'react'
// import { Provider } from 'react-redux'
import {
  // render,
  screen, waitFor
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { testRender, makeTestStore } from '../../../testHelpers'
import ViewParagraph from './ViewParagraph'
import store from '../../../redux/store'
// import { resolveDataContent } from '../../../testAxiosConstants'
// import { getViewContent } from '../../../api/calls/content'
import { LandingProvider } from '../../../context'
// import { initialState } from '../../../redux/slices/alerts'
import { setEditable } from '../../../redux/slices'

jest.mock('../../../api/calls/content')

const mockParagraphContextMenu = jest.fn()

jest.mock('./editors/ParagraphContextMenu', () => props => {
  mockParagraphContextMenu(props)
  return <div data-testid='mockParagraphContextMenu' />
})

const mockIndicator = jest.fn()

jest.mock('./indicator/Indicator', () => props => {
  mockIndicator(props)
  return <div data-testid='mockIndicator' />
})

describe('ViewParagraph testing', () => {
  const testProps = {
    initialState: {
      title: 'Mock title in test',
      content: ['Mock content in test, firs line', 'second line']
    },
    recordId: '01_vblock_txt_001'
  }
  const mockContext = {
    componentName: { componentName: 'landing' }
  }
  const renderReduxContext = (
    actualProps,
    testStore = makeTestStore(store),
    context = mockContext
  ) => {
    testRender(
      <LandingProvider value={context.componentName} >
        <ViewParagraph {...actualProps} />
      </LandingProvider>,
      { store: testStore }
    )
  }
  describe('appearance', () => {
    // beforeEach(() => {
    //   store.dispatch(setEditable(true))
    // })
    test('rendering normal (shapshot)', async () => {
      const actualProps = { ...testProps }
      await waitFor(() => {
        renderReduxContext(actualProps, store)
      })
      const message = screen.getByTestId('Message')
      expect(message).toMatchSnapshot()
      expect(message.children).toHaveLength(5)
      // screen.debug(message)
      // console.log('ViewParagraph.test:\n rendering normal',
      //   '\n  message ->', message.children.length)
    })
    test('rendering no title and devider', async () => {
      const actualProps =
      {
        ...testProps,
        initialState: {
          ...testProps.initialState, content: []
        }
      }
      await waitFor(() => {
        renderReduxContext(actualProps, store)
      })
      const message = screen.getByTestId('Message')
      expect(message.children).toHaveLength(1)
      // screen.debug(message)
    })
  })
  describe('actions', () => {
    test('left click -> indicator', async () => {
      const actualProps = { ...testProps }
      await waitFor(() => {
        renderReduxContext(actualProps, store)
      })
      const message = screen.getByTestId('Message')
      expect(screen.queryByTestId('mockIndicator'))
        .not.toBeInTheDocument()
      userEvent.click(message)
      // userEvent.click(message, { button: 2 })
      expect(mockIndicator).toHaveBeenCalledTimes(1)
      expect(screen.getByTestId('mockIndicator'))
        .toBeInTheDocument()
      // const contextMenu = screen.getByTestId(
      //   'mockParagraphContextMenu')
      const result = mockIndicator.mock.calls[0][0]
      expect(result.isOpened).toBeTruthy()
      expect(result.context).toBeObject()
      expect(result.content).toBe(testProps.recordId)
      expect(result.setIndicatorOpened).toBeFunction()
      // console.log('ViewParagraph.test, left click ->',
      //   result)
    })

    test('right click -> context menu', async () => {
      const actualProps = { ...testProps }
      await waitFor(() => {
        renderReduxContext(actualProps, store)
      })
      const message = screen.getByTestId('Message')
      expect(screen.queryByTestId('mockParagraphContextMenu'))
        .not.toBeInTheDocument()
      userEvent.click(message, { button: 2 })
      expect(mockParagraphContextMenu).toHaveBeenCalledTimes(1)
      expect(screen.getByTestId('mockParagraphContextMenu'))
        .toBeInTheDocument()
      // const contextMenu = screen.getByTestId(
      //   'mockParagraphContextMenu')
      const result = mockParagraphContextMenu.mock.calls[0][0]
      expect(result.saveDisabled).toBeFalsy()
      expect(result.context).toBeObject()
      expect(result.setMenuOpened).toBeFunction()
      expect(result.upperLevelElementMenu).toBeFunction()
      expect(result.setParagraphEditted).toBeFunction()
      // console.log('ViewParagraph.test, right click, calls ->',
      //   result)
      // screen.debug(contextMenu)
    })
    test('not editable -> no action on clicks', async () => {
      store.dispatch(setEditable(false))
      const actualProps = { ...testProps }
      await waitFor(() => {
        renderReduxContext(actualProps, store)
      })
      const message = screen.getByTestId('Message')
      expect(screen.queryByTestId('mockIndicator'))
        .not.toBeInTheDocument()
      userEvent.click(message)
      expect(screen.queryByTestId('mockIndicator'))
        .not.toBeInTheDocument()

      expect(screen.queryByTestId('mockParagraphContextMenu'))
        .not.toBeInTheDocument()
      userEvent.click(message, { button: 2 })
      expect(screen.queryByTestId('mockParagraphContextMenu'))
        .not.toBeInTheDocument()
      // screen.debug()
    })
  })
})
