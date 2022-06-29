import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

import { Menu, MenuList } from '@mui/material'
// import { InboxIcon, MailIcon } from '@mui/icons-material'
import { FoodBankOutlined, PaidOutlined, InsertPhotoOutlined, InsertEmoticonOutlined, AdminPanelSettingsOutlined } from '@mui/icons-material'
// import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined'
// import { useOutsideClick } from '../hooks/useOutsideClick'
import { lngSelector } from '../../redux/slices'

import * as CL from '../../constants/colors'

import NavBarItem from './NavBarItem'

const NavBar = ({ visibility, setVisibility }) => {
  const [isVisable, setIsVisable] = useState(visibility)

  // const { i18nSuccess } = useSelector(techSelector)
  const {lng}=useSelector(lngSelector)

  console.log('NavBar, i18next.languages ->', i18next.languages)

  const { t, i18n } = useTranslation('navbar')

  useEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng)
    }
  }, [lng, i18n])

  const componentRef = useRef(null)

  const closeNav = () => {
    console.log('NavBar>closeNav')
    setVisibility(false)
    setIsVisable(false)
  }
  // useOutsideClick(componentRef, closeNav)
  // console.log('NavBar, render anchorEl ->', document.getElementById('NavBarToggle'))
  const admin = false

  return (
    // isVisable || visibility ?
    <div ref={componentRef}>
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
          onClick={closeNav}
          sx={{
            color: 'primary.main',
            bgcolor: `${CL.mainContainerBackground}`,
            p: '.5rem',
            my: '-.5rem',
          }}
        >
          <NavBarItem
            // title={'landingView'}
            title={t('LandingView')}
            linkto='/'
            Icon={FoodBankOutlined}
          />
          <NavBarItem
            // title={'priceListView'}
            title={t('PriceListView')}
            linkto='/pricelist'
            Icon={PaidOutlined}
          />
          <NavBarItem
            // title={'priceListView'}
            title={t('PicturesView')}
            linkto='/pictures'
            Icon={InsertPhotoOutlined}
          />
          <NavBarItem
            disabled={true}
            // title={'usersOnlyView'}
            title={t('UsersOnlyView')}
            linkto='/private'
            Icon={InsertEmoticonOutlined}
          />
          {admin ?
            <NavBarItem
              // title={'adminView'}
              title={t('AdminView')}
              linkto='/admin'
              Icon={AdminPanelSettingsOutlined}
            /> :
            null
          }
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
