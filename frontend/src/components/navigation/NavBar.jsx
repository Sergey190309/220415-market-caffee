import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'
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
import NavItem from './nav_item/NavItem';
import SignInOut from '../items/LogInOut';
import Language from '../items/Language';
import { setModalOpened } from '../../redux/actions/index';

export const NavBar = props => {
  const { initActive: propsInitActive, setModalOpened } = props;
  const [activeItem, setActiveItem] = useState(propsInitActive || '');

  const color = 'teal';

  const clickHandler = (e, { name }) => {
    // e.preventDefault();
    setActiveItem(name);
    if (name === 'signInOut') {
      // console.log(name);
      setModalOpened();
    }
    // mockClickHandler
  };

  return (
    <Container>
      <Menu
        // inverted
        color={color}
        secondary
        size='small'>
        <Menu.Item
          // id='logo'
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
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item
            // as={Link}
            // to='/signinout'
            name='signInOut'
            active={activeItem === 'signInOut'}
            onClick={clickHandler}>
            <SignInOut />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/'
            name='language'
            active={activeItem === 'language'}
            onClick={clickHandler}>
            <Language />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default connect(null, { setModalOpened })(NavBar);
