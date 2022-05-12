import React, { Fragment } from 'react'
import * as SB from './styles/buttons.styled'
import { GlobalStyle, MainContainer, MainItem } from './styles/global.styled'

const App = () => {
  // console.log('App ->')
  return (
    <Fragment>
      <GlobalStyle />
      <MainContainer>
        <MainItem>it works!</MainItem>
        <MainItem>header</MainItem>
        <MainItem>hBlock</MainItem>
        <MainItem>vBlock</MainItem>
        <MainItem>Footer</MainItem>
      </MainContainer>

        <SB.Button>
          That's button!
        </SB.Button>
      {/* </GlobalStyle> */}
    </Fragment>
  )
}

export default App