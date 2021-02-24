import React from 'react';
import { shallow } from 'enzyme';
import Landing from '../../../../components/content/landing/Landing';

describe('Landing testing', () => {
  test('Snapshot', () => {
    expect(shallow(<Landing />)).toMatchSnapshot();
  });
});
