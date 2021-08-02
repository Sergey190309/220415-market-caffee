import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { PICTURE_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/saga/contentLoading/createIO'
import { picturetSaga } from '../../../redux/saga/contentLoading/contentLoading'

const ViewPicture = ({ recordId, viewName, lng }) => {
  const [state, sagaDispatch] = useSaga(picturetSaga, {
    title: '',
    content: ''
  })

  useEffect(() => {
    sagaDispatch({
      type: PICTURE_REQUESTED,
      payload: {
        identity: recordId,
        view_id: viewName,
        locale_id: lng,
      },
    })
  }, [recordId, viewName, lng, sagaDispatch])
  // console.log('ViewPictures, viewName ->', viewName)
  return (
    <Fragment>
      <h4>{recordId}</h4>
      <h4>{state.title}</h4>
      <p>{state.content}</p>
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
