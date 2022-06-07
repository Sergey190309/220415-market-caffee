import styled, { createGlobalStyle } from 'styled-components'
import * as CL from '../../constants/colors'


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
  background-color: ${CL.mainContainer};
  padding: 5px;
  margin: 5px;
 `

export const MainItem = styled.div`
  background-color: ${CL.mainItemBackgound};
  border: 1px solid ${CL.mainItemBorder};
  padding: .5em;
  font-size: 2em;
  text-align: center;
`

export const GlobalDiv = styled.div`
  background-color: red;
  padding: 1em;
`