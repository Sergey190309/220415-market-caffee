import React, { useState, useEffect, Fragment } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeRecordIdList } from '../../../utils/utils';

import ViewParagraph from './ViewParagraph';
import ViewPicture from './ViewPicture';
import ViewNothing from './ViewNothing';


export const output = (recordId, viewName, lng, recordIdList) => {
  const props = {
    viewName: viewName,
    lng: lng
  }
  if (recordId.includes('txt')) {
    return recordIdList.map(txtRecordId => {
      // console.log('ViewVBlock output, recordId ->', recordId)
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


const ViewVBlock = ({ recordId, viewName, lng, output }) => {
  // recordId -> 01_vblock_txt_3
  // console.log('ViewVBlock, recordId ->', recordId)
  const [recordIdList, setRecordIdList] = useState([])

  useEffect(() => {
    setRecordIdList(makeRecordIdList(recordId));
    // console.log('ViewVBlock, recordIdList ->', _recordIdList.current);
  }, [recordId]);

  return (
    <Fragment>
      {/* <Output /> */}
      {output(recordId, viewName, lng, recordIdList)}
    </Fragment>
  );
};

ViewVBlock.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
  output: output,
};

ViewVBlock.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  output: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   lng: state.lng,
// });

// const mapDispatchToProps = dispatch => ({
// structureStart: viewName => dispatch(structureStart(viewName)),
// });

export default ViewVBlock;
// export default connect(mapStateToProps)(ViewVBlock);
