import React from 'react'
// import { Button } from '@mui/material'
// import {} from '@fortawesome/react-fontawesome'
import { MenuOutlined } from '@mui/icons-material'

import * as CL from '../../constants/colors'
import { FixedButton } from './styles/navigations.styled'


const NavBarToggle = ({ switchNavBar }) => {
  return (
    <FixedButton
      id='NavBarToggle'
      onClick={switchNavBar}
      vertical={{ side: 'top', value: '5%' }}
      horizontal={{ side: 'right', value: '3%' }}
      // top='5%'
      // left='86%'
      children={<MenuOutlined sx={{ color: 'text.primary' }} />}
    />
  )
}

export default NavBarToggle