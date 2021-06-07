import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { CONTENT_REQUESTED } from '../../../redux/actions/contentLoading/types';
import { useSaga } from '../../../redux/saga/contentLoading/createIO';
import { contentSaga } from '../../../redux/saga/contentLoading/contentLoading';

export const ViewHeader = ({ recordId, viewName, lng }) => {
  // const [content, setContent] = useState({ title: '', content: '' });
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
  // console.log('ViewHeader, state ->', state);

  return (
    <div>
      <h1>{state.title}</h1>
      <h2>{state.content}</h2>
    </div>
  );
};

ViewHeader.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
};

ViewHeader.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  lng: state.lng,
});

// const mapDispatchToProps = dispatch => ({
// structureStart: viewName => dispatch(structureStart(viewName)),
// });

export default connect(mapStateToProps)(ViewHeader);
