import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'

import store from '../../../../redux/store'
import { UpperLevel } from '../ElementSwitcher'
import { UpperLeverElementId } from '../ViewVBlock'
import { elementBlockTypes, elementBlockSubTypes } from '../../../../utils/elementTypes'
import ElementTypesMenu from './ElementTypesMenu'
import userEvent from '@testing-library/user-event'

describe('ElementTypesMenu', () => {
  const upperLevelElementId = 1
  const testProps = {
    isOpened: false,
    context: {},
    upperLevelElementId,
    setOpenedProp: jest.fn()
  }
  const upperLvlElementId = '01_vblock_txt_3'
  const upperLvlAddElement = jest.fn()
  const upperLvlDeleteElement = jest.fn()

  const renderReduxContext = props => {
    render(
      <Provider store={store}>
        <UpperLevel.Provider value={{
          upperLvlAddElement,
          upperLvlDeleteElement
        }}>
          <UpperLeverElementId.Provider value={upperLvlElementId}>
            <ElementTypesMenu {...props} />
          </UpperLeverElementId.Provider>
        </UpperLevel.Provider>
      </Provider>
    )
  }
  describe('component action', () => {
    describe('menu options actions', () => {
      test('addHeader', async () => {
        const actualProps = { ...testProps, isOpened: true }
        await waitFor(() => { renderReduxContext(actualProps) })
        const addHeader = screen.getByText('1LE.header')
        userEvent.click(addHeader)
        expect(upperLvlAddElement).toHaveBeenCalledTimes(1)
        expect(upperLvlAddElement).toHaveBeenCalledWith(upperLevelElementId, elementBlockTypes.header)
      })
      test('footer', async () => {
        const actualProps = { ...testProps, isOpened: true }
        await waitFor(() => { renderReduxContext(actualProps) })
        const addFooter = screen.getByText('1LE.footer')
        userEvent.click(addFooter)
        expect(upperLvlAddElement).toHaveBeenCalledTimes(1)
        expect(upperLvlAddElement).toHaveBeenCalledWith(upperLevelElementId, elementBlockTypes.footer)
        // console.log('ElementTypesMenu.test:\n addFooter',
        //   '\n  upperLvlAddElement ->', upperLvlAddElement.mock.calls[0])
        // screen.debug(addFooter)
      })
    })
    describe('submenu options actions', () => {
      test('add vblock, txt', async () => {
        const actualProps = { ...testProps, isOpened: true }
        await waitFor(() => { renderReduxContext(actualProps) })
        const addVBlockDD = screen.getByText('1LE.vblock')
        const subMenuTxt = screen.getAllByRole('option', { name: '1LE.txt' })
        expect(screen.queryByTestId('Popup')).not.toBe(null)
        await waitFor(() => { userEvent.click(addVBlockDD) })
        await waitFor(() => { userEvent.click(subMenuTxt[0]) })
        expect(upperLvlAddElement).toHaveBeenCalledTimes(1)
        expect(upperLvlAddElement)
          .toHaveBeenCalledWith(upperLevelElementId,
            elementBlockTypes.vblock, elementBlockSubTypes.txt)
        // console.log('ElementTypesMenu.test:\n addFooter',
        //   '\n  upperLvlAddElement ->', upperLvlAddElement.mock.calls)
        expect(screen.queryByTestId('Popup')).toBe(null)
        // screen.debug()
      })
      test('add vblock, pix', async () => {
        const actualProps = { ...testProps, isOpened: true }
        await waitFor(() => { renderReduxContext(actualProps) })
        const addVBlockDD = screen.getByText('1LE.vblock')
        const subMenuTxt = screen.getAllByRole('option', { name: '1LE.pix' })
        expect(screen.queryByTestId('Popup')).not.toBe(null)
        await waitFor(() => { userEvent.click(addVBlockDD) })
        await waitFor(() => { userEvent.click(subMenuTxt[0]) })
        expect(upperLvlAddElement).toHaveBeenCalledTimes(1)
        expect(upperLvlAddElement)
          .toHaveBeenCalledWith(upperLevelElementId,
            elementBlockTypes.vblock, elementBlockSubTypes.pix)
        // console.log('ElementTypesMenu.test:\n addFooter',
        //   '\n  upperLvlAddElement ->', upperLvlAddElement.mock.calls)
        expect(screen.queryByTestId('Popup')).toBe(null)
        // screen.debug()
      })
      test('add hblock, txt', async () => {
        const actualProps = { ...testProps, isOpened: true }
        await waitFor(() => { renderReduxContext(actualProps) })
        const addVBlockDD = screen.getByText('1LE.hblock')
        const subMenuTxt = screen.getAllByRole('option', { name: '1LE.txt' })
        expect(screen.queryByTestId('Popup')).not.toBe(null)
        await waitFor(() => { userEvent.click(addVBlockDD) })
        await waitFor(() => { userEvent.click(subMenuTxt[0]) })
        expect(upperLvlAddElement).toHaveBeenCalledTimes(1)
        expect(upperLvlAddElement)
          .toHaveBeenCalledWith(upperLevelElementId,
            elementBlockTypes.hblock, elementBlockSubTypes.txt)
        // console.log('ElementTypesMenu.test:\n addFooter',
        //   '\n  upperLvlAddElement ->', upperLvlAddElement.mock.calls)
        expect(screen.queryByTestId('Popup')).toBe(null)
        // screen.debug()
      })
      test('add hblock, pix', async () => {
        const actualProps = { ...testProps, isOpened: true }
        await waitFor(() => { renderReduxContext(actualProps) })
        const addVBlockDD = screen.getByText('1LE.hblock')
        const subMenuTxt = screen.getAllByRole('option', { name: '1LE.pix' })
        expect(screen.queryByTestId('Popup')).not.toBe(null)
        await waitFor(() => { userEvent.click(addVBlockDD) })
        await waitFor(() => { userEvent.click(subMenuTxt[0]) })
        expect(upperLvlAddElement).toHaveBeenCalledTimes(1)
        expect(upperLvlAddElement)
          .toHaveBeenCalledWith(upperLevelElementId,
            elementBlockTypes.hblock, elementBlockSubTypes.pix)
        // console.log('ElementTypesMenu.test:\n addFooter',
        //   '\n  upperLvlAddElement ->', upperLvlAddElement.mock.calls)
        expect(screen.queryByTestId('Popup')).toBe(null)
        // screen.debug()
      })
    })
  })

  describe('appeance', () => {
    test('it should exist and has all options and icons (snapshot)', async () => {
      const actualProps = { ...testProps, isOpened: true }
      await waitFor(() => { renderReduxContext(actualProps) })
      const popup = screen.getByTestId('Popup')
      expect(popup).toMatchSnapshot()
      // screen.debug()
    })
    test('it does not exist if not opened', async () => {
      const actualProps = { ...testProps }
      await waitFor(() => { renderReduxContext(actualProps) })
      expect(screen.queryByTestId('Popup')).toBe(null)
    })
  })
})
