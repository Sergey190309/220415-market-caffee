import React from 'react'
import { useAppState, useAppEffect } from '../hooks/react'
import PropTypes from 'prop-types'
import { useAppDispatch } from '../hooks/reactRedux'

import { setDeviceSize } from '../redux/slices'

import OutPut from './OutPut'
import LogIn from './general_items/auth/LogIn'
import SignUp from './general_items/auth/SignUp'

// export const switchNav = (setNavOpened, navOpened) => {
//   setNavOpened(!navOpened)
// }

const App = ({ setDeviceSize }) => {
  const [width, setWidth] = useAppState(window.innerWidth)

  const dispatch = useAppDispatch()

  const setDinamicWidth = () => {
    setWidth(window.innerWidth)
  }
  useAppEffect(() => {
    window.addEventListener('resize', setDinamicWidth)
    dispatch(setDeviceSize(width))
    return () => window.removeEventListener('resize', setDinamicWidth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])


  return (
    <>
      <LogIn />
      <SignUp />
      <OutPut />
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