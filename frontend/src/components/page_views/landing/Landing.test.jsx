import React from 'react';
// import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '../../../testUtils';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import Landing, { getLoadedStructure } from './Landing';
import { lngSwitch, structureSuccess } from '../../../redux/slices';
import { structuresArr, structuresObj } from '../../../testConstants';
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

  test('it should exist and rendered (snapshot)', () => {
    store.dispatch(structureSuccess(structuresArr));
    const {container} = render(
      <Provider store={store}>
        <Landing />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  describe('Pure function testing', () => {
    test('getLoadedStructure testing, page view name is correct', () => {
      // const result = getLoadedStructure('admin', structuresObj)
      const pageViewNames = Object.keys(structuresObj)
      pageViewNames.forEach(item => {
        const result = getLoadedStructure(item, structuresObj)
        expect(result).toEqual(structuresObj[item]);
        console.log('Landing getLoadedStructure testing, item ->', item)
      })
    })
    test('getLoadedStructure testing, page view name is NOT correct', () => {
      // const result = getLoadedStructure('admin', structuresObj)
      const result = getLoadedStructure('wrongPageName', structuresObj)
      expect(result).toEqual({});
    })

  });
  describe('appearance, rendering child with proper props', () => {
    // const keys = Object.keys(testProps['loadedStructure']);

    test('rendering with props (structure)', () => {
      // const expArgs = {structure: loadedStructure, lng, viewName: 'landing'}
      const lng = 'llll'
      store.dispatch(structureSuccess(structuresArr));
      store.dispatch(lngSwitch(lng));

      render(
        <Provider store={store}>
          <Landing />
        </Provider>
      );
      const LandingSegment = screen.getByTestId('LandingSegment')
      const ElementSwitcher = screen.getByTestId('ElementSwitcher')
      expect(LandingSegment).not.toBeEmptyDOMElement()
      expect(ElementSwitcher).toHaveTextContent('ElementSwitcher')
      expect(ElementSwitcher).toHaveTextContent(JSON.stringify(structuresObj.landing))
      expect(ElementSwitcher).toHaveTextContent('landing')
      expect(ElementSwitcher).toHaveTextContent(lng)
    });

    test('rendering witout props (structure)', () => {
      store.dispatch(structure);
      render(
        <Provider store={store}>
          <Landing />
        </Provider>
      );
      const landingContainer = screen.getByTestId('LandingContainer');
      expect(landingContainer).toHaveClass('container');

      const LandingSegment = screen.getByTestId('LandingSegment');
      expect(LandingSegment).toBeEmptyDOMElement();
      expect(LandingSegment).toHaveClass('segment');
      // screen.debug();
});
  });
});
