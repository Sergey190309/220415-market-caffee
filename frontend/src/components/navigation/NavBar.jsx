import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  // Segment,
  Container,
  // Button,
  // Header,
} from 'semantic-ui-react';

import Logo from '../content/various/Logo';
// import Language from "../nav_items/Language";
// import Item from '../items/Item';
import NavItem from './nav_items/NavItem'
import SignInOut from '../items/SignInOut';
import Language from '../items/Language'

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('');

  const color = 'teal';

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
        <Menu.Item
          as={Link}
          to='/'
          name='logo'
          active={activeItem === 'logo'}
          onClick={clickHandler}>
          <Logo color={color} />
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item
            as={Link}
            to='/pricelist'
            name='priceList'
            active={activeItem === 'priceList'}
            onClick={clickHandler}
          >
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
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item>
            <SignInOut />
          </Menu.Item>
          <Menu.Item>
            <Language />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default NavBar;
