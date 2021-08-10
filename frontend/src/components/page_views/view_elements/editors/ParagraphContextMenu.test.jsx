import React from 'react';
import { Provider } from 'react-redux';
// import renderer from 'react-test-renderer'
import { render, screen, waitFor } from '@testing-library/react'

import store from '../../../../redux/store'
import ParagraphContextMenu from './ParagraphContextMenu'
import { result } from 'lodash';
describe('ParagraphContextMenu testing', () => {
  const testProps = {
    isOpened: false,
    saveDisabled: false,
    context: {},
    setContextMenuOpened: jest.fn(),
    setParagraphEditted: jest.fn()
  }

  test('it is impty when is not opened', () => {
    const {container} = render(
      <Provider store={store}>
        <ParagraphContextMenu {...testProps} />
        {/* <ParagraphContextMenu {...actualProps} /> */}
      </Provider>
    )
    expect(container).toBeEmptyDOMElement()
    // console.log('it is impty when is not opened, container ->', container)
    // screen.debug()
  });

  test.only('it should exist and can be rendered', async () => {
    const actualProps = {...testProps, isOpened: true}
    await waitFor(() => {
      render(
        <Provider store={store}>
          <ParagraphContextMenu {...actualProps} />
        </Provider>
      )
    })
    // const popup = screen.findByTestId('Popup')
    // expect(popup).not.toBeEmptyDOMElement()
    // const editButton = screen.getByText('1stLevel.editElement')
    // expect(screen).toMatchSnapshot()
    // console.log('rendering, editButton ->', editButton)
    screen.debug()
  })

});