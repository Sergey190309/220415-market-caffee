import React from 'react';
import { shallow } from 'enzyme';
import Pictures from '../../../../components/content/pictures/Pictures';

describe('Pictures testing', () => {
  test('Snapshot', () => {
    expect(shallow(<Pictures />)).toMatchSnapshot();
  });
});
