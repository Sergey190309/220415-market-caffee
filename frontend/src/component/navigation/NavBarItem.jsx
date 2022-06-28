import React from 'react'
import PropTypes from 'prop-types'
// import { FoodBankOutlined } from '@mui/icons-material'
import { ListItemIcon, MenuItem } from '@mui/material'

import * as CL from '../../constants/colors'
import { NavBarLink } from './styles/navigations.styled'

const NavBarItem = ({ title, linkto, Icon }) => {
  return (
    <MenuItem sx={{
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
      <ListItemIcon sx={{ color: 'text.primary' }} children={<Icon sx={{ fontSize: '2rem' }} />} />
      <NavBarLink to={linkto} children={title} />
    </MenuItem>
  )
}

NavBarLink.defaultProps = {
  title: '',
  linkto: ''
}
NavBarLink.propTypes = {
  title: PropTypes.string.isRequired,
  linkto: PropTypes.string.isRequired
}

export default NavBarItem