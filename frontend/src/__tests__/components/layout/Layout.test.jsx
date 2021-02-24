// It does NOT work!

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Layout } from '../../../components/layout/Layout';
// import SideBar from '../../../components/navigation/SideBar';
// import NavBar from '../../../components/navigation/NavBar';

describe('Layout testing', () => {
  let wrapper;
  const mockLayout = { deviceSize: 'medium' };
  beforeEach(() => {
    wrapper = shallow(<Layout layout={mockLayout} />);
  });

  it('should render SideBar if device size is small', () => {
    // console.log(wrapper.prop('children'));

    // console.log(toJSON(wrapper));
    // expect(wrapper).toContain(<SideBar />);
  });
});
