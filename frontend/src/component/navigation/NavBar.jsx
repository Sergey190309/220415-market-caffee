import React from 'react'

import { NavBarDiv, NavBarLink } from './styles/navigations.styled'


const NavBar = ({ switchNav }) => {
  return (
    <NavBarDiv>
      <NavBarLink onClick={switchNav} to='/'>LandingView</NavBarLink>
      <NavBarLink onClick={switchNav} to='/pricelist'>PriceListView</NavBarLink>
      <NavBarLink onClick={switchNav} to='/pictures'>PicturesView</NavBarLink>
      <NavBarLink onClick={switchNav} to='/private'>UsersOnlyView</NavBarLink>
      <NavBarLink onClick={switchNav} to='/admin'>AdminView</NavBarLink>
    </NavBarDiv>
  )
}

export default NavBar