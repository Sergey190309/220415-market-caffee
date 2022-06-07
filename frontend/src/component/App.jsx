import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setDeviceSize } from '../redux/slices'

import NavBar from './navigation/NavBar'
import Toggle from './navigation/Toggle'

import AdminView from './page_views/admin/AdminView'
import LandingView from './page_views/landing/LandingView'
import PicturesView from './page_views/pictures/PicturesView'
import PriceListView from './page_views/priceList/PriceListView'
import UsersOnlyView from './page_views/usersOnly/UsersOnlyView'

import './App.css'
// import * as SB from './styles/buttons.styled'
// import { GlobalStyle, MainContainer, MainItem, GlobalDiv } from './styles/global.styled'
// import NavBar from './navigation/NavBar'
// import NavItem from './navigation/NavItem'

const App = ({ setDeviceSize }) => {
  const [navOpened, setNavOpened] = useState(false)
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

  const switchNav = () => {
    setNavOpened(
      !navOpened)
  }

  return (
    <div className='App'>
      <Toggle switchNav={switchNav} />
      <BrowserRouter>
        {navOpened ? <NavBar switchNav={switchNav} /> : null}
        <Routes>
          <Route path='/' element={<LandingView />} />
          <Route path='/pricelist' exact element={<PriceListView />} />
          <Route path='/pictures' exact element={<PicturesView />} />
          <Route path='/private' exact element={<UsersOnlyView />} />
          <Route path='/admin' exact element={<AdminView />} />
        </Routes>
      </BrowserRouter>
    </div>
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