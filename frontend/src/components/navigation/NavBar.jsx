import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu, Container, Popup } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
// import i18next from 'i18next';

import Logo from '../page_views/various/Logo'
import NavItem from './nav_item/NavItem'
import SignInOut from '../items/LogInOut'
import Language from '../items/Language'

import { positiveColor } from '../../utils/colors'
// import { swapiGetter } from '../../api/calls/study';

import { logOut, openModal, authSelector, lngSelector, setEditable } from '../../redux/slices'
// import { l_ogOutAction } from '../../redux/actions';

export const clickHandler = (
  name,
  dispatch,
  setActiveItem,
  openModal,
  isLoggedIn,
  logOut
  // l_ogOutAction,
) => {
  if (!(name === 'signInOut' || name === 'language')) {
    // to avoid making above fitures active after click on
    setActiveItem(name)
  }
  if (name === 'signInOut') {
    if (isLoggedIn) {
      dispatch(logOut())
      dispatch(setEditable(false))
      // l_ogOutAction();
    } else {
      // console.log('NavBar, clickHandler, setModal')
      dispatch(openModal('logIn'))
    }
  }
}

export const NavBar = ({
  initActive,
  openModal,
  clickHandler,
  logOut
}) => {
  const [activeItem, setActiveItem] = useState(initActive)

  const dispatch = useDispatch()
  const { isAdmin, isLoggedIn } = useSelector(authSelector)
  const { lng } = useSelector(lngSelector)
  const history = useHistory()

  const { t, i18n } = useTranslation('navbar')

  useEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng)
    }
    // console.log('Component, NavBar, useEffect, lng ->', lng )
    // console.log('Component, NavBar, useEffect, i18next.language ->', i18next.language )
  }, [lng, i18n])
  // const [showRemark, setShowRemark] = useState(false);
  // console.log('Component, NavBar, t ->', t )

  const color = positiveColor

  const _ClickHandler = (e, { name }) => {
    // console.log('NavBar _ClickHandler, name ->', name);
    clickHandler(
      name,
      dispatch,
      setActiveItem,
      openModal,
      isLoggedIn,
      logOut
    )
    history.push('/')
  }

  // console.log('NavBar -', isAuthenticated);
  return (
    <Container>
      <Menu color={color} secondary size='small'
        // fixed='top'
      >
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
                as={isLoggedIn ? Link : null}
                to='/private'
                name='private'
                active={activeItem === 'private'}
                onClick={_ClickHandler}>
                <NavItem name='private' title={t('forFriends')} disabled={!isLoggedIn} />
              </Menu.Item>
            }
            on='hover'
            position='top center'
            disabled={isLoggedIn === undefined ? false : isLoggedIn}
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
            <SignInOut title={isLoggedIn ? t('logOut') : t('logIn')} />
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
  )
}

NavBar.defaultProps = {
  initActive: '',
  openModal: openModal,
  clickHandler: clickHandler,
  // isLoggedIn: false,
  // isAdmin: false,
  logOut: logOut
  // l_ogOutAction: l_ogOutAction,
  // alertActions: alertActions,
}

NavBar.propTypes = {
  initActive: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool.isRequired,
  // isAdmin: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired
  // l_ogOutAction: PropTypes.func.isRequired,
  // alertActions: PropTypes.func.isRequired,
}

export default NavBar
