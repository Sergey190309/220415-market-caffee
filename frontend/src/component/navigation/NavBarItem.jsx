import React from 'react'
import PropTypes from 'prop-types'
// import { FoodBankOutlined } from '@mui/icons-material'
import { ListItemIcon, MenuItem } from '@mui/material'

import * as CL from '../../constants/colors'
import * as SZ from '../../constants/sizes'
import { NavBarLink } from './styles/navigations.styled'

const NavBarItem = ({ title, linkto, Icon, disabled }) => {
  return (
    <MenuItem
      disabled={disabled}
      sx={{
      border: 1, borderColor: 'text.disabled',
      borderRadius: '5%',
      // backgroundColor: 'red',
      backgroundColor: `${CL.navBarBackground}`,
      px: '.5rem',
      m: '.25rem',
      "&:hover": {
        transition: '.3s all ease-in-out',
        backgroundColor: `${CL.navBarBackgroundHovered}`
      }
    }}>
      <ListItemIcon sx={{ color: 'text.primary' }} children={<Icon sx={{ fontSize: `${SZ.menuIcon}` }} />} />
      <NavBarLink to={linkto} children={title} />
    </MenuItem>
  )
}

NavBarLink.defaultProps = {
  title: '',
  linkto: '',
  // Icon: null
  disabled: false
}
NavBarLink.propTypes = {
  title: PropTypes.string.isRequired,
  linkto: PropTypes.string.isRequired,
  Icon: PropTypes.element,
  disabled: PropTypes.bool.isRequired
}

export default NavBarItem