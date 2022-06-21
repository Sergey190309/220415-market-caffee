import React from 'react'
// import { Button } from '@mui/material'
// import {} from '@fortawesome/react-fontawesome'
import { MenuOutlined } from '@mui/icons-material'
import { NavBarToggleIcon } from './styles/navigations.styled'

const NavBarToggle = ({ switchNavBar }) => {
  return (
    <NavBarToggleIcon
      onClick={switchNavBar}
      top='5%' left='90%'
      size='large'
      children={<MenuOutlined />}
    />
  )
}

export default NavBarToggle