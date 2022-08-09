import React from 'react'
import PropTypes from 'prop-types'
import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'

import * as SZ from '../../../../constants/sizes'
import * as CL from '../../../../constants/colors'

const ContextMenuItem = ({ title, Icon, disabled, onClick }) => {
  return (
    <MenuItem
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
        children={<Typography variant='h7' children={title} />}
      // primary={title}
      />
    </MenuItem>
  )
}

ContextMenuItem.defaultProps = {
  title: '',
  // Icon: PropTypes.elementType,
  disabled: false,
  onClick: () => { }
}
ContextMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ContextMenuItem