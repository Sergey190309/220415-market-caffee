import React, { useState, useRef } from 'react'
import { Menu, MenuList } from '@mui/material'
// import { InboxIcon, MailIcon } from '@mui/icons-material'

import * as CL from '../../constants/colors'
import { FoodBankOutlined, PaidOutlined, InsertPhotoOutlined, InsertEmoticonOutlined, AdminPanelSettingsOutlined } from '@mui/icons-material'
// import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined'
// import { useOutsideClick } from '../hooks/useOutsideClick'

import NavBarItem from './NavBarItem'

const NavBar = ({ visibility, setVisibility }) => {
  const [isVisable, setIsVisable] = useState(visibility)


  const componentRef = useRef(null)

  const closeNav = () => {
    console.log('NavBar>closeNav')
    setVisibility(false)
    setIsVisable(false)
  }
  // useOutsideClick(componentRef, closeNav)

  return (
    // isVisable || visibility ?
    <div ref={componentRef}>
      <Menu
        id='nav-bar'
        anchorEl={document.getElementById('NavBarToggleIcon')}
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
            border: 2, color: 'primary.main',
            borderColor: 'text.disabled',
            p: 1,
            m: 1
          }}
        >
          <NavBarItem
            // onClick={closeNav}
            title='LandingView'
            linkto='/'
            Icon={FoodBankOutlined}
          />
          <NavBarItem
            // onClick={closeNav}
            title='PriceListView'
            linkto='/pricelist'
            Icon={PaidOutlined}
          />
          <NavBarItem
            // onClick={closeNav}
            title='PicturesView'
            linkto='/pictures'
            Icon={InsertPhotoOutlined}
          />
          <NavBarItem
            // onClick={closeNav}
            title='UsersOnlyView'
            linkto='/private'
            Icon={InsertEmoticonOutlined}
          />
          <NavBarItem
            // onClick={closeNav}
            title='AdminView'
            linkto='/admin'
            Icon={AdminPanelSettingsOutlined}
          />
        </MenuList>
      </Menu>
    </div>
    // </div> : null
  )
}

export default NavBar
