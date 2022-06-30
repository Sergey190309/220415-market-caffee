import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

import { Menu, MenuList } from '@mui/material'
// import { InboxIcon, MailIcon } from '@mui/icons-material'
import {
  FoodBankOutlined, PaidOutlined, InsertPhotoOutlined,
  InsertEmoticonOutlined, AdminPanelSettingsOutlined,
  LoginOutlined, LogoutOutlined
} from '@mui/icons-material'
// import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined'
// import { useOutsideClick } from '../hooks/useOutsideClick'
import { lngSelector, authSelector, openModal } from '../../redux/slices'

import * as CL from '../../constants/colors'

import LogIn from '../general_items/auth/LogIn'
import NavBarItem from './NavBarItem'
import LogInOutButton from '../general_items/auth/LogInOutButton'

const NavBar = ({ visibility, setVisibility }) => {
  const [isVisable, setIsVisable] = useState(visibility)

  // const { i18nSuccess } = useSelector(techSelector)
  const { lng } = useSelector(lngSelector)
  const { isLoggedIn, isAdmin } = useSelector(authSelector)

  // console.log('NavBar, i18next.languages ->', i18next.languages)

  const componentRef = useRef(null)
  const { t, i18n } = useTranslation('navbar')

  const dispatch = useDispatch()

  useEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng)
    }
  }, [lng, i18n])


  const closeNav = () => {
    // console.log('NavBar>closeNav')
    setVisibility(false)
    setIsVisable(false)
  }

  const logInOutClickHandler = () => {
    console.log('NavBar>logInOutClickHandler')
    closeNav()
    dispatch(openModal('LogIn'))
    // return (
    //   <LogIn />
    // )
  }
  // useOutsideClick(componentRef, closeNav)
  // console.log('NavBar, render anchorEl ->', document.getElementById('NavBarToggle'))
  // const admin = false

  return (
    // isVisable || visibility ?
    <div ref={componentRef}>
      <LogIn />
      <Menu
        id='nav-bar'
        anchorEl={document.getElementById('NavBarToggle')}
        // open={true}
        open={isVisable || visibility}
        onClose={closeNav}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >

        <MenuList
          // onClick={closeNav}
          sx={{
            color: 'primary.main',
            bgcolor: `${CL.mainContainerBackground}`,
            p: '.5rem',
            my: '-.5rem',
          }}
        >
          <NavBarItem
            // title={'landingView'}
            onClick={closeNav}
            title={t('LandingView')}
            linkto='/'
            Icon={FoodBankOutlined}
          />
          <NavBarItem
            onClick={closeNav}
            title={t('PriceListView')}
            linkto='/pricelist'
            Icon={PaidOutlined}
          />
          <NavBarItem
            onClick={closeNav}
            title={t('PicturesView')}
            linkto='/pictures'
            Icon={InsertPhotoOutlined}
          />
          <NavBarItem
            disabled={isLoggedIn ? false : true}
            // title={'usersOnlyView'}
            onClick={closeNav}
            title={t('UsersOnlyView')}
            linkto='/private'
            Icon={InsertEmoticonOutlined}
          />
          {isAdmin ?
            <NavBarItem
              // title={'adminView'}
              onClick={closeNav}
              title={t('AdminView')}
              linkto='/admin'
              Icon={AdminPanelSettingsOutlined}
            /> :
            null
          }
          <LogInOutButton
            onClick={logInOutClickHandler}
            title={isLoggedIn ? t('LogOut') : t('LogIn')}
            Icon={isLoggedIn ? LogoutOutlined : LoginOutlined}
          />
        </MenuList>
      </Menu>
    </div>
    // </div> : null
  )
}

NavBar.defaultProps = {
  visibility: false,
  setVisibility: () => { }
}

NavBar.propTypes = {
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired
}

export default NavBar
