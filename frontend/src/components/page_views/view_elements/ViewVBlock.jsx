import React, { useState, useEffect, Fragment } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeRecordIdList } from '../../../utils/utils';

import ViewParagraph from './ViewParagraph';
import ViewPicture from './ViewPicture';
import ViewNothing from './ViewNothing';

const ViewVBlock = ({ recordId, viewName, lng }) => {
  // const [state, sagaDispatch] = useSaga()
  const [recordIdList, setRecordIdList] = useState([])

  useEffect(() => {
    setRecordIdList(makeRecordIdList(recordId));
    // console.log('ViewVBlock, recordIdList ->', _recordIdList.current);
  }, [recordId]);

  const output = () => {
    const props = {
      viewName: viewName,
      lng: lng
    }
    if (recordId.includes('txt')) {
      return recordIdList.map(txtRecordId => {
        return (
          <Fragment key={txtRecordId}>
            <ViewParagraph {...props} recordId={txtRecordId} />
          </Fragment>
        );
      });
    }
    if (recordId.includes('pix')) {
      // console.log('ViewHBlock, props ->', props)
      return recordIdList.map(pixRecordId => {
        return (
          <Fragment key={pixRecordId} >
            <ViewPicture {...props} recordId={pixRecordId} />
          </Fragment>
        )
      })
    }
    return <ViewNothing />;
  };

  return (
    <Fragment>
      {output()}
    </Fragment>
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

// const mapStateToProps = state => ({
//   lng: state.lng,
// });

// const mapDispatchToProps = dispatch => ({
// structureStart: viewName => dispatch(structureStart(viewName)),
// });

export default ViewVBlock;
// export default connect(mapStateToProps)(ViewVBlock);
