import React from 'react';
// import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '../../../testUtils';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';

import { Landing } from './Landing';

jest.mock('../view_elements/ElementSwitcher');


export const structure = {
  '00': { type: 'header' },
  '01': { qnt: 3, type: 'vblock', subtype: 'txt' },
  '02': { qnt: 2, type: 'hblock', subtype: 'pix' },
  '03': { qnt: 2, type: 'vblock', subtype: 'pix' },
  '04': { type: 'footer' },
}
describe('Landing page testing', () => {
const testProps = {
    structureLoaded: true,
    loadedStructure: structure,
    lng: 'en',
  };

  test('it should exist and rendered (snapshot)', () => {
    const result = render(<Landing {...testProps} />);
    expect(result).toMatchSnapshot();
  });
  describe('appearance', () => {
    const keys = Object.keys(testProps['loadedStructure']);
    test('rendering with props (structure)', () => {
      render(<Landing {...testProps} />);
      // const { container } = render(<Landing {...testProps} />);
      // const havingType = screen.toHaveTextContent('ElementSwitcher');
      // console.log('landing page testing, keys ->', keys);
      keys.map(key => {
        const element = screen.getByTestId(key);
        const searchingText = Object.entries(testProps['loadedStructure'][key])[0].join(
          ''
        );
        expect(element).toHaveTextContent(searchingText);
        return '';
      });
      const LandingSegment = screen.getByTestId('LandingSegment');
      expect(LandingSegment).toHaveTextContent(`landing${testProps.lng}`);
      expect(LandingSegment).toHaveTextContent('ElementSwitcher');

      // screen.debug();
    });

    test('rendering witout props (structure)', () => {
      render(<Landing />);
      const landingContainer = screen.getByTestId('LandingContainer');
      expect(landingContainer).toHaveClass('container');

      const LandingSegment = screen.getByTestId('LandingSegment');
      expect(LandingSegment).toBeEmptyDOMElement();
      expect(LandingSegment).toHaveClass('segment');
      // console.log('landing page testing, LandingSegment ->', LandingSegment)

    });
  });
});
