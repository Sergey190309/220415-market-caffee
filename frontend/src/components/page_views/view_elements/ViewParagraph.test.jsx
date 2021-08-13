import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'

import ViewParagraph from './ViewParagraph'
import store from '../../../redux/store'
import { resolveDataContent } from '../../../testAxiosConstants'
// import moduleName from '../../../api/calls/getViewContent'

jest.mock('../../../api/calls/getViewContent')

describe('ViewParagraph testing', () => {
  const testProps = {
    recordId: 'mockRecordId',
    viewName: 'mockViewName',
    lng: 'mockLng'
  }
  describe('actions', () => {
    test('should indicate proper values', async () => {
      await waitFor(() => {
        render(
          <Provider store={store}>
            <ViewParagraph {...testProps} />
          </Provider>
        )
      })
      const result = screen.getByTestId('Message')
      expect(result.children).toHaveLength(5)
      expect(result.children[0]).toHaveTextContent(resolveDataContent.payload.title)
      expect(result.children[1]).toHaveClass('ui divider')

      expect(result.children[2]).toHaveTextContent(resolveDataContent.payload.content[0])
      expect(result.children[3]).toHaveTextContent(resolveDataContent.payload.content[1])
      expect(result.children[4]).toHaveTextContent(resolveDataContent.payload.content[2])
      // screen.debug()
    })
  })

  test('should indicate proper values, no title', async () => {
    const actualProps = {
      ...testProps,
      recordId: 'mockNoTitle'
    }
    await waitFor(() => {
      render(
        <Provider store={store}>
          <ViewParagraph {...actualProps} />
        </Provider>
      )
    })
    const result = screen.getByTestId('Message')
    expect(result.children).toHaveLength(4)
    // expect(result.children[0]).toHaveTextContent(resolveDataContent.payload.title)
    // expect(result.children[1]).toHaveClass('ui divider')

    expect(result.children[0]).toBeEmptyDOMElement()
    expect(result.children[1]).toHaveTextContent(resolveDataContent.payload.content[0])
    expect(result.children[2]).toHaveTextContent(resolveDataContent.payload.content[1])
    expect(result.children[3]).toHaveTextContent(resolveDataContent.payload.content[2])
    // screen.debug()
  })

  test('should indicate proper values, no content', async () => {
    const actualProps = {
      ...testProps,
      recordId: 'mockNoContent'
    }
    await waitFor(() => {
      render(
        <Provider store={store}>
          <ViewParagraph {...actualProps} />
        </Provider>
      )
    })
    const result = screen.getByTestId('Message')
    expect(result.children).toHaveLength(1)
    expect(result.children[0]).toHaveTextContent(resolveDataContent.payload.title)
    // screen.debug()
  })
  describe('appeance', () => {
    test('rendering (shapshot)', async () => {
      await waitFor(() => {
        render(
          <Provider store={store}>
            <ViewParagraph {...testProps} />
          </Provider>
        )
      })
      const result = screen.getByTestId('Message')
      // console.log('ViewParagraph testing, appeance, result ->', result)
      expect(result).toMatchSnapshot()
      // screen.debug()
    })
  })
})
