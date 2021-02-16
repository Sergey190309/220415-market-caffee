import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import App from '../../components/App';

describe('Testing App', () => {
  test('Render without crashing', () => {
    shallow(<App />);
  });

  test('Snapshot', () => {
    const tree = create(<App />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
