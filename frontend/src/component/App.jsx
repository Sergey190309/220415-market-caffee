import React, {
  // useState, useEffect
} from 'react'
import { useAppState, useAppEffect } from '../hooks/react'
// import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../hooks/reactRedux'
import {
  Routes, Route,
  // useNavigate
} from 'react-router-dom'
import { useAppNavigate } from '../hooks/reactRouterDom'
import PropTypes from 'prop-types'

import { setDeviceSize } from '../redux/slices'

// import NavBar from './navigation/NavBar'
// import Toggle from './navigation/Toggle'
import NavBarToggle from './navigation/NavBarToggle'
import Logo from './navigation/Logo'
import LanguageSwitcher from './general_items/language/LanguageSwitcher'

import AdminView from './page_views/admin/AdminView'
import LandingView from './page_views/landing/LandingView'
import PicturesView from './page_views/pictures/PicturesView'
import PriceListView from './page_views/priceList/PriceListView'
import UsersOnlyView from './page_views/usersOnly/UsersOnlyView'
import { GlobalStyle } from './styles/global.styled'

// import * as SB from './styles/buttons.styled'
// import { GlobalStyle, MainContainer, MainItem, GlobalDiv } from './styles/global.styled'
import NavBar from './navigation/NavBar'
import LogIn from './general_items/auth/LogIn'
import SignUp from './general_items/auth/SignUp'
// import NavItem from './navigation/NavItem'

export const switchNav = (setNavOpened, navOpened) => {
  setNavOpened(!navOpened)
}

const App = ({ setDeviceSize }) => {
  // const [sighUpOpened, setSighUpOpened] = useState(false)
  const [width, setWidth] = useAppState(window.innerWidth)
  const dispatch = useAppDispatch()
  // console.log('component>App setDeviceSize ->', setDeviceSize)

  const navigate = useAppNavigate()
  const toLanding = () => { navigate('/') }

  const setDinamicWidth = () => {
    setWidth(window.innerWidth)
  }
  useAppEffect(() => {
    window.addEventListener('resize', setDinamicWidth)
    dispatch(setDeviceSize(width))
    return () => window.removeEventListener('resize', setDinamicWidth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])


  // const onClickToggleHandler = event => {
  //   setNavOpened(true)
  // }

  // console.log('App, rendering, navOpened ->', navOpened)

  return (
    <>
      <GlobalStyle />
      <LogIn />
      <NavBar />
      <SignUp />
      <Logo toLanding={toLanding} />
      <NavBarToggle />
      <LanguageSwitcher />
      <Routes>
        <Route path='/' element={<LandingView />} />
        <Route path='/pricelist' exact element={<PriceListView />} />
        <Route path='/pictures' exact element={<PicturesView />} />
        <Route path='/private' exact element={<UsersOnlyView />} />
        <Route path='/admin' exact element={<AdminView />} />
      </Routes>
    </>
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