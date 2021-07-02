import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { CONTENT_REQUESTED } from '../../../redux/actions/contentLoading/types';
import { useSaga } from '../../../redux/saga/contentLoading/createIO';
import { contentSaga } from '../../../redux/saga/contentLoading/contentLoading';

export const ViewHeader = ({ recordId, viewName, lng, initState }) => {
  // const [content, setContent] = useState({ title: '', content: '' });
  const [state, sagaDispatch] = useSaga(contentSaga, initState);
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

  // const output = <ViewParagraph />

  return (
    <div>
      <h1>{state.title}</h1>
      <p>{state.content}</p>
    </div>
  );
};

ViewHeader.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
  initState: {
    title: '',
    content: '',
  }
};

ViewHeader.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  initState: PropTypes.object.isRequired,
};

// const mapStateToProps = state => ({
//   lng: state.lng,
// });

// const mapDispatchToProps = dispatch => ({
// structureStart: viewName => dispatch(structureStart(viewName)),
// });

export default ViewHeader;
// export default connect(mapStateToProps)(ViewHeader);
