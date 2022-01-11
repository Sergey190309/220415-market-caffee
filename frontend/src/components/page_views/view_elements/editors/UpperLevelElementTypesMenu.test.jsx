import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { makeTestStore, testRender, elementFunc }
  from '../../../../tstHelpers'
import store from '../../../../redux/store'
import {
  elementBlockTypes
  // elementBlockSubTypes
}
  from '../../../../utils/elementTypes'
import UpperLevelElementTypesMenu, { upperLevelElementTypesMenu }
  from './UpperLevelElementTypesMenu'
import { ElementSwitcherProvider, LandingProvider }
  from '../../../../context'

jest.mock('../../../../tstHelpers', () => ({
  ...jest.requireActual('../../../../tstHelpers'),
  elementFunc: jest.fn()
}))

describe('UpperLevelElementTypesMenu testing', () => {
  // const upperLevelElementId = 1
  const testProps = {
    context: {},
    addBelow: false,
    setUpperLevelElementType: jest.fn(),
    setMenuOpened: jest.fn(),
    setUpperLevelSubtypeMenuOpened: jest.fn()
  }
  const mockContext = {
    recordsId: { recordsId: '01_vblock_txt_6' },
    componentName: { componentName: 'landing' }
  }

  // const upperLvlAddElement = jest.fn()

  const renderReduxContext = (
    actualProps,
    testStore = makeTestStore(store),
    context = mockContext
  ) => {
    testRender(
      <LandingProvider value={context.componentName} >
        <ElementSwitcherProvider value={context.recordsId} >
          <UpperLevelElementTypesMenu {...actualProps} />
        </ElementSwitcherProvider>
      </LandingProvider>
      , { store: testStore }
    )
  }
  describe('appeance', () => {
    test('is exsists (snapshot)', async () => {
      /**
       * I test here snapshot and menu length
       */
      const actualProps = { ...testProps }
      await waitFor(() => { renderReduxContext(actualProps, store) })
      const popup = screen.getByTestId('Popup')
      expect(popup).toMatchSnapshot()
      expect(popup.children[0].children)
        .toHaveLength(upperLevelElementTypesMenu(jest.fn()).length)
      // screen.debug(popup)
    })
    test.skip('it desappred if is lost focus', async () => {
      /**
       * I was unable to simulate unhover.
       * Guess it's so small element to move mouse someware other place.
       */
      const actualProps = { ...testProps }
      await waitFor(() => { renderReduxContext(actualProps, store) })
      const popup = screen.getByTestId('Popup')
      expect(popup).toBeInTheDocument()
      expect(popup.children[0].children)
        .toHaveLength(upperLevelElementTypesMenu(jest.fn()).length)
      const uLEHeader = screen.getByText('1LE.header')
      // screen.debug(uLEHeader)
      userEvent.click(uLEHeader)
      // userEvent.unhover(popup)
      expect(actualProps.setMenuOpened).toHaveBeenCalledTimes(1)
      // console.log('UpperLevelElementTypesMenu.test:\n it desappred',
      //   '\n  popup ->', popup.children[0].children.length)
      // expect(screen.queryByTestId('Popup')).not.toBeInTheDocument()
      // screen.debug(screen.getByTestId('Popup'))
    })
  })
  describe('menu action', () => {
    test('header', async () => {
      const actualProps = { ...testProps }
      await waitFor(() => { renderReduxContext(actualProps, store) })
      // const popup = screen.getByTestId('Popup')
      const header = screen.getByText('1LE.header')
      userEvent.click(header)
      expect(elementFunc).toHaveBeenCalledTimes(1)
      expect(elementFunc).toHaveBeenCalledWith({
        name: elementBlockTypes.header,
        viewId: mockContext.componentName.componentName,
        recordsId: mockContext.recordsId.recordsId,
        addBelow: actualProps.addBelow
      })
      expect(actualProps.setMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setMenuOpened).toHaveBeenCalledWith(false)
      // console.log('UpperLevelElementTypesMenu.test:\n addHeader',
      //   '\n  testFunc ->', elementFunc.mock.calls)
      // screen.debug(header)
      // expect(upperLvlAddElement).toHaveBeenCalledTimes(1)
      // expect(upperLvlAddElement).toHaveBeenCalledWith(upperLevelElementId, elementBlockTypes.header)
    })
    test('footer', async () => {
      const actualProps = { ...testProps, addBelow: true }
      await waitFor(() => { renderReduxContext(actualProps, store) })
      // const popup = screen.getByTestId('Popup')
      const footer = screen.getByText('1LE.footer')
      userEvent.click(footer)
      expect(elementFunc).toHaveBeenCalledTimes(1)
      expect(elementFunc).toHaveBeenCalledWith({
        name: elementBlockTypes.footer,
        viewId: mockContext.componentName.componentName,
        recordsId: mockContext.recordsId.recordsId,
        addBelow: actualProps.addBelow
      })
      expect(actualProps.setMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setMenuOpened).toHaveBeenCalledWith(false)
    })
    test('vblock', async () => {
      const actualProps = { ...testProps, addBelow: true }
      await waitFor(() => { renderReduxContext(actualProps, store) })
      // const popup = screen.getByTestId('Popup')
      const vblock = screen.getByText('1LE.vblock')
      userEvent.click(vblock)
      expect(elementFunc).toHaveBeenCalledTimes(1)
      expect(elementFunc).toHaveBeenCalledWith({
        name: elementBlockTypes.vblock
      })
      expect(actualProps.setMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setMenuOpened).toHaveBeenCalledWith(false)
      expect(actualProps.setUpperLevelElementType)
        .toHaveBeenCalledTimes(1)
      expect(actualProps.setUpperLevelElementType)
        .toHaveBeenCalledWith(elementBlockTypes.vblock)
      // screen.debug(popup)
    })
    test('add vblock, pix', async () => {
      const actualProps = { ...testProps }
      await waitFor(() => { renderReduxContext(actualProps, store) })
      // const popup = screen.getByTestId('Popup')
      const hblock = screen.getByText('1LE.hblock')
      userEvent.click(hblock)
      expect(elementFunc).toHaveBeenCalledTimes(1)
      expect(elementFunc).toHaveBeenCalledWith({
        name: elementBlockTypes.hblock
      })
      expect(actualProps.setMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setMenuOpened).toHaveBeenCalledWith(false)
      expect(actualProps.setUpperLevelElementType)
        .toHaveBeenCalledTimes(1)
      expect(actualProps.setUpperLevelElementType)
        .toHaveBeenCalledWith(elementBlockTypes.hblock)
      // screen.debug(popup)
    })
  })
})
