/* eslint-disable react/display-name */
import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import store from '../../../../redux/store'
import { UpperLevel } from '../ElementSwitcher'
import { UpperLeverElementId } from '../ViewVBlock'
import { createContextFromEvent } from '../../../../utils/createContextFromEvent'

import ParagraphContextMenu from './ParagraphContextMenu'

jest.mock('../../../../utils/createContextFromEvent')

const mockChildComponent = jest.fn()
jest.mock('./ElementTypesMenu', () => props => {
  mockChildComponent(props)
  return <div data-testid='ElementTypesMenu' />
})

describe('ParagraphContextMenu testing', () => {
  const testProps = {
    isOpened: false,
    saveDisabled: true,
    context: {},
    setContextMenuOpened: jest.fn(),
    setParagraphEditted: jest.fn(),
    saveToBackend: jest.fn(),
    deleteElement: jest.fn(),
    addAbove: jest.fn(),
    addBelow: jest.fn()
  }
  const upperLvlElementId = '01_vblock_txt_3'
  const upperLvlAddElement = jest.fn()
  const upperLvlDeleteElement = jest.fn()

  const renderReduxContext = (actualProps) => {
    // await waitFor(() => {
    render(
      <Provider store={store}>
        <UpperLevel.Provider value={{
          upperLvlAddElement,
          upperLvlDeleteElement
        }} >
          <UpperLeverElementId.Provider value={upperLvlElementId} >
            <ParagraphContextMenu {...actualProps} />
          </UpperLeverElementId.Provider>
        </UpperLevel.Provider>
      </Provider>
    )
    // expect(container).toBeEmptyDOMElement()
    // })
  }

  describe('component actions', () => {
    describe('submenu actions', () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      beforeEach(async () => {
        await waitFor(() => {
          renderReduxContext(actualProps)
        })
      })
      test('dropdown, addAbove', async () => {
        const upperAddAbove = screen.getByRole('option', { name: '1LE.addAbove' })

        await waitFor(() => { userEvent.click(upperAddAbove) })
        expect(createContextFromEvent).toHaveBeenCalledTimes(1)
        expect(typeof createContextFromEvent.mock.calls[0][0]).toBe('object')
        // const elementTypesMenuPropsKeys = Object.keys(mockChildComponent.mock.calls[0][0])
        expect(Object.keys(mockChildComponent.mock.calls[0][0]))
          .toEqual(expect.arrayContaining([
            'isOpened', 'context',
            'upperLevelElementId', 'setOpenedProp']))
        expect(mockChildComponent.mock.calls[0][0].isOpened)
          .toBeTruthy()
        expect(mockChildComponent.mock.calls[0][0]
          .upperLevelElementId)
          .toBe(parseInt(upperLvlElementId.split('_')[0]))
        // screen.debug()
      })
      test('dropdown, addBelow', async () => {
        const upperAddBelow = screen.getByRole('option', { name: '1LE.addBelow' })

        await waitFor(() => { userEvent.click(upperAddBelow) })
        expect(createContextFromEvent).toHaveBeenCalledTimes(1)
        expect(typeof createContextFromEvent.mock.calls[0][0]).toBe('object')
        // const elementTypesMenuPropsKeys = Object.keys(mockChildComponent.mock.calls[0][0])
        expect(Object.keys(mockChildComponent.mock.calls[0][0]))
          .toEqual(expect.arrayContaining([
            'isOpened', 'context',
            'upperLevelElementId', 'setOpenedProp']))
        expect(mockChildComponent.mock.calls[0][0].isOpened)
          .toBeTruthy()
        expect(mockChildComponent.mock.calls[0][0]
          .upperLevelElementId)
          .toBe(parseInt(upperLvlElementId.split('_')[0]) + 1)
        // screen.debug()
      })
      test('dropdown, delete', async () => {
        const uppreDelete = screen.getByRole('option', { name: '1LE.DeleteElement' })
        expect(screen.queryByTestId('Popup')).not.toBe(null)
        userEvent.click(uppreDelete)
        expect(upperLvlDeleteElement).toHaveBeenCalledTimes(1)
        expect(upperLvlDeleteElement).toHaveBeenCalledWith(parseInt(upperLvlElementId.split('_')[0]))
        // await waitFor(() => {
        // })
        // expect(screen.queryByTestId('Popup')).toBe(null)
        // console.log('ParagraphContextMenu.test:',
        //   '\n dropdown delete',
        //   '\n  upperLvlDeleteElement ->', upperLvlDeleteElement.mock.calls)
      })
    })
    describe('menu options testing', () => {
      test('save option enabled', async () => {
        const actualProps = {
          ...testProps,
          isOpened: true,
          saveDisabled: false
        }
        await waitFor(() => {
          renderReduxContext(actualProps)
        })
        const saveOptionAnabled = screen.getByRole('listbox')
        // const saveOptionAnabled = screen.getByText('2LE.saveElement')
        expect(saveOptionAnabled).not.toHaveClass('disabled')
        // screen.debug(saveOptionAnabled)
      })

      test('edit option clicked actions', async () => {
        const actualProps = {
          ...testProps,
          isOpened: true
        }
        await waitFor(() => {
          renderReduxContext(actualProps)
        })
        expect(screen.queryByTestId('Popup')).not.toBe(null)
        const editOption = screen.getByText('2LE.editElement')
        userEvent.click(editOption)
        expect(actualProps.setParagraphEditted)
          .toHaveBeenCalledTimes(1)
        expect(actualProps.setParagraphEditted)
          .toHaveBeenCalledWith(true)
        expect(actualProps.setContextMenuOpened)
          .toHaveBeenCalledTimes(1)
        expect(actualProps.setContextMenuOpened)
          .toHaveBeenCalledWith(false)
        // expect(screen.queryByTestId('Popup')).toBe(null)
        // waitFor(() => {
        //   screen.debug()
        // })
      })

      test('save option clicked actions', async () => {
        const actualProps = {
          ...testProps,
          isOpened: true,
          saveDisabled: false
        }
        await waitFor(() => {
          renderReduxContext(actualProps)
        })
        expect(screen.queryByTestId('Popup')).not.toBe(null)
        // screen.debug()
        const saveOption = screen.getByText('2LE.saveElement')
        userEvent.click(saveOption)
        expect(actualProps.saveToBackend).toHaveBeenCalledTimes(1)
        expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
        expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
        // expect(screen.queryByTestId('Popup')).toBe(null)
      })

      test('add above option clicked actions', async () => {
        const actualProps = {
          ...testProps,
          isOpened: true
        }
        await waitFor(() => {
          renderReduxContext(actualProps)
        })
        expect(screen.queryByTestId('Popup')).not.toBe(null)
        const addAboveOption = screen.getByText('2LE.addAbove')
        userEvent.click(addAboveOption)
        expect(actualProps.addAbove).toHaveBeenCalledTimes(1)
        expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
        expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
        // expect(screen.queryByTestId('Popup')).toBe(null)
        // screen.debug()
      })
      test('add below option clicked actions', async () => {
        const actualProps = {
          ...testProps,
          isOpened: true
        }
        await waitFor(() => {
          renderReduxContext(actualProps)
        })
        expect(screen.queryByTestId('Popup')).not.toBe(null)
        const addBelowOption = screen.getByText('2LE.addBelow')
        userEvent.click(addBelowOption)
        expect(actualProps.addBelow).toHaveBeenCalledTimes(1)
        expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
        expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
        // expect(screen.queryByTestId('Popup')).toBe(null)
        // screen.debug()
      })
      test('delete Option clicked actions', async () => {
        const actualProps = {
          ...testProps,
          isOpened: true
        }
        await waitFor(() => {
          renderReduxContext(actualProps)
        })
        expect(screen.queryByTestId('Popup')).not.toBe(null)
        const deleteOption = screen.getByText('2LE.deleteElement')
        userEvent.click(deleteOption)
        expect(actualProps.deleteElement).toHaveBeenCalledTimes(1)
        expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
        expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
        // expect(screen.queryByTestId('Popup')).toBe(null)
        // screen.debug()
      })
    })
  })

  describe('appeance', () => {
    test('popup does not exist when is not opened', async () => {
      // const actualProps = { ...testProps, isOpened: true }
      await waitFor(() => {
        renderReduxContext(testProps)
      })
      expect(screen.queryByTestId('Popup')).toBe(null)
      // const result = screen.queryByTestId('Popup')
      // console.log('it is impty when is not opened, result ->', result)
      // screen.debug()
    })

    test('it should exist and has all options and icons', async () => {
      const actualProps = { ...testProps, isOpened: true }
      renderReduxContext(actualProps)
      expect(screen.findByTestId('Popup')).not.toBe(null)

      const editItem = screen.getByText('2LE.editElement')
      // const editItem = screen.getByRole('Item', { name: '1stLevel.editElement' })
      expect(editItem).toBeVisible()
      expect(editItem).toHaveClass('item sc-bdfBQB eVLmMB')
      expect(editItem.children[0]).toHaveClass('teal edit icon')

      const saveItem = screen.getByText('2LE.saveElement')
      expect(saveItem).toBeVisible()
      expect(saveItem).toHaveClass('disabled item sc-bdfBQB eVLmMB', { exact: true })
      expect(saveItem.children[0]).toHaveClass('orange save icon')

      const aboveItem = screen.getByText('2LE.addAbove')
      expect(aboveItem).toBeVisible()
      expect(aboveItem).toHaveClass('item sc-bdfBQB eVLmMB')
      expect(aboveItem.children[0]).toHaveClass('olive angle up icon')

      const belowItem = screen.getByText('2LE.addBelow')
      expect(belowItem).toBeVisible()
      expect(belowItem).toHaveClass('item sc-bdfBQB eVLmMB')
      expect(belowItem.children[0]).toHaveClass('olive angle down icon')

      const deleteItem = screen.getByText('2LE.deleteElement')
      expect(deleteItem).toBeVisible()
      expect(deleteItem).toHaveClass('item sc-bdfBQB eVLmMB')
      expect(deleteItem.children[0]).toHaveClass('orange delete icon')

      const dropDown = screen.getByRole('listbox')
      expect(dropDown).toBeVisible()
      expect(dropDown).toHaveClass('ui fluid dropdown icon')
      expect(dropDown.children).toHaveLength(3)
      expect(dropDown).toHaveTextContent('1LE.handle')

      const upperAboveOption = screen.getByRole('option', { name: '1LE.addAbove' })
      expect(upperAboveOption).toBeVisible()
      expect(upperAboveOption).toHaveClass('item', { exact: true })
      expect(upperAboveOption.children[0]).toHaveClass('olive angle up icon')
      // console.log('rendering, deleteoption ->', dropDown.children.length)

      const uppreBelowOption = screen.getByRole('option', { name: '1LE.addBelow' })
      expect(uppreBelowOption).toBeVisible()
      expect(uppreBelowOption).toHaveClass('item', { exact: true })
      expect(uppreBelowOption.children[0]).toHaveClass('olive angle down icon', { exact: true })
      // screen.debug(uppreBelowOption)

      const upperDeleteOption = screen.getByRole('option', { name: '1LE.DeleteElement' })
      expect(upperDeleteOption).toBeVisible()
      expect(upperDeleteOption).toHaveClass('item', { exact: true })
      expect(upperDeleteOption.children[0]).toHaveClass('orange delete icon', { exact: true })
    })
  })
})
