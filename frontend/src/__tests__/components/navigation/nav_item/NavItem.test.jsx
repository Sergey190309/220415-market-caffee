import React from 'react';
import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
// import { Header } from 'semantic-ui-react';

import NavItem from '../../../../components/navigation/nav_item/NavItem';
import Item from '../../../../components/items/Item';

describe('NavItem testing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavItem title='title' />);
  });

  it('is snapshot', () => {
    // wrapper.setProps({title: 'some title'})
    expect(wrapper).toMatchSnapshot();
  });

  it('should have title in component', () => {
    // const result = wrapper.find(Item).prop('title')
    const title = 'testing title';
    wrapper.setProps({ title: title });
    expect(wrapper.find(Item).prop('title')).toBe(title);
  });

  it('should contain Item', () => {
    const title = 'title';
    expect(
      wrapper.contains(
        <Item kindId='nav_item' title={title} />
      )
    ).toBeTruthy();
  });
  // console.log(result);
  // console.log(toJson(result));
  // console.log(toJson(wrapper));
});
