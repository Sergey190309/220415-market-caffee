import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Menu } from 'semantic-ui-react';

import NavBarConnected, {
  NavBar,
} from '../../../components/navigation/NavBar';
import Logo from '../../../components/content/various/Logo';

describe('NavBar testing', () => {
  it('Snapshot', () => {
    const result = shallow(<NavBarConnected />);
    expect(result).toMatchSnapshot();
  });

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavBar />);
    // wrapper = shallow(<NavBar initActive='logo' />);
  });
  it('Rendering', () => {
    // console.log(wrapper);
    expect(wrapper.length).toBe(1);
  });

  it('Menu.Item quontity', () => {
    expect(wrapper.find(Menu.Item).length).toBe(5);
  });

  it('become active item after click', () => {
    const menuItems = wrapper.find(Menu.Item);
    menuItems.at(0).simulate('click', {}, {props: { name: 'logo' }});
    // console.log(toJson(wrapper));
    // console.log(wrapper.prop('activeItem'));

    // expect(toJson(wrapper)).toMatchSnapshot();
    // expect(wrapper.find(Menu.Item).length).toBe(5);
  });
});
