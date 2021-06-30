import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '../../../testUtils'
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';

import { Landing } from './Landing';

describe('Landing page testing', () => {
  const testProps = {
    structureLoaded: true,
    loadedStructure: {
      '00': { type: "header" },
      '01': {qnt: 3, type: "vblock", subtype: "txt"},
      '02': {qnt: 2, type: "hblock", subtype: "pix"},
      '03': {qnt: 2, type: "vblock", subtype: "pix"},
      '04': {type: "footer"}
    },
    lng: 'ru'
  }
  test.skip('it should exist and rendered (snapshot)', () => {
    const renderer = new ShallowRenderer()
    // console.log('Landing page testing, testProps ->', testProps)
    renderer.render(<Landing {...testProps} />)
    const result = renderer.getRenderOutput()
    // expect(result.type).toBe();
    expect(result).toMatchSnapshot();
    // render(<Landing {...testProps} />)
  });
  describe('appeance', () => {
    test('rendering', () => {
      render(<Landing />)
      // screen.debug()
    })

  });
});
