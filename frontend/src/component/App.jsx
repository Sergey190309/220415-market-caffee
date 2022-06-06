import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setDeviceSize } from '../redux/slices'
// import * as SB from './styles/buttons.styled'
import { GlobalStyle, MainContainer, MainItem } from './styles/global.styled'
import NavBar from './navigation/NavBar'

const App = ({setDeviceSize}) => {
  const [width, setWidth] = useState(window.innerWidth)
  const dispatch = useDispatch()
  // console.log('component>App setDeviceSize ->', setDeviceSize)

  const setDinamicWidth = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', setDinamicWidth)
    dispatch(setDeviceSize(width))
    return () => window.removeEventListener('resize', setDinamicWidth)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return (
    <Fragment>
      <GlobalStyle />
      <MainContainer>
        <NavBar />
        <MainItem>2022-Jun-06 14:26</MainItem>
      </MainContainer>
    </Fragment>
  )
}

App.defaultProps = {
  // techToken: '',
  setDeviceSize: setDeviceSize
}

App.propTypes = {
  setDeviceSize: PropTypes.func.isRequired
}

export default App