import React, { Suspense } from 'react'
import { useAppState, useAppEffect } from '../hooks/react'
import PropTypes from 'prop-types'
import { useAppDispatch } from '../hooks/reactRedux'

import { setDeviceSize } from '../redux/slices'

import OutPut from './OutPut'
import LogIn from './general_items/auth/LogIn'
import SignUp from './general_items/auth/SignUp'
// const LogIn = React.lazy(() => import('./general_items/auth/LogIn'))
// const SignUp = React.lazy(() => import('./general_items/auth/SignUp'))


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
    <Suspense fallback={<div>Loading...</div>}>
      <LogIn />
      <SignUp />
      <OutPut />
    </Suspense>
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