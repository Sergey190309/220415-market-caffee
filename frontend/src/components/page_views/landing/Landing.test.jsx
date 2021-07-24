import React from 'react';
// import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '../../../testUtils';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import Landing, { getLoadedStructure } from './Landing';
import { structureSuccess } from '../../../redux/slices';
import { structures } from '../../../testConstants';
// import { landingPageStructure } from '../../../testConstants';
// import { ElementSwitcher } from '../view_elements/ElementSwitcher';

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

  describe('Pure function testing', () => {
    test.only('getLoadedStructure testing, page view name is correct', () => {
      const pageViewNames = structures.map(item=>Object.keys(item)[0])
      pageViewNames.forEach(item => {
        // const result = getLoadedStructure(item, structures)
        console.log('Landing getLoadedStructure testing, result ->', result)
      })
    })

  });
  test('it should exist and rendered (snapshot)', () => {
    store.dispatch(structureSuccess(structures));
    const {container} = render(
      <Provider store={store}>
        <Landing />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  describe('appearance, rendering child with proper props', () => {
    // const keys = Object.keys(testProps['loadedStructure']);

    test('rendering with props (structure)', () => {
      // const expArgs = {structure: loadedStructure, lng, viewName: 'landing'}
      store.dispatch(structureSuccess(structures));

      render(
        <Provider store={store}>
          <Landing />
        </Provider>
      );
      // expect(ElementSwitcher).toHaveBeenCalledTimes(1);
      // console.log('Landing page testing, ElementSwitcher ->', ElementSwitcher.mock.calls[0][0]);
      // expect(ElementSwitcher.mock.calls[0][0]).toEqual(expArgs);

      // const LandingSegment = screen.getByTestId('LandingSegment');
      // expect(LandingSegment).not.toBeEmptyDOMElement()
      // expect(LandingSegment).toHaveClass('segment');

      // screen.debug();
    });

    test('rendering witout props (structure)', () => {
      render(
        <Provider store={store}>
          <Landing />
        </Provider>
      );
      const landingContainer = screen.getByTestId('LandingContainer');
      expect(landingContainer).toHaveClass('container');

      const LandingSegment = screen.getByTestId('LandingSegment');
      // expect(LandingSegment).toBeEmptyDOMElement();
      expect(LandingSegment).toHaveClass('segment');
      // console.log('landing page testing, LandingSegment ->', LandingSegment)
    });
  });
});
