import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import { setModalOpened } from '../../redux/actions';

export const clickHandler = (name, setActiveItem, setModalOpened) => {
  if (!(name === 'signInOut' || name === 'language')) {
    // to avoid making above fitures active after click on
    setActiveItem(name);
  }
  if (name === 'signInOut') {
    setModalOpened('LogIn');
    // console.log('LogIn')
  }
};

export const NavBar = ({ initActive, setModalOpened, clickHandler }) => {
  const [activeItem, setActiveItem] = useState(initActive);

  const color = 'teal';

  const _ClickHandler = (e, { name }) => {
    // console.log(name)
    clickHandler(name, setActiveItem, setModalOpened);
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
          onClick={_ClickHandler}>
          <Logo color={color} />
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item
            as={Link}
            to='/pricelist'
            name='priceList'
            active={activeItem === 'priceList'}
            onClick={_ClickHandler}>
            <NavItem name='priceList' title='Menu' />
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/pictures'
            name='pictures'
            active={activeItem === 'pictures'}
            onClick={_ClickHandler}>
            <NavItem name='pictures' title='Gallery' />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item
            // as={Link}
            // to='/signinout'
            name='signInOut'
            active={false}
            // active={activeItem === 'signInOut'}
            onClick={_ClickHandler}>
            <SignInOut />
          </Menu.Item>
          <Menu.Item
            name='language'
            active={false}
            // active={activeItem === 'language'}
            onClick={_ClickHandler}>
            <Language />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

NavBar.defaultProps = {
  initActive: '',
  setModalOpened: () => {},
  clickHandler: clickHandler,
};

NavBar.propTypes = {
  initActive: PropTypes.string.isRequired,
  setModalOpened: PropTypes.func.isRequired,
};

export default connect(null, { setModalOpened })(NavBar);
