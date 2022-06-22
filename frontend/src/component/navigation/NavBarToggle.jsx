import React from 'react'
// import { Button } from '@mui/material'
// import {} from '@fortawesome/react-fontawesome'
import { MenuOutlined } from '@mui/icons-material'

import * as CL from '../../constants/colors'
import { NavBarToggleIcon } from './styles/navigations.styled'


const NavBarToggle = ({ switchNavBar }) => {
  return (
    <NavBarToggleIcon
      id='NavBarToggleIcon'
      onClick={switchNavBar}
      top='5%' left='86%'
      size='large'
      children={<MenuOutlined sx={{color: 'text.primary'}} />}
      sx={{bgcolor: `${CL.navBarBackground}`}}
    />
  )
}

export default NavBarToggle