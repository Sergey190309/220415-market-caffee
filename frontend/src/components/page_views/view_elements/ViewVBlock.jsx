import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { recordIdList } from '../../../utils/utils';
// import { LIST_CONTENT_REQUESTED } from '../../../redux/actions/contentLoading/types';
// import { useSaga } from '../../../redux/saga/contentLoading/createIO';
// import { contentSaga } from '../../../redux/saga/contentLoading/contentLoading';

const ViewVBlock = ({ recordId, viewName, lng }) => {
  // const [state, sagaDispatch] = useSaga()
  const _recordIdList = useRef([]);

  useEffect(() => {
    _recordIdList.current = recordIdList(recordId);
    console.log('ViewVBlock, recordIdList ->', _recordIdList.current);
  }, [recordId]);

  return (
    <div>
      <h4>{recordId}</h4>
      <p>{viewName}</p>
      <h5>{lng}</h5>
    </div>
  );
};

ViewVBlock.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
};

ViewVBlock.propTypes = {
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

export default connect(mapStateToProps)(ViewVBlock);
