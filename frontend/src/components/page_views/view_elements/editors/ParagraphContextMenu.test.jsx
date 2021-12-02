/* eslint-disable react/display-name */
import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { testRender, makeTestStore } from '../../../../testHelpers'
import store from '../../../../redux/store'

import {
  ElementSwitcherProvider, LandingProvider,
  ViewParagraphProvider
} from '../../../../context'

import ParagraphContextMenu from './ParagraphContextMenu'
import {
  backendAddElementStart, backendRemoveElementStart,
  backendTxtUpdateStart, setEditable
} from '../../../../redux/slices'

jest.mock('../../../../api/calls/content')

describe('ParagraphContextMenu testing', () => {
  const testProps = {
    saveDisabled: true,
    context: {},
    setMenuOpened: jest.fn(),
    upperLevelElementMenu: jest.fn(),
    setParagraphEditted: jest.fn()
  }
  const mockContext = {
    index: { index: 1 },
    upperLevelElementId: { upperLevelElementId: '01_vblock_txt' },
    componentName: { componentName: 'landing' }
  }

  // const makeTestStore = store => {
  //   const origDispatch = store.dispatch
  //   store.dispatch = jest.fn(origDispatch)
  //   return store
  // }

  const renderReduxContext = (
    actualProps,
    testStore = makeTestStore(store),
    context = mockContext
  ) => {
    // console.log('ParagraphContextMenu.test:\n renderReduxContext',
    //   '\n  index ->', index)
    testRender(
      <LandingProvider value={context.componentName} >
        <ElementSwitcherProvider
          value={context.upperLevelElementId} >
          <ViewParagraphProvider value={context.index} >
            <ParagraphContextMenu {...actualProps} />
          </ViewParagraphProvider>
        </ElementSwitcherProvider>
      </LandingProvider>,
      { store: testStore }
    )
  }

  beforeEach(() => {
    store.dispatch(setEditable(true))
  })

  describe('appeance', () => {
    test('popup does not exist when editable selectore set to false',
      async () => {
        const actualProps = { ...testProps }
        store.dispatch(setEditable(false))
        await waitFor(() => {
          renderReduxContext(actualProps, store)
        })
        expect(screen.queryByTestId('Popup')).toBe(null)
      })

    test('it should exist and has all options and icons', async () => {
      const actualProps = { ...testProps }
      await waitFor(() => {
        renderReduxContext(actualProps)
      })
      expect(screen.getByTestId('Popup')).not.toBe(null)
      // screen.debug()
      const editElement = screen.getByText('2LE.editElement')
      expect(editElement).toBeVisible()
      expect(editElement).toHaveClass('item sc-bdfBQB eVLmMB')
      expect(editElement.children[0]).toHaveClass('teal edit icon')

      const saveElement = screen.getByText('2LE.saveElement')
      expect(saveElement).toBeVisible()
      expect(saveElement).toHaveClass(
        'disabled item sc-bdfBQB eVLmMB', { exact: true })
      expect(saveElement.children[0]).toHaveClass('orange save icon')

      const addAbove = screen.getByText('2LE.addAbove')
      expect(addAbove).toBeVisible()
      expect(addAbove).toHaveClass('item sc-bdfBQB eVLmMB')
      expect(addAbove.children[0]).toHaveClass('olive angle up icon')

      const addBelow = screen.getByText('2LE.addBelow')
      expect(addBelow).toBeVisible()
      expect(addBelow).toHaveClass('item sc-bdfBQB eVLmMB')
      expect(addBelow.children[0]).toHaveClass('olive angle down icon')

      const deleteElement = screen.getByText('2LE.deleteElement')
      expect(deleteElement).toBeVisible()
      expect(deleteElement).toHaveClass('item sc-bdfBQB eVLmMB')
      expect(deleteElement.children[0]).toHaveClass('orange delete icon')

      const handle = screen.getByText('1LE.handle')
      expect(handle).toBeVisible()
      expect(handle).toHaveClass('item sc-bdfBQB eVLmMB')
      expect(handle.children[0]).toHaveClass(
        'olive angle right icon')
    })
  })

  describe('component actions', () => {
    test('2LE.editElement pressed', async () => {
      const actualProps = {
        ...testProps
      }
      await waitFor(() => {
        renderReduxContext(actualProps)
      })

      const editElement = screen.getByText('2LE.editElement')
      await waitFor(() => { userEvent.click(editElement) })
      expect(testProps.setParagraphEditted).toHaveBeenCalledTimes(1)
      expect(
        testProps.setParagraphEditted).toHaveBeenCalledWith(true)
      // console.log('ParagraphContextMenu.test:',
      //   '\n 2LE.editElement pressed',
      //   '\n  calls ->', testProps.setParagraphEditted.mock.calls)

      // screen.debug(editElement)
    })

    test('2LE.saveElement pressed', async () => {
      const actualProps = {
        ...testProps,
        saveDisabled: false
      }
      await waitFor(() => {
        renderReduxContext(actualProps)
      })

      const saveElement = screen.getByText('2LE.saveElement')
      await waitFor(() => { userEvent.click(saveElement) })
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(
        backendTxtUpdateStart())
    })
    test('2LE.addAbove pressed', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        renderReduxContext(actualProps)
      })
      const addAbove = screen.getByText('2LE.addAbove')
      await waitFor(() => { userEvent.click(addAbove) })
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(
        backendAddElementStart({
          view_id: mockContext.componentName.componentName,
          identity:
            mockContext.upperLevelElementId.upperLevelElementId,
          index: mockContext.index.index
        }))
      // console.log('ParagraphContextMenu.test:',
      //   '\n active test',
      //   '\n  calls ->', store.dispatch.mock.calls[0][0],
      //   '\n  argument ->', backendAddElementStart({
      //     view_id: mockContext.componentName.componentName,
      //     identity:
      //       mockContext.upperLevelElementId.upperLevelElementId,
      //     index: mockContext.index.index

      //   })
      // )
      // screen.debug(addAbove)
    })
    test('2LE.addBelow pressed', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        renderReduxContext(actualProps)
      })
      const addBelow = screen.getByText('2LE.addBelow')
      await waitFor(() => { userEvent.click(addBelow) })
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(
        backendAddElementStart({
          view_id: mockContext.componentName.componentName,
          identity:
            mockContext.upperLevelElementId.upperLevelElementId,
          index: mockContext.index.index + 1
        }))
    })
    test('2LE.deleteElement pressed', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        renderReduxContext(actualProps)
      })
      const deleteElement = screen.getByText('2LE.deleteElement')
      await waitFor(() => { userEvent.click(deleteElement) })
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(
        backendRemoveElementStart({
          view_id: mockContext.componentName.componentName,
          identity:
            mockContext.upperLevelElementId.upperLevelElementId,
          index: mockContext.index.index
        }))
      // console.log('ParagraphContextMenu.test:',
      //   '\n active test',
      //   '\n  calls ->', store.dispatch.mock.calls[0][0],
      //   '\n  argument ->', backendAddElementStart({
      //     view_id: mockContext.componentName.componentName,
      //     identity:
      //       mockContext.upperLevelElementId.upperLevelElementId,
      //     index: mockContext.index.index
      //   })
      // )
      // screen.debug(addAbove)
    })
    test('1LE.handle pressed', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        renderReduxContext(actualProps)
      })

      const handle = screen.getByText('1LE.handle')
      await waitFor(() => { userEvent.click(handle) })
      expect(
        testProps.upperLevelElementMenu).toHaveBeenCalledTimes(1)
      expect(
        testProps.upperLevelElementMenu).toHaveBeenCalledWith()
      // console.log('ParagraphContextMenu.test:',
      //   '\n 2LE.editElement pressed',
      //   '\n  calls ->', testProps.setParagraphEditted.mock.calls)
      // screen.debug(handle)
    })
  })
})
