import React from 'react';
import { render } from '@testing-library/react'
import ViewParagraph from '../ViewParagraph';

describe('ParagraphEditor testing', () => {
  const testProps = {
    isOpened: false,
    saveDisabled: false,
    context: false,
    setContextMenuOpened: jest.fn(),
    setParagraphEditted: jest.fn()
  }
  test('it should exist and can be rendered (stapshot)', () => {
    render(<ViewParagraph {...testProps} />)
    screen.debug()
  })
});