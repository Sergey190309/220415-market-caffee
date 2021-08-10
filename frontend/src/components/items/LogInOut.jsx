import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'semantic-ui-react'

const LogInOut = ({ title }) => {
  // console.log('component, items, LogInOut, title ->', title)
  return (
    <Button>{title}</Button>
  )
}

LogInOut.defaultProps = {
  title: 'button'
}

LogInOut.propTypes = {
  title: PropTypes.string.isRequired
}

export default LogInOut
