/* eslint-disable react/prop-types */
import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import store from '../../../../redux/store'

import ParagraphEditor from './ParagraphEditor'
import EditorContextMenu from './EditorContextMenu'
// import testUtils from 'react-dom/test-utils'

const MockEditorContextMenu = ({
  isOpened,
  context,
  setContextMenuOpened,
  contextMenuAction
}) => (
  <div data-testid='EditorContextMenu'>
    EditorContextMenu
    {JSON.stringify(isOpened)}
    {JSON.stringify(context)}
    {JSON.stringify(setContextMenuOpened)}
    {JSON.stringify(contextMenuAction)}
  </div>
)
jest.mock('./EditorContextMenu', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe('ParagraphEditor', () => {
  beforeEach(() => {
    EditorContextMenu.mockImplementation(MockEditorContextMenu)
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

      screen.debug()
    })
  })
})
