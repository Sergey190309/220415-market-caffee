import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '../../../testUtils/modifiedRenderReactTesting';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { Landing } from './Landing';

describe('Landing page testing', () => {
  const testProps = {
    lng: 'ru'
  }
  test('it should exist and rendered', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<Landing {...testProps} />)
    const result = renderer.getRenderOutput()
    // expect(result.type).toBe();
    expect(result).toMatchSnapshot();
    // render(<Landing {...testProps} />)
  });
  describe('appeance', () => {
  });
});
