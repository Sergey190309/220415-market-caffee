import React from 'react'
// import { Button } from '@mui/material'
// import {} from '@fortawesome/react-fontawesome'
import { MenuOutlined } from '@mui/icons-material'

import PropTypes from 'prop-types'

// import * as CL from '../../constants/colors'
import * as SZ from '../../constants/sizes'
import { FixedButton } from './styles/navigations.styled'


const NavBarToggle = ({ switchNavBar }) => {
  // console.log('NavBarToggle, rendering, SZ.fixedButton ->', SZ.fixedButton)
  return (
    <FixedButton
      id='NavBarToggle'
      onClick={switchNavBar}
      vertical={{ side: 'top', value: '5%' }}
      horizontal={{ side: 'right', value: '3%' }}
      children={<MenuOutlined sx={{ color: 'text.primary', fontSize: SZ.fixedButton }} />}
    />
  )
}

NavBarToggle.defaultProps = {
  switchNavBar: () => { }
}

NavBarToggle.propTypes = {
  switchNavBar: PropTypes.func.isRequired
}


export default NavBarToggle