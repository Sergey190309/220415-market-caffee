import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  // Segment,
  Container,
  // Button,
} from 'semantic-ui-react';

import Logo from "../nav_items/Logo";
// import Language from "../nav_items/Language";
import NavItem from '../nav_items/NavItem';

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('test1');

  const color='teal'

  const clickHandler = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Container>
      <Menu
        // inverted
        color={color}
        secondary
        size='small'>
        <Menu.Item>
          <Logo color={color} />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/'
          name='test1'
          active={activeItem === 'test1'}
          onClick={clickHandler}
        />
        <Menu.Item
          as={Link}
          to='/'
          name='test2'
          active={activeItem === 'test2'}
          onClick={clickHandler}>
          <NavItem name='home' title='Home' />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/pricelist'
          name='priceList'
          active={activeItem === 'priceList'}
          onClick={clickHandler}>
          <NavItem name='priceList' title='Menu' />
        </Menu.Item>

        <Menu.Item
          as={Link}
          to='/pictures'
          name='pictures'
          active={activeItem === 'pictures'}
          onClick={clickHandler}>
          <NavItem name='pictures' title='Gallery' />
        </Menu.Item>

        {/* <Menu.Menu position="right">
          <Menu.Item name="language" color='yellow'>
            <Link to="#">
              <Language />
            </Link>
          </Menu.Item>
        </Menu.Menu> */}
      </Menu>
    </Container>
  );
};

export default NavBar;
