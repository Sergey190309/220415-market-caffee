import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import store from '../../redux/store'
import SaveToBackendContextMenu, { saveToBackendContextMenu }
  from './SaveToBackendContextMenu'
import { makeTestStore, testRender } from '../../testHelpers'
import { backendTxtUpdateClear, backendTxtUpdateStart } from '../../redux/slices'
// import { testRender, makeTestStore } from '../../../../testHelpers'
// import store from '../../../../redux/store'
// import moduleName from '../../'

jest.mock('../../api/calls/content')

describe('saveToBackendContextMenu testing', () => {
  const testProps = {
    isOpened: true,
    context: {},
    setContextMenuOpened: jest.fn()
  }

  const renderRedux = (
    actualProps,
    testStore = makeTestStore(store)
  ) => {
    // console.log('ParagraphContextMenu.test:\n renderReduxContext',
    //   '\n  index ->', index)
    testRender(
      <SaveToBackendContextMenu {...actualProps} />
      , { store: testStore }
    )
  }
  describe('appearance', () => {
    test('rendering, elements qnt, (screenshot)', async () => {
      const acitveProps = { ...testProps }
      await waitFor(() => {
        renderRedux(acitveProps, store)
      })
      const popup = screen.getByTestId('Popup')
      expect(popup).toMatchSnapshot()
      const menu = screen.getByTestId('Menu')
      expect(menu.children)
        .toHaveLength(saveToBackendContextMenu(jest.fn()).length)
      // console.log('SaveToBackendContextMenu.test:\n rendering',
      //   '\n  popup ->', menu.children.length)
      // screen.debug(popup)
    })
    test('not opened -> no popup visible', async () => {
      const acitveProps = { ...testProps, isOpened: false }
      await waitFor(() => {
        renderRedux(acitveProps, store)
      })
      expect(screen.queryByTestId('Popup')).not.toBeInTheDocument()
      // screen.debug()
    })
  })
  describe('actions', () => {
    test('2LE.saveEditedElement', async () => {
      const acitveProps = { ...testProps }
      await waitFor(() => {
        renderRedux(acitveProps)
      })
      const save = screen.getByText('2LE.saveEditedElement')
      userEvent.click(save)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(backendTxtUpdateStart())
      expect(acitveProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
      expect(acitveProps.setContextMenuOpened).toHaveBeenCalledWith(false)
      // console.log('SaveToBackendContextMenu.test:\n rendering',
      //   '\n  dispatch ->', store.dispatch.mock.calls)
      // screen.debug(save)
    })
    test('2LE.cancelEditedElement', async () => {
      const acitveProps = { ...testProps }
      await waitFor(() => {
        renderRedux(acitveProps)
      })
      const cancel = screen.getByText('2LE.cancelEditedElement')
      userEvent.click(cancel)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(backendTxtUpdateClear())
      expect(acitveProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
      expect(acitveProps.setContextMenuOpened).toHaveBeenCalledWith(false)
      // console.log('SaveToBackendContextMenu.test:\n rendering',
      //   '\n  dispatch ->', store.dispatch.mock.calls)
      // screen.debug()
    })
  })
})
