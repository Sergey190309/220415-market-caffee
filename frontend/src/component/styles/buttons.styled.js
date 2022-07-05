import styled from 'styled-components'

import { Button } from '@mui/material'

import * as CL from '../../constants/colors'
// SB stands for styled button

export const DialogButton = styled(Button)`
  background: transparent;

  color: ${CL.MUI_text_primary};
  border: 3px solid ${({hovered})=>(hovered? hovered.bgcolor: CL.positive)};
  /* margin: .25rem; */
  /* disabled: true; */
  /* sx: {
    bgcolor: red
  } */
  &:hover {
    background-color: ${({ hovered }) => (hovered ? hovered.bgcolor : CL.positive)};
    color:${({ hovered }) => (hovered ? hovered.color : 'white')}
  }
`
