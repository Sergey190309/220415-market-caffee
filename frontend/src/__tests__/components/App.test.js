import React from 'react';
import { shallow } from 'enzyme';
// import { create } from 'react-test-renderer';
// import { Provider } from 'react-redux';

import { App } from '../../components/App';
// import store from '../../redux/store';

describe('App testing', () => {
  test('Snapshot', () => {
    const mockSetDeviceSize = jest.fn();
    const wrapper = shallow(<App setDeviceSize={mockSetDeviceSize} />);
    expect(wrapper).toMatchSnapshot();
  });
});
