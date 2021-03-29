import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Menu,
  Container,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import Logo from '../content/various/Logo';
import NavItem from './nav_item/NavItem';
import SignInOut from '../items/LogInOut';
import Language from '../items/Language';

import { setModalOpened, logOutAction } from '../../redux/actions';

export const clickHandler = (
  name,
  setActiveItem,
  setModalOpened,
  isAuthenticated,
  logOutAction
) => {
  if (!(name === 'signInOut' || name === 'language')) {
    // to avoid making above fitures active after click on
    setActiveItem(name);
  }
  if (name === 'signInOut') {
    if (isAuthenticated) {
      logOutAction();
    } else {
      setModalOpened('logIn');
    }
  }
};

export const NavBar = ({
  initActive,
  setModalOpened,
  clickHandler,
  isAuthenticated,
  logOutAction,
}) => {
  const [activeItem, setActiveItem] = useState(initActive);

  const { t } = useTranslation('navbar');

  const color = 'teal';

  const _ClickHandler = (e, { name }) => {
    clickHandler(name, setActiveItem, setModalOpened, isAuthenticated, logOutAction);
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
            <NavItem name='priceList' title={t('menu')} />
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/pictures'
            name='pictures'
            active={activeItem === 'pictures'}
            onClick={_ClickHandler}>
            <NavItem name='pictures' title={t('gallery')} />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item name='signInOut' active={false} onClick={_ClickHandler}>
            <SignInOut title={isAuthenticated ? t('logOut') : t('logIn')} />
          </Menu.Item>
          <Menu.Item
            data-testid='lngSwitcher'
            name='language'
            active={false}
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
  logOutAction: logOutAction,
};

NavBar.propTypes = {
  initActive: PropTypes.string.isRequired,
  setModalOpened: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
  logOutAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.logIn.isAuthenticated,
});

export default connect(mapStateToProps, { setModalOpened, logOutAction })(NavBar);
