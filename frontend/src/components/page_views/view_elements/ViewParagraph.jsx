import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { CONTENT_REQUESTED } from '../../../redux/constants/contentLoading/types';
import { useSaga } from '../../../redux/saga/contentLoading/createIO';
import { contentSaga } from '../../../redux/saga/contentLoading/contentLoading';
const ViewParagraph = ({ recordId, viewName, lng }) => {
  const [state, sagaDispatch] = useSaga(contentSaga, {
    title: '',
    content: '',
  });
  useEffect(() => {
    sagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordId,
        view_id: viewName,
        locale_id: lng,
      },
    });
  }, [recordId, viewName, lng, sagaDispatch]);

  return (
    <Fragment>
      <h2>{state.title}</h2>
      <p>{state.content}</p>
    </Fragment>
  );
};
ViewParagraph.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
};

ViewParagraph.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
};

export default ViewParagraph;
