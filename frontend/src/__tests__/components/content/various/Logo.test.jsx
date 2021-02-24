import React from 'react';
import { shallow } from 'enzyme';

import Logo from '../../../../components/content/various/Logo';

describe('Logo testing', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Logo />)
  })

  it('is shapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})
