import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Container, Popup } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import Logo from '../page_views/various/Logo';
import NavItem from './nav_item/NavItem';
import SignInOut from '../items/LogInOut';
import Language from '../items/Language';
// import { swapiGetter } from '../../api/calls/study';

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
  isAdmin,
  logOutAction,
  // alertActions,
}) => {
  const [activeItem, setActiveItem] = useState(initActive);
  let history = useHistory();

  // const [showRemark, setShowRemark] = useState(false);
  const { t } = useTranslation('navbar');

  const color = 'teal';

  const _ClickHandler = async (e, { name }) => {
    // console.log('NavBar _ClickHandler, name ->', name);
    // console.log('NavBar _ClickHandler, alert ->', alert);
    // alertActions({ message: 'alert', alertType: 'info', timeout: 3000 });
    clickHandler(name, setActiveItem, setModalOpened, isAuthenticated, logOutAction);
    // console.log(await swapiGetter(1));
    history.push('/');
  };

  // console.log('NavBar -', isAuthenticated);
  return (
    <Container>
      <Menu color={color} secondary size='small'>
        <Menu.Item
          as={Link}
          to='/'
          name='logo'
          active={activeItem === 'logo'}
          onClick={_ClickHandler}>
          <Logo color={color} />
        </Menu.Item>
        <Menu.Menu position='left'>
          <Menu.Item
            // disabled
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
          <Popup
            trigger={
              <Menu.Item
                as={isAuthenticated ? Link : null}
                to='/private'
                name='private'
                active={activeItem === 'private'}
                onClick={_ClickHandler}>
                <NavItem
                  name='private'
                  title={t('forFriends')}
                  disabled={!isAuthenticated}
                />
              </Menu.Item>
            }
            on='hover'
            position='top center'
            disabled={isAuthenticated === undefined ? false : isAuthenticated}
            content={t('plsLogIn')}
          />
          <Menu.Item
            as={isAdmin ? Link : null}
            to='/admin'
            name='admin'
            active={activeItem === 'admin'}
            onClick={_ClickHandler}>
            <NavItem
              name='admin'
              title={t('forAdmins')}
              visible={isAdmin === undefined ? false : isAdmin}
            />
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
  isAuthenticated: false,
  isAdmin: false,
  logOutAction: logOutAction,
  // alertActions: alertActions,
};

NavBar.propTypes = {
  initActive: PropTypes.string.isRequired,
  setModalOpened: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  logOutAction: PropTypes.func.isRequired,
  // alertActions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.logIn.isAuthenticated,
  isAdmin: state.logIn.isAdmin,
});

const mapDispatchToProps = dispatch => ({
  // alertActions: alertData => dispatch(alertActions(alertData)),
  setModalOpened: kindOfModal => dispatch(setModalOpened(kindOfModal)),
  logOutAction: () => dispatch(logOutAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
