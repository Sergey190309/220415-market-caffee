/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
// import { Provider } from 'react-redux'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { testRender } from '../../../../tstHelpers'

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
      testRender(<ParagraphEditor {...testProps} />, { store: store })
      const segment = await screen.findByTestId('Segment')
      expect(segment).toMatchSnapshot()
      // screen.debug()
    })
  })
  describe('actions', () => {
    it('should contain proper values', () => {
      testRender(<ParagraphEditor {...testProps} />, { store: store })
      const textAreas = screen.getAllByRole('textbox')
      expect(textAreas).toHaveLength(2)
      expect(textAreas[0]).toHaveValue(testProps.comingContent.title)
      expect(textAreas[1]).toHaveValue(testProps.comingContent.content.join('\n'))

      // screen.debug()
    })
    it('text areas user input', () => {
      testRender(<ParagraphEditor {...testProps} />, { store: store })
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
      testRender(<ParagraphEditor {...testProps} />, { store: store })
      const element = screen.getByTestId('Segment')
      userEvent.click(element, { button: 2 })
      const args = mockEditorContextMenu.mock.calls[mockEditorContextMenu.mock.calls.length - 1][0]
      expect(args.isOpened).toBeTruthy()
      expect(args.saveDisabled).toBeTruthy()
      expect(args.context).toMatchObject({ current: {} })
      expect(args.setContextMenuOpened).toEqual(expect.any(Function))
      expect(args.contextMenuAction).toEqual(expect.any(Function))
      // console.log('EditorContextMenu, args.setContextMenuOpened ->',
      //   args.setContextMenuOpened)
    })
  })
})
