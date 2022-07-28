import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { FoodBankOutlined } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'

import * as CL from '../../constants/colors'
import * as SZ from '../../constants/sizes'

const NavBarItem = ({ title, linkto, Icon, disabled, onClick }) => {
  // console.log('linkto ->', linkto)
  return (
    <MenuItem
      component={Link}
      to={linkto}
      onClick={onClick}
      disabled={disabled}
      sx={{
        border: SZ.buttonsBorder, borderColor: 'text.disabled',
        // color: 'red',
        borderRadius: '5%',
        // backgroundColor: 'red',
        backgroundColor: CL.navBarBackground,
        px: '.5rem',
        m: '.25rem',
        "&:hover": {
          transition: '.3s all ease-in-out',
          backgroundColor: CL.navBarBackgroundHovered
        }
      }}
    >
      <ListItemIcon
        sx={{ color: 'text.primary' }}
        children={<Icon sx={{ fontSize: SZ.menuIcon }} />}
      />
      <ListItemText
        // component={Typography}
        // variant='h1'
        sx={{
          color: 'text.primary',
        }}
        children={<Typography variant='h6' children={title} />}
      // primary={title}
      />
    </MenuItem>
  )
}

NavBarItem.defaultProps = {
  title: '',
  linkto: '',
  // Icon: null
  disabled: false,
  onClick: () => { }
}
NavBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkto: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NavBarItem