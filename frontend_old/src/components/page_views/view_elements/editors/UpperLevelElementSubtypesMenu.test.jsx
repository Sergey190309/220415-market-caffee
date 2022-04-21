import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { makeTestStore, testRender, elementFunc }
  from '../../../../tstHelpers'
import store from '../../../../redux/store'
import {
  elementBlockSubTypes
} from '../../../../utils/elementTypes'
import {
  ElementSwitcherProvider, LandingProvider
} from '../../../../context'
import ElementSubtypesMenu, { elementSubtypesMenu }
  from './UpperLevelElementSubtypesMenu'

jest.mock('../../../../tstHelpers', () => ({
  ...jest.requireActual('../../../../tstHelpers'),
  elementFunc: jest.fn()
}))

describe('UpperLevelElementSubtypesMenu', () => {
  const testProps = {
    context: {},
    addBelow: false,
    upperLevelElementType: '',
    setMenuOpened: jest.fn()
  }
  const mockContext = {
    recordsId: { recordsId: '01_vblock_txt_6' },
    componentName: { componentName: 'landing' }
  }

  const renderReduxContext = (
    actualProps,
    testStore = makeTestStore(store),
    context = mockContext
  ) => {
    testRender(
      <LandingProvider value={context.componentName} >
        <ElementSwitcherProvider value={context.recordsId} >
          <ElementSubtypesMenu {...actualProps} />
        </ElementSwitcherProvider>
      </LandingProvider>
      , { store: testStore }
    )
  }
  describe('appearance', () => {
    test('it exists (snapsot)', async () => {
      const actualProps = { ...testProps }
      await waitFor(() => {
        renderReduxContext(actualProps, store)
      })
      const popup = screen.getByTestId('Popup')
      expect(popup).toMatchSnapshot()
      expect(popup.children[0].children)
        .toHaveLength(elementSubtypesMenu(jest.fn()).length)
      // screen.debug(popup)
    })
  })
  describe('actions', () => {
    test('1LE.txt', async () => {
      const actualProps = {
        ...testProps, upperLevelElementType: 'mockType'
      }
      await waitFor(() => { renderReduxContext(actualProps, store) })
      const txt = screen.getByText('1LE.txt')
      userEvent.click(txt)
      expect(elementFunc).toHaveBeenCalledTimes(1)
      expect(elementFunc).toHaveBeenCalledWith({
        viewId: mockContext.componentName.componentName,
        type: actualProps.upperLevelElementType,
        subtype: elementBlockSubTypes.txt,
        index: +mockContext.recordsId.recordsId.split('_')[0]
      })
      expect(actualProps.setMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setMenuOpened).toHaveBeenCalledWith(false)
      // console.log('UpperLevelElementSubtypesMenu.test\n 1LE.txt',
      //   '\n  calls ->', elementFunc.mock.calls)
      // screen.debug(txt)
    })
    test('1LE.pix', async () => {
      const actualProps = {
        ...testProps,
        addBelow: true,
        upperLevelElementType: 'mockType'
      }
      await waitFor(() => { renderReduxContext(actualProps, store) })
      const pix = screen.getByText('1LE.pix')
      userEvent.click(pix)
      expect(elementFunc).toHaveBeenCalledTimes(1)
      expect(elementFunc).toHaveBeenCalledWith({
        viewId: mockContext.componentName.componentName,
        type: actualProps.upperLevelElementType,
        subtype: elementBlockSubTypes.pix,
        index: +mockContext.recordsId.recordsId.split('_')[0] + 1
      })
      expect(actualProps.setMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setMenuOpened).toHaveBeenCalledWith(false)
      // console.log('UpperLevelElementSubtypesMenu.test\n 1LE.pix',
      //   '\n  calls ->', elementFunc.mock.calls)
      // screen.debug(pix)
    })
  })
})
