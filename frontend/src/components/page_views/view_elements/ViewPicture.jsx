import React, { Fragment } from 'react';

const ViewPictures = ({ recordId, viewName, lng }) => {
  // console.log('ViewPictures, viewName ->', viewName)
  return (
    <Fragment>
      <h4>{recordId}</h4>
      <p>{viewName}</p>
      <p>{lng}</p>
    </Fragment>
  );
};

export default ViewPictures;
