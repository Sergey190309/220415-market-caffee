import React from 'react'
import { Provider } from 'react-redux'
// import renderer from 'react-test-renderer'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import store from '../../../../redux/store'
import ParagraphContextMenu from './ParagraphContextMenu'

describe('ParagraphContextMenu testing', () => {
  const testProps = {
    isOpened: false,
    saveDisabled: false,
    context: {},
    setContextMenuOpened: jest.fn(),
    setParagraphEditted: jest.fn()
  }

  describe('component actions', () => {
    test('save button enabled', async () => {
    // test.only('enable save button', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <ParagraphContextMenu {...actualProps} />
          </Provider>
        )
      })
      const saveButtonAnabled = screen.getByRole('button', { name: '1stLevel.saveElement' })
      expect(saveButtonAnabled).toBeEnabled()
      // screen.debug()
    })

    test('edit button clicked actions', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <ParagraphContextMenu {...actualProps} />
          </Provider>
        )
      })
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      const editButton = screen.getByRole('button', { name: '1stLevel.editElement' })
      userEvent.click(editButton)
      expect(actualProps.setParagraphEditted).toHaveBeenCalledTimes(1)
      expect(actualProps.setParagraphEditted).toHaveBeenCalledWith(true)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
      expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
    test('save button clicked actions', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <ParagraphContextMenu {...actualProps} />
          </Provider>
        )
      })
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      // screen.debug()
      const saveButton = screen.getByRole('button', { name: '1stLevel.saveElement' })
      userEvent.click(saveButton)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
      expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
    test('add above button clicked actions', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <ParagraphContextMenu {...actualProps} />
          </Provider>
        )
      })
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      const addAboveButton = screen.getByRole('button', { name: '1stLevel.addAbove' })
      userEvent.click(addAboveButton)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
      expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
    test('add below button clicked actions', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <ParagraphContextMenu {...actualProps} />
          </Provider>
        )
      })
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      const addBelowButton = screen.getByRole('button', { name: '1stLevel.addBelow' })
      userEvent.click(addBelowButton)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
      expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
    test('delete button clicked actions', async () => {
      const actualProps = {
        ...testProps,
        isOpened: true
      }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <ParagraphContextMenu {...actualProps} />
          </Provider>
        )
      })
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      const deleteButton = screen.getByRole('button', { name: '1stLevel.deleteElement' })
      userEvent.click(deleteButton)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
      expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
  })

  describe('appeance', () => {
    test('popup does not exist when is not opened', async () => {
      // const actualProps = {...testProps, isOpened: true}
      await waitFor(() => {
        render(
          <Provider store={store}>
            <ParagraphContextMenu {...testProps} />
            {/* <ParagraphContextMenu {...actualProps} /> */}
          </Provider>
        )
        // expect(container).toBeEmptyDOMElement()
      })
      expect(screen.queryByTestId('Popup')).toBe(null)
      // const result = screen.queryByTestId('Popup')
      // console.log('it is impty when is not opened, result ->', result)
      // screen.debug()
    })

    test('it should exist and has all buttons and icons', async () => {
      const actualProps = { ...testProps, isOpened: true, saveDisabled: true }
      await waitFor(() => {
        // state = store.getState()
        // console.log('second test, state ->', state)
        render(
          <Provider store={store}>
            {/* <ParagraphContextMenu {...testProps} /> */}
            <ParagraphContextMenu {...actualProps} />
          </Provider>
        )
        // expect(store.getState()).toEqual(storeBefore);
        // console.log('state ->', store.getState())
      })
      expect(screen.findByTestId('Popup')).not.toBe(null)

      const editButton = screen.getByRole('button', { name: '1stLevel.editElement' })
      expect(editButton).toBeVisible()
      expect(editButton).toBeEnabled()
      expect(editButton).toHaveClass('ui button')
      expect(editButton.children[0]).toHaveClass('teal edit icon')

      const saveButton = screen.getByRole('button', { name: '1stLevel.saveElement' })
      expect(saveButton).toBeVisible()
      expect(saveButton).toBeDisabled()
      expect(saveButton).toHaveClass('ui button')
      expect(saveButton.children[0]).toHaveClass('orange save icon')

      const aboveButton = screen.getByRole('button', { name: '1stLevel.addAbove' })
      expect(aboveButton).toBeVisible()
      expect(aboveButton).toBeEnabled()
      expect(aboveButton).toHaveClass('ui button')
      expect(aboveButton.children[0]).toHaveClass('olive angle double up icon')

      const addBelowButton = screen.getByRole('button', { name: '1stLevel.addBelow' })
      expect(addBelowButton).toBeVisible()
      expect(addBelowButton).toBeEnabled()
      expect(addBelowButton).toHaveClass('ui button')
      expect(addBelowButton.children[0]).toHaveClass('olive angle double down icon')

      const deleteButton = screen.getByRole('button', { name: '1stLevel.deleteElement' })
      expect(deleteButton).toBeVisible()
      expect(deleteButton).toBeEnabled()
      expect(deleteButton).toHaveClass('ui button')
      expect(deleteButton.children[0]).toHaveClass('orange delete icon')

      // console.log('rendering, deleteButton ->', deleteButton.children[0].className)
      // screen.debug()
    })
  })
})
