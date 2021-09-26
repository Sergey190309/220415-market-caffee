import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import store from '../../../../redux/store'
import EditorContextMenu from './EditorContextMenu'

describe('EditorContextMenu testing', () => {
  const testProps = {
    isOpened: false,
    saveDisabled: true,
    context: {},
    setContextMenuOpened: jest.fn(),
    contextMenuAction: jest.fn()
  }

  describe('component actions', () => {
    test('save button enabled', async () => {
      const actualProps = { ...testProps, isOpened: true, saveDisabled: false }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <EditorContextMenu {...actualProps} />
          </Provider>
        )
      })
      const saveButton = screen.getByRole('button', { name: '2LEEdit.save' })
      expect(saveButton).toBeEnabled()
      // screen.debug()
    })

    test('save button clicked actions', async () => {
      const actualProps = { ...testProps, isOpened: true, saveDisabled: false }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <EditorContextMenu {...actualProps} />
          </Provider>
        )
      })
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      const saveButton = screen.getByRole('button', { name: '2LEEdit.save' })
      userEvent.click(saveButton)
      expect(actualProps.contextMenuAction).toHaveBeenCalledTimes(1)
      expect(actualProps.contextMenuAction).toHaveBeenCalledWith('save')
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
      expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
    test('back button clicked actions', async () => {
      const actualProps = { ...testProps, isOpened: true, saveDisabled: false }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <EditorContextMenu {...actualProps} />
          </Provider>
        )
      })
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      const backButton = screen.getByRole('button', { name: '2LEEdit.back' })
      userEvent.click(backButton)
      expect(actualProps.contextMenuAction).toHaveBeenCalledTimes(1)
      expect(actualProps.contextMenuAction).toHaveBeenCalledWith('back')
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
      expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
    test('cancel button clicked actions', async () => {
      const actualProps = { ...testProps, isOpened: true, saveDisabled: false }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <EditorContextMenu {...actualProps} />
          </Provider>
        )
      })
      expect(screen.queryByTestId('Popup')).not.toBe(null)
      const cancelButton = screen.getByRole('button', { name: '2LEEdit.cancel' })
      userEvent.click(cancelButton)
      expect(actualProps.contextMenuAction).toHaveBeenCalledTimes(1)
      expect(actualProps.contextMenuAction).toHaveBeenCalledWith('cancel')
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledTimes(1)
      expect(actualProps.setContextMenuOpened).toHaveBeenCalledWith(false)
      expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
  })

  describe('Apeance', () => {
    test('popup does not exist when is not opened', async () => {
      await waitFor(() => {
        render(
          <Provider store={store}>
            <EditorContextMenu {...testProps} />
          </Provider>
        )
      })
      expect(screen.queryByTestId('Popup')).toBe(null)
      // screen.debug()
    })
    test('it should exist and has all buttons and icons', async () => {
      const actualProps = { ...testProps, isOpened: true }
      await waitFor(() => {
        render(
          <Provider store={store}>
            <EditorContextMenu {...actualProps} />
          </Provider>
        )
      })
      expect(screen.findByTestId('Popup')).not.toBe(null)

      const saveButton = screen.getByRole('button', { name: '2LEEdit.save' })
      expect(saveButton).toBeVisible()
      expect(saveButton).toBeDisabled()
      expect(saveButton).toHaveClass('ui button')
      expect(saveButton.children[0]).toHaveClass('teal save icon')

      const backButton = screen.getByRole('button', { name: '2LEEdit.back' })
      expect(backButton).toBeVisible()
      expect(backButton).toBeEnabled()
      expect(backButton).toHaveClass('ui button')
      expect(backButton.children[0]).toHaveClass('olive angle left icon')

      const cancelButton = screen.getByRole('button', { name: '2LEEdit.cancel' })
      expect(cancelButton).toBeVisible()
      expect(cancelButton).toBeEnabled()
      expect(cancelButton).toHaveClass('ui button')
      expect(cancelButton.children[0]).toHaveClass('orange cancel icon')

      // screen.debug()
    })
  })
})
