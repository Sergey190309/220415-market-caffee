import React, { useState, useEffect, createRef } from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'
import { Segment, Ref } from 'semantic-ui-react'

import { deviceSelector } from '../../redux/slices'
import Aux from '../HOC/auxiliary/auxiliary'
import NavBar from '../navigation/NavBar'
import SideBar from '../navigation/SideBar'
import Content from './Content'
import ModalLogIn from '../auth/ModalLogIn'

export const Layout = () => {
  const [deviceWidth, setDeviceWidth] = useState('')
  const { deviceSize } = useSelector(deviceSelector)

  // const contextRef = useRef(null)
  const contextRef = createRef()

  useEffect(() => {
    setDeviceWidth(deviceSize)
  }, [deviceSize])

  let output
  switch (deviceWidth) {
    case 'small':
      output = (<SideBar />)
      break
    default:
      output = (
        <Ref innerRef={contextRef}>
          <Segment>
            <ModalLogIn />
            <NavBar context={contextRef} />
            <Content context={contextRef} />
          </Segment>
        </Ref>
      )
      break
  }

  return (
    <Aux>
      {output}
    </Aux>
  )
}

export default Layout
