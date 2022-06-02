import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setDeviceSize } from '../redux/slices'
// import * as SB from './styles/buttons.styled'
import { GlobalStyle, MainContainer, MainItem } from './styles/global.styled'

const App = ({setDeviceSize}) => {
  const [width, setWidth] = useState(window.innerWidth)
  const dispatch = useDispatch()

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
        <MainItem>Screen width - {width}</MainItem>
        <MainItem>header</MainItem>
        <MainItem>hBlock</MainItem>
        <MainItem>vBlock</MainItem>
        <MainItem>Footer</MainItem>
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