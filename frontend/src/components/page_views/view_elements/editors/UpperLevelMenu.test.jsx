import React from 'react'
import { screen, waitFor } from '@testing-library/react'

import { ElementSwitcherProvider, LandingProvider }
  from '../../../../context'
import store from '../../../../redux/store'
import { makeTestStore, testRender, elementFunc } from '../../../../testHelpers'
import UpperLevelMenu, { upperLevelMenu } from './UpperLevelMenu'
import userEvent from '@testing-library/user-event'

jest.mock('../../../../testHelpers', () => ({
  ...jest.requireActual('../../../../testHelpers'),
  elementFunc: jest.fn()
}))

describe('UpperLevelMenu', () => {
  const testProps = {
    context: {},
    setMenuOpened: jest.fn(),
    setUpperLevelTypeMenuOpened: jest.fn(),
    addBelow: jest.fn()
  }
  const mockContext = {
    recordsId: { recordsId: '01_vblock_txt' },
    componentName: { componentName: 'landing' }
  }
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
          value={context.recordsId} >
          <UpperLevelMenu {...actualProps} />
        </ElementSwitcherProvider>
      </LandingProvider>,
      { store: testStore }
    )
  }
  describe('appearance', () => {
    test('render (snapshot)', async () => {
      const activeProps = { ...testProps }
      await waitFor(() => { renderReduxContext(activeProps, store) })
      const popup = screen.getByTestId('Popup')
      expect(popup).toMatchSnapshot()
      expect(popup.children[0].children)
        .toHaveLength(upperLevelMenu(jest.fn()).length)
    })
  })
  describe('actions', () => {
    test('1LE.addAbove ', async () => {
      const activeProps = { ...testProps }
      await waitFor(() => { renderReduxContext(activeProps, store) })
      const addAbove = screen.getByText('1LE.addAbove')
      userEvent.click(addAbove)
      expect(elementFunc).toHaveBeenCalledTimes(1)
      expect(elementFunc)
        .toHaveBeenCalledWith({ name: 'UPPER_ELEMENT_ADD_ABOVE' })
      expect(activeProps.addBelow).toHaveBeenCalledTimes(1)
      expect(activeProps.addBelow).toHaveBeenCalledWith(false)
      expect(activeProps.setUpperLevelTypeMenuOpened)
        .toHaveBeenCalledTimes(1)
      expect(activeProps.setUpperLevelTypeMenuOpened)
        .toHaveBeenCalledWith(true)
      expect(activeProps.setMenuOpened).toHaveBeenCalledTimes(1)
      expect(activeProps.setMenuOpened).toHaveBeenCalledWith(false)
    })
    test('1LE.addBelow ', async () => {
      const activeProps = { ...testProps }
      await waitFor(() => { renderReduxContext(activeProps, store) })
      const addBelow = screen.getByText('1LE.addBelow')
      userEvent.click(addBelow)
      expect(elementFunc).toHaveBeenCalledTimes(1)
      expect(elementFunc)
        .toHaveBeenCalledWith({ name: 'UPPER_ELEMENT_ADD_BELOW' })
      expect(activeProps.addBelow).toHaveBeenCalledTimes(1)
      expect(activeProps.addBelow).toHaveBeenCalledWith(true)
      expect(activeProps.setUpperLevelTypeMenuOpened)
        .toHaveBeenCalledTimes(1)
      expect(activeProps.setUpperLevelTypeMenuOpened)
        .toHaveBeenCalledWith(true)
      expect(activeProps.setMenuOpened).toHaveBeenCalledTimes(1)
      expect(activeProps.setMenuOpened).toHaveBeenCalledWith(false)
    })
    test('1LE.DeleteElement ', async () => {
      const activeProps = { ...testProps }
      await waitFor(() => { renderReduxContext(activeProps, store) })
      const DeleteElement = screen.getByText('1LE.DeleteElement')
      userEvent.click(DeleteElement)
      expect(elementFunc).toHaveBeenCalledTimes(1)
      expect(elementFunc)
        .toHaveBeenCalledWith({
          index: mockContext.recordsId.recordsId.split('_')[0],
          name: 'UPPER_ELEMENT_DELETE',
          recordsId: mockContext.recordsId.recordsId,
          viewId: mockContext.componentName.componentName
        })
      expect(activeProps.setMenuOpened).toHaveBeenCalledTimes(1)
      expect(activeProps.setMenuOpened).toHaveBeenCalledWith(false)
      // const popup = screen.getByTestId('Popup')
      // screen.debug(popup)
    })
  })
})
