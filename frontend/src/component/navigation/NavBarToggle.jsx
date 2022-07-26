import React from 'react'
// import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../../hooks/reactRedux'
// import { Button } from '@mui/material'
// import {} from '@fortawesome/react-fontawesome'
import { MenuOutlined } from '@mui/icons-material'

import PropTypes from 'prop-types'

// import * as CL from '../../constants/colors'
import { setNavBarVisibility } from '../../redux/slices'
import * as SZ from '../../constants/sizes'
import { FixedButton } from './styles/navigations.styled'


const NavBarToggle = () => {

  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    console.log('NavBarTroggle>onClickHandler')
    dispatch(setNavBarVisibility(true))
  }
  // console.log('NavBarToggle, rendering, SZ.fixedButton ->', SZ.fixedButton)
  return (
    <FixedButton
      id='NavBarToggle'
      onClick={onClickHandler}
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