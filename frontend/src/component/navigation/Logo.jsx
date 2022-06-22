import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { FoodBankOutlined } from '@mui/icons-material'

import * as CL from '../../constants/colors'
import { LogoIcon } from './styles/navigations.styled'

const Logo = ({ toLanding }) => {
  return (
    <LogoIcon
      id='LogoIcon'
      onClick={toLanding}
      top='5%' left='4%'
      size='large'
      children={<FoodBankOutlined sx={{ color: 'text.primary' }} />}
      sx={{ bgcolor: `${CL.navBarBackground}` }}
    />
  )
}

export default Logo