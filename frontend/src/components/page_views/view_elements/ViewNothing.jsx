import React from 'react'
import PropTypes from 'prop-types'

const ViewNothing = ({ recordId, viewName, lng }) => {
  // console.log('ViewNothing, props are', recordId, viewName, lng )
  return (
    <div>
      <h1>ViewNothing</h1>
    </div>
  )
}

ViewNothing.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired
}

export default ViewNothing
