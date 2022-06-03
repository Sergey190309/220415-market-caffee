import React from 'react'

import NavItem from './NavItem'
import { NavBarDiv } from './styles/navigations.styled'


const NavBar = () => {
  return (
    <NavBarDiv>
      <NavItem />
      <NavItem />
    </NavBarDiv>
  )
}

export default NavBar