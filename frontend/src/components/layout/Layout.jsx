import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

import Aux from '../HOC/auxiliary/auxiliary'
import NavBar from '../navigation/NavBar'
import SideBar from '../navigation/SideBar'
import Content from './Content'
import ModalLogIn from '../auth/ModalLogIn'

export const Layout = ({ layout }) => {
  const [deviceSize, setDeviceSize] = useState('')
  useEffect(() => {
    setDeviceSize(layout.deviceSize)
  }, [layout.deviceSize])

  let output
  switch (deviceSize) {
    case 'small':
      output = (<SideBar />)
      break
    default:

      output = (
        <Segment>
          <ModalLogIn />
          <NavBar />
          <Content />
        </Segment>
      )
      break
  }

  return (
    <Aux>
      {output}
    </Aux>
  )
}

Layout.propTypes = {
  layout: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  layout: state.device
  // layout: state.layout,
})

export default connect(mapStateToProps)(Layout)
