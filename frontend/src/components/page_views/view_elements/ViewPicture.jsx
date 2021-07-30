import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ViewPicture = ({ recordId, viewName, lng }) => {
  // console.log('ViewPictures, viewName ->', viewName)
  return (
    <Fragment>
      <h4>{recordId}</h4>
      <p>{viewName}</p>
      <p>{lng}</p>
    </Fragment>
  );
};

ViewPicture.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
}

ViewPicture.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
}

export default ViewPicture;
