import React, { Fragment, useState, useEffect } from 'react'
// Redux
// import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import Layout from './layout/Layout'

import { setDeviceSize } from '../redux/slices/device'
// import { setDeviceSize } from '../redux/actions';

export const App = ({ setDeviceSize }) => {
  const [width, setWidth] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    updateDimentions()
    window.addEventListener('resize', updateDimentions)
    return () => window.removeEventListener('resize', updateDimentions)
  }, [width])

  // useEffect(() => {
  //   getLngList(techToken);
  // }, [techToken]);

  const updateDimentions = () => {
    const _width = window.outerWidth
    setWidth(_width)
    dispatch(setDeviceSize(_width))
  }

  return (
    <Fragment>
      <Layout />
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
// export default connect(null, { setDeviceSize })(App);
