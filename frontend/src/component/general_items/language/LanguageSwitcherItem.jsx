import React from 'react'
import PropTypes from 'prop-types'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import Flag from 'react-world-flags'

import * as CL from '../../../constants/colors'

const LanguageSwitcherItem = ({ value, flag, onItemClickHandler }) => {
  return (
    <>
      <MenuItem
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
        }}
        onClick={() => onItemClickHandler(value)}
      >
        <ListItemIcon children={<Flag code={flag} />} />
        <ListItemText
          children={value}
          sx={{
            ml: '.5rem'
          }}
        />
      </MenuItem>
    </>
  )
}

LanguageSwitcherItem.defaultProps = {
  value: '',
  flag: '',
  onItemClickHandler: () => { }
}
LanguageSwitcherItem.propTypes = {
  value: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
  onItemClickHandler: PropTypes.func.isRequired
}

export default LanguageSwitcherItem