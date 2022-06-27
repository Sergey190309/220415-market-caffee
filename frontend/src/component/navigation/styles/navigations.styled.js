import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
  Button,
  // IconButton
} from '@mui/material'

import { FaTimes, FaBars } from 'react-icons/fa'
// import { MdOutlineFoodBank } from 'react-icons/md'
import * as CL from '../../../constants/colors'
import { smallDeviceLimit } from '../../../redux/constants/deviceWidthLimits'

export const FixedButton = styled(Button)`
  position: fixed;
  top: ${({ vertical }) => (vertical && (vertical.side && (
    vertical.side === 'top' ? vertical.value && (
      vertical.value) : undefined)))};
  bottom: ${({ vertical }) => (vertical && (vertical.side && (
    vertical.side === 'bottom' ? vertical.value && (
      vertical.value) : undefined)))};
  left: ${({ horizontal }) => (horizontal && (horizontal.side && (
    horizontal.side === 'left' ? horizontal.value && (
      horizontal.value) : undefined)))};
  right: ${({ horizontal }) => (horizontal && (horizontal.side && (
    horizontal.side === 'right' ? horizontal.value && (
      horizontal.value) : undefined)))};
  /* left: ${props => props.left || '80%'}; */
  background-color: ${CL.navBarBackground};
  size: 'large';
  &:hover {
    transition: .3s all ease-in-out;
    background-color: ${CL.navBarBackgroundHovered}
}
`
export const LogoIcon = styled(Button)`
position: fixed;
top: ${props => props.top || '5%'};
left: ${props => props.left || '4%'};
&:hover {
  transition: .3s all ease-in-out;
  background-color: ${CL.navBarBackgroundHovered}
}
`

export const NavBarDiv = styled.div`
position: fixed;
top: 0;
right: 0;
/* height: 100vh; */
width: 100%;
@media screen and(min-width: ${`${smallDeviceLimit}px`}) {
  width: 60%;
}
z-index: 99;
display: flex;
flex-direction: column;
justify-content: left;
/* margin: 2em 0 0 2em; */
padding: 2em 0;
align-items: left;
`
export const NavBarLink = styled(Link)`
color: ${CL.MUI_text_primary};
padding-left: .2em;
text-decoration: none;
font-size: clamp(1rem, 3vw, 6vw);
font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
transition: .3s all ease-in-out;
user-select: none; /* supported by Chrome and Opera */
-webkit-user-select: none; /* Safari */
-khtml-user-select: none; /* Konqueror HTML */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
  &:hover {
  transition: .3s all ease-in-out
}
`
export const NavBarCloseIcon = styled(FaTimes)`
position: fixed;
top: 5%;
right: 4%;
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
padding: .75rem;
display: flex;
place-items: center;
font-size: 2rem;
cursor: pointer;
`

