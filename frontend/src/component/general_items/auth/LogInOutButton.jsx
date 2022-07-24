import React from 'react'
import PropTypes from 'prop-types'
import {
  // Icon,
  ListItemIcon, ListItemText, MenuItem
} from '@mui/material'

import * as CL from '../../../constants/colors'
import * as SZ from '../../../constants/sizes'

const LogInOutButton = ({ title, Icon, onClick }) => {
  return (
    <MenuItem
      onClick={ onClick }
      sx={{
        border: 1, borderColor: 'text.disabled',
        borderRadius: '50%',
        // fontSize: 100,
        backgroundColor: `${CL.navBarBackground}`,
        px: '.5rem',
        m: '.25rem',
        "&:hover": {
          transition: '.3s all ease-in-out',
          backgroundColor: `${CL.navBarBackgroundHovered}`
        }
      }}
    >
      <ListItemIcon
        sx={{ color: 'text.primary' }}
        children={<Icon
          sx={{ fontSize: `${SZ.logInOut}` }}
        />}
      />
      <ListItemText
        // children={title}
        sx={{
          color: 'text.primary',
          fontSize: 100
        }}
      >
        {title}
      </ListItemText>
    </MenuItem>
  )
}

LogInOutButton.defaultProps = {
  title: 'default',
  // Icon: null
  onClick: () => { }
}
LogInOutButton.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  onClick: PropTypes.func.isRequired
}

export default LogInOutButton