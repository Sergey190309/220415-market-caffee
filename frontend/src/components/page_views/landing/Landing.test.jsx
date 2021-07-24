import React from 'react';
// import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '../../../testUtils';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import { Landing } from './Landing';
import { structureSuccess } from '../../../redux/slices';
import { structures } from '../../../testConstants';
// import { landingPageStructure } from '../../../testConstants';
import { ElementSwitcher } from '../view_elements/ElementSwitcher';

jest.mock('../view_elements/ElementSwitcher');
// jest.mock('../view_elements/ElementSwitcher', () => ({
// __esModule: true,
//   default: jest.fn(),
// }));

describe('Landing page testing', () => {
  // let ElementSwitcherSpy;
  beforeEach(() => {
    jest.resetAllMocks();
    // ElementSwitcherSpy = jest.spyOn(ElementSwitcher, 'ElementSwitcher');
  });

  // const testProps = {
  //   getLoadedStructure: (pageName, structures) => ('getLoadedStructure')
  // };

  test('it should exist and rendered (snapshot)', () => {
    const result = render(
      <Provider store={store}>
        <Landing />
      </Provider>
    );
    expect(result).toMatchSnapshot();
  });
  describe('appearance, rendering child with proper props', () => {
    // const keys = Object.keys(testProps['loadedStructure']);

    test.only('rendering with props (structure)', () => {
      // const expArgs = {structure: loadedStructure, lng, viewName: 'landing'}
      store.dispatch(structureSuccess(structures));

      render(
        <Provider store={store}>
          <Landing />
        </Provider>
      );
      // expect(ElementSwitcher).toHaveBeenCalledTimes(1);
      console.log('Landing page testing, ElementSwitcher ->', ElementSwitcher.mock.calls[0][0]);
      // expect(ElementSwitcher.mock.calls[0][0]).toEqual(expArgs);

      // const LandingSegment = screen.getByTestId('LandingSegment');
      // expect(LandingSegment).not.toBeEmptyDOMElement()
      // expect(LandingSegment).toHaveClass('segment');

      screen.debug();
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
