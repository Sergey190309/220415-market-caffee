import React, {
  // useState,
  useRef, useEffect
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
// import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

import { Menu, MenuList } from '@mui/material'
import {
  FoodBankOutlined, PaidOutlined, InsertPhotoOutlined,
  InsertEmoticonOutlined, AdminPanelSettingsOutlined,
  LoginOutlined, LogoutOutlined
} from '@mui/icons-material'

import {
  lngSelector, authSelector, deviceSelector,
  setNavBarVisibility, logOut, setLogInVisibility
} from '../../redux/slices'

import * as CL from '../../constants/colors'

// import LogIn from '../general_items/auth/LogIn'
import NavBarItem from './NavBarItem'
import LogInOutButton from '../general_items/auth/LogInOutButton'

const NavBar = () => {
  // const [isVisable, setIsVisable] = useState(false)
  // const [logInOpened, setLogInOpened] = useState(false)

  const { lng } = useSelector(lngSelector)
  const { isLoggedIn, isAdmin } = useSelector(authSelector)
  const {isNavBarOpened}=useSelector(deviceSelector)

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
    dispatch(setNavBarVisibility(false))
    // setVisibility(false)
    // setIsVisable(false)
  }

  const logInOutClickHandler = () => {
    if (isLoggedIn) {
      dispatch(logOut())
      closeNav()
    } else {
      // console.log('NavBar>logInOutClickHandler, not isLoggedIn')
      // dispatch(openModal('LogIn'))
      // setLogInOpened(true)
      dispatch(setLogInVisibility(true))
    }
  }
  // useOutsideClick(componentRef, closeNav)
  // console.log('NavBar, render')
  // const admin = false

  return (
    // isVisable || visibility ?
    <div ref={componentRef}>
      {/* <LogIn
        visibility={logInOpened}
        setVisibility={setLogInOpened}
      /> */}
      <Menu
        id='nav-bar'
        anchorEl={document.getElementById('NavBarToggle')}
        // open={true}
        open={isNavBarOpened}
        // open={isVisable || visibility}
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
}

NavBar.propTypes = {
}

export default NavBar
