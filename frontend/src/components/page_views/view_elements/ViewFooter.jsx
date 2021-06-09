import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { CONTENT_REQUESTED } from '../../../redux/actions/contentLoading/types';
import { useSaga } from '../../../redux/saga/contentLoading/createIO';
import { contentSaga } from '../../../redux/saga/contentLoading/contentLoading';

const ViewFooter = ({ recordId, viewName, lng }) => {
  const [state, sagaDispatch] = useSaga(contentSaga, {
    title: '',
    content: '',
  });

  useEffect(() => {
    // console.log('ViewFooter, useEffect ->', recordId, viewName, lng)
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
    <div>
      <h1>{state.title}</h1>
      <p>{state.content}</p>
    </div>
  );
};

ViewFooter.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
};

ViewFooter.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
};

// const mapStateToProps = state => ({
//   lng: state.lng,
// });

// const mapDispatchToProps = dispatch => ({
// structureStart: viewName => dispatch(structureStart(viewName)),
// });

export default ViewFooter;
// export default connect(mapStateToProps)(ViewFooter);
