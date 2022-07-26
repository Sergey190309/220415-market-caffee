import React from 'react'
// import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { FoodBankOutlined } from '@mui/icons-material'

// import * as CL from '../../constants/colors'
import * as SZ from '../../constants/sizes'
import { FixedButton } from './styles/navigations.styled'

const LogoButton = ({ toLanding }) => {
  return (
    <FixedButton
      id='logo-button'
      onClick={toLanding}
      vertical={{ side: 'top', value: '5%' }}
      horizontal={{ side: 'left', value: '3%' }}
      children={<FoodBankOutlined sx={{ color: 'text.primary', fontSize:SZ.fixedButton }} />}
    />
  )
}
LogoButton.defaultProps = {
  switchNavBar: ''
}

LogoButton.propTypes = {
  switchNavBar: PropTypes.string.isRequired
}

export default LogoButton