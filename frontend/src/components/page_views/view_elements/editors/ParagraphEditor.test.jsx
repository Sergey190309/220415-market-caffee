/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import store from '../../../../redux/store'

import ParagraphEditor from './ParagraphEditor'
// import EditorContextMenu from './EditorContextMenu'

const mockEditorContextMenu = jest.fn()

jest.mock('./EditorContextMenu', () => props => {
  mockEditorContextMenu(props)
  return <div data-testid='mockEditorContextMenu' />
  // return <mock-editorContextMenu />
})

describe('ParagraphEditor', () => {
  beforeEach(() => {
    // EditorContextMenu.mockImplementation(MockEditorContextMenu)
  })
  const testProps = {
    comingContent: {
      title: 'mockTitle',
      content: ['mockContent first paragraph', 'second paragraph', 'third one']
    },
    setParagraphEditted: jest.fn(),
    setComimgContent: jest.fn()
  }
  describe('appeance', () => {
    test('rendering (snapshot)', async () => {
      // await waitFor(() => {
      render(
        <Provider store={store}>
          <ParagraphEditor {...testProps} />
        </Provider>
      )
      // })
      const segment = await screen.findByTestId('Segment')
      expect(segment).toMatchSnapshot()
      // screen.debug()
    })
  })
  describe('Actions', () => {
    it('should contain proper values', () => {
      render(
        <Provider store={store}>
          <ParagraphEditor {...testProps} />
        </Provider>
      )
      const textAreas = screen.getAllByRole('textbox')
      expect(textAreas).toHaveLength(2)
      expect(textAreas[0]).toHaveValue(testProps.comingContent.title)
      expect(textAreas[1]).toHaveValue(testProps.comingContent.content.join('\n'))

      // screen.debug()
    })
    it('text areas user input', () => {
      render(
        <Provider store={store}>
          <ParagraphEditor {...testProps} />
        </Provider>
      )
      const titleInput = 'Test value'
      const titleTextArea = screen.getAllByRole('textbox')[0]
      userEvent.clear(titleTextArea)
      userEvent.type(titleTextArea, titleInput)
      expect(titleTextArea).toHaveValue(titleInput)

      const contentInput = 'first{enter}second{enter}third'
      const expContentInput = contentInput.split('{enter}').join('\n')
      const contentTextArea = screen.getAllByRole('textbox')[1]
      userEvent.clear(contentTextArea)
      userEvent.type(contentTextArea, contentInput)
      expect(contentTextArea).toHaveValue(expContentInput)
    })
    it('right click -> context menu with appropriate args', () => {
      render(
        <Provider store={store}>
          <ParagraphEditor {...testProps} />
        </Provider>
      )
      const element = screen.getByTestId('Segment')
      // expect(EditorContextMenu.isOpened).toBeTruthy()
      userEvent.click(element, { button: 2 })
      const args = mockEditorContextMenu.mock.calls[mockEditorContextMenu.mock.calls.length - 1][0]
      expect(args.isOpened).toBeTruthy()
      expect(args.saveDisabled).toBeTruthy()
      expect(args.context).toBeObject()
      expect(args.setContextMenuOpened).toBeFunction()
      expect(args.contextMenuAction).toBeFunction()
      // console.log('EditorContextMenu, args ->', args)
      // expect(EditorContextMenu.isOpened).toBeFalsy()
      // screen.debug()
    })
  })
})
