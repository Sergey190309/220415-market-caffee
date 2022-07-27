import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
  Button,
} from '@mui/material'

import * as CL from '../../../constants/colors'

export const FixedButton = styled(Button)`
  /* color: red; */
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
  /* size: 'large'; */
  &:hover {
    transition: .3s all ease-in-out;
    background-color: ${CL.navBarBackgroundHovered}
}
`
export const NavBarLink = styled(Link)`
color: ${CL.MUI_text_primary};
padding-left: .2rem;
text-decoration: none;
font-size: 1rem;
font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
transition: .3s all ease-in-out;
user-select: none; /* supported by Chrome and Opera */
-webkit-user-select: none; /* Safari */
-khtml-user-select: none; /* Konqueror HTML */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
  /* &:hover {
  transition: .3s all ease-in-out;
  background-color: ${CL.navBarBackgroundHovered}
} */
`