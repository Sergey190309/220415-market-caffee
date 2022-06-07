import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaTimes, FaBars } from 'react-icons/fa'

import * as CL from '../../../constants/colors'

export const NavBarDiv = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    @media screen and (min-width: 790px) {
        width: 60%;
    }
    background-color: ${CL.navBarBackground};
    z-index: 99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const NavBarLink = styled(Link)`
  color: ${CL.navBarLink};
  text-decoration: none;
  font-size: clamp(3rem, 4vw, 6vw);
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  transition: .2s all ease-in-out;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  &:hover {
      transition: .2s all ease-in-out;
      color: orangered;
  }
`
export const NavBarCloseIcon = styled(FaTimes)`
  position: fixed;
  top: 5%;
  right: 4%;
  background: ${CL.navBarCloseIconBackground};
  color: ${CL.navBarCloseIcon};
  padding: .75rem;
  display: flex;
  place-items: center;
  font-size: 2rem;
  cursor: pointer;
`
export const NavBarOpenIcon = styled(FaBars)`
  position: fixed;
  top: 5%;
  right: 4%;
  color: ${CL.navBarOpenIcon};
  background: ${CL.navBarOpenIconBackground};
  padding: .75rem;
  display: flex;
  place-items: center;
  font-size: 2rem;
  cursor: pointer;
`