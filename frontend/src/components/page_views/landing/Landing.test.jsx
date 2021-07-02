import React from 'react';
// import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '../../../testUtils';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';

import { Landing } from './Landing';
import { landingPageStructure } from '../../../testContants';
import ElementSwitcher from '../view_elements/ElementSwitcher';

const mockElementSwitcher = ({ structure, viewName, lng }) => {
  return <div data-testid='ElementSwitcher' />;
};

jest.mock('../view_elements/ElementSwitcher', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Landing page testing', () => {
  beforeEach(() => {
    ElementSwitcher.mockImplementation(mockElementSwitcher);
  });

  const testProps = {
    structureLoaded: true,
    loadedStructure: landingPageStructure,
    lng: 'en',
  };

  test('it should exist and rendered (snapshot)', () => {
    const result = render(<Landing {...testProps} />);
    expect(result).toMatchSnapshot();
  });
  describe('appearance, rendering child with proper props', () => {
    // const keys = Object.keys(testProps['loadedStructure']);

    test('rendering with props (structure)', () => {
      const { loadedStructure, lng } = testProps
      const expArgs = {structure: loadedStructure, lng, viewName: 'landing'}
      render(<Landing {...testProps} />);
      expect(ElementSwitcher).toHaveBeenCalledTimes(1);
      // console.log('Landing page testing, testProps ->', testProps);
      expect(ElementSwitcher.mock.calls[0][0]).toEqual(expArgs);

      const LandingSegment = screen.getByTestId('LandingSegment');
      expect(LandingSegment).not.toBeEmptyDOMElement()
      expect(LandingSegment).toHaveClass('segment');

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
