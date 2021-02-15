import React from 'react';

// import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer'

import App from '../../../../src/components/App'
// import NavItem from '../../../../src/components/navigation/nav_items/NavItem';

describe('NavItem testing', () => {
  // const renderer = new ShallowRenderer();
  // renderer.render(<NavItem />);
  // const result = renderer.getRenderOutput();
  test('Snapshot', () => {
    const result = renderer.create(<App />).toJSON();
    console.log(result);
    // expect(result.length).toMatchSnapshot();
  });
});
