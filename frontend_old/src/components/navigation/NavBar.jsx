import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu, Container, Sticky } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import NavMenuLogo from '../items/menu_items/NavMenuLogo'
import NavMenuItem from '../items/menu_items/NavMenuItem'
import SignInOut from '../items/LogInOut'
import Language from '../items/Language'

import { positiveColor } from '../../utils/colors'

import {
  authSelector, lngSelector, backendUpdateSelector,
  logOut, openModal, setEditable
} from '../../redux/slices'

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
  context,
  openModal,
  clickHandler,
  logOut
}) => {
  const [activeItem, setActiveItem] = useState(initActive)
  const [menuDisabled, setMenuDisabled] = useState(false)

  const dispatch = useDispatch()
  const { isAdmin, isLoggedIn } = useSelector(authSelector)
  const { lng } = useSelector(lngSelector)
  const { kind } = useSelector(backendUpdateSelector)
  // const contextRef = useRef()
  const navigate = useNavigate()
  // it was useHistory

  const { t, i18n } = useTranslation('navbar')

  useEffect(() => {
    setMenuDisabled(kind !== '')
  }, [kind])

  useEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng)
    }
    // console.log('Component, NavBar, useEffect, lng ->', lng )
  }, [lng])
  // }, [lng, i18n])
  // const [showRemark, setShowRemark] = useState(false);
  // console.log('Component, NavBar, t ->', t )

  const color = positiveColor

  const _ClickHandler = (e, { name }) => {
    // console.log('NavBar:\n _ClickHandler',
    //   '\n  name ->', name
    // )
    clickHandler(
      name,
      dispatch,
      setActiveItem,
      openModal,
      isLoggedIn,
      logOut
    )
    navigate('/')
  }

  // console.log('NavBar:',
  //   '\n  isLoggedIn ->', isLoggedIn,
  //   '\n  activeItem ->', activeItem,
  //   '\n  menuDisabled ->', menuDisabled,
  //   '\n  kind ->', kind
  // )

  return (
    <Container>
      <Sticky
        context={context}
      >
        <Menu
          // inverted
          color={color}
          secondary
          size='small'
          // style={{ backgroundColor: 'red' }}
          style={{ backgroundColor: '#fff' }}
        // fixed='top'
        >
          <Menu.Menu position='left'>
            <NavMenuLogo
              // data-testid='NavMenuLogo'
              disabled={menuDisabled}
              name='logo'
              to='/'
              active={activeItem === 'logo'}
              onClick={_ClickHandler}
            />
            <NavMenuItem
              disabled={menuDisabled}
              name='priceList'
              to='/pricelist'
              active={activeItem === 'priceList'}
              content={t('menu')}
              onClick={_ClickHandler}
            />
            <NavMenuItem
              disabled={menuDisabled}
              name='pictures'
              to='/pictures'
              active={activeItem === 'pictures'}
              content={t('gallery')}
              onClick={_ClickHandler}
            />
            <NavMenuItem
              disabled={!isLoggedIn || menuDisabled}
              name='private'
              to='/private'
              active={activeItem === 'private'}
              content={t('forFriends')}
              onClick={_ClickHandler}
            />
            {(isAdmin === undefined ? false : isAdmin)
              ? <NavMenuItem
                disabled={menuDisabled}
                name='admin'
                to='/admin'
                active={activeItem === 'admin'}
                content={t('forAdmins')}
                onClick={_ClickHandler}
              />
              : null
            }
          </Menu.Menu>
          <Menu.Menu position='right'>
            <Menu.Item
              // disabled={false}
              disabled={menuDisabled}
              name='signInOut'
              active={false}
              onClick={_ClickHandler}
            >
              <SignInOut title={isLoggedIn ? t('logOut') : t('logIn')} />
            </Menu.Item>
            <Menu.Item
              data-testid='lngSwitcher'
              disabled={menuDisabled}
              name='language'
              active={false}
              onClick={_ClickHandler}
            >
              <Language disabled={menuDisabled} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Sticky>
    </Container>
  )
}

NavBar.defaultProps = {
  initActive: 'logo',
  context: {},
  openModal: openModal,
  clickHandler: clickHandler,
  logOut: logOut
}

NavBar.propTypes = {
  initActive: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
}

export default NavBar
