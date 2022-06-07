import React from 'react'
import { NavBarOpenIcon } from './styles/navigations.styled'

const Toggle = ({ switchNav }) => {
  return (
    <NavBarOpenIcon onClick={switchNav} />
  )
}

export default Toggle