import styled, { createGlobalStyle } from 'styled-components'
import * as CL from '../constants/colors'


export const GlobalStyle = createGlobalStyle`
   body {
    margin: 0;
    padding: 0;
    background: ${CL.bodyBackground};
    /* font-family: Open-Sans, Helvetica, Sans-Serif; */
  }
 `

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 3px;
  background-color: ${CL.mainContainerColor};
  padding: 5px;
  margin: 5px;
 `

export const MainItem = styled.div`
  background-color: ${CL.mainItemBackgound};
  border: 1px solid ${CL.mainItemBorder};
  padding: 5px;
  font-size: 30px;
  text-align: center;
`