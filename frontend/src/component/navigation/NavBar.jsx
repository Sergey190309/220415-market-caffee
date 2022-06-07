import React from 'react'
import {FaTimes} from 'react-icons/fa'

import { NavBarDiv, NavBarLink, NavBarCloseIcon } from './styles/navigations.styled'


const NavBar = ({ switchNav }) => {
  return (
    <NavBarDiv>
      <NavBarLink
        className="animate__animated animate__fadeInRight"
        onClick={switchNav} to='/'
      >
        LandingView
      </NavBarLink>
      <NavBarLink
        className="animate__animated animate__fadeInRight"
        onClick={switchNav} to='/pricelist'
      >
        PriceListView
      </NavBarLink>
      <NavBarLink
        className="animate__animated animate__fadeInRight"
        onClick={switchNav} to='/pictures'
      >
        PicturesView
      </NavBarLink>
      <NavBarLink
        className="animate__animated animate__fadeInRight"
        onClick={switchNav} to='/private'
      >
        UsersOnlyView
      </NavBarLink>
      <NavBarLink
        className="animate__animated animate__fadeInRight"
        onClick={switchNav} to='/admin'
      >
        AdminView
      </NavBarLink>
      <NavBarCloseIcon
        // className='animate__animated animate__fadeInRight'
        onClick={switchNav}
      >
        <FaTimes />
      </NavBarCloseIcon>
    </NavBarDiv>

  )
}

export default NavBar