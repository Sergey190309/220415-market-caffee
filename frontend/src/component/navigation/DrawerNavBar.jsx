import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reactRedux'
import PropTypes from 'prop-types'
import { Divider, MenuList } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  // lngSelector,
  authSelector, setLogInVisibility, logOut
} from '../../redux/slices'
import NavBarItem from './NavBarItem'
import {
  FoodBankOutlined, PaidOutlined, InsertPhotoOutlined, InsertEmoticonOutlined,
  AdminPanelSettingsOutlined, LoginOutlined, LogoutOutlined
} from '@mui/icons-material'
import LogInOutButton from '../general_items/auth/LogInOutButton'

const DrawerNavBar = ({ closeDrawer }) => {
  const { t } = useTranslation('navbar')

  // const { lng } = useAppSelector(lngSelector)
  const { isLoggedIn, isAdmin } = useAppSelector(authSelector)

  const dispatch = useAppDispatch()

  // const closeNav = () => {
  //   // console.log('NavBar>closeNav')
  //   dispatch(setNavBarVisibility(false))
  // }
  const logInOutClickHandler = () => {
    if (isLoggedIn) {
      dispatch(logOut())
      closeDrawer()
    } else {
      dispatch(setLogInVisibility(true))
    }
  }

  return (
    <MenuList
      data-testid='drawer-menu'
    >
      <NavBarItem
        onClick={closeDrawer}
        title={t('LandingView')}
        linkto='/'
        Icon={FoodBankOutlined}
      />
      <NavBarItem
        onClick={closeDrawer}
        title={t('PriceListView')}
        linkto='/pricelist'
        Icon={PaidOutlined}
      />
      <NavBarItem
        onClick={closeDrawer}
        title={t('PicturesView')}
        linkto='/pictures'
        Icon={InsertPhotoOutlined}
      />
      <NavBarItem
        disabled={isLoggedIn ? false : true}
        // title={'usersOnlyView'}
        onClick={closeDrawer}
        title={t('UsersOnlyView')}
        linkto='/private'
        Icon={InsertEmoticonOutlined}
      />
      {isAdmin ?
        <NavBarItem
          // title={'adminView'}
          onClick={closeDrawer}
          title={t('AdminView')}
          linkto='/admin'
          Icon={AdminPanelSettingsOutlined}
        /> :
        null
      }
      <Divider />
      <LogInOutButton
        onClick={logInOutClickHandler}
        title={isLoggedIn ? t('LogOut') : t('LogIn')}
        Icon={isLoggedIn ? LogoutOutlined : LoginOutlined}
      />
    </MenuList>
  )
}
DrawerNavBar.defaultProps = {
  closeDrawer: () => { }
}
DrawerNavBar.propTypes = {
  closeDrawer: PropTypes.func.isRequired
}

export default DrawerNavBar