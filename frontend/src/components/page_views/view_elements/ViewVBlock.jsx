import React from 'react'
import PropTypes from 'prop-types';

const ViewVBlock = ({ recordId, viewName }) => {
  return (
    <div>
      <h1>ViewVBlock</h1>
      <h2>{recordId}</h2>
      <h2>{viewName}</h2>
    </div>
  )
}
ViewVBlock.defaultProps = {
  recordId: '',
  viewName: '',
};

ViewVBlock.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
};

export default ViewVBlock
