import React, { useState, useEffect, Fragment } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeRecordIdList } from '../../../utils/utils';

import ViewParagraph from './ViewParagraph';
import ViewPicture from './ViewPicture';
import ViewNothing from './ViewNothing';


const ViewVBlock = ({ recordsId, viewName, lng }) => {
  /**
   * recordsId structure - 01_vblock_txt_3
   * 01 - serial number
   * vblock - kind of structure
   * txt - kind of structure elements
   * 3 - element qnt
   */
  const [recordIdList, setRecordIdList] = useState([])
  /**
   * recordIdList - list of identities in content table.
   */

  useEffect(() => {
    setRecordIdList(makeRecordIdList(recordsId));
  }, [recordsId]);

  const props = {
    viewName: viewName,
    lng: lng
  }
  // console.log('ViewVBlock, recordIdList ->', recordIdList);

  if (recordsId.includes('txt')) {
    return recordIdList.map(txtRecordId => {
      // console.log('ViewVBlock output, recordId ->', recordId)
      return (
        <Fragment key={txtRecordId}>
          <ViewParagraph {...props} recordId={txtRecordId} />
        </Fragment>
      );
    });
  }
  if (recordsId.includes('pix')) {
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

ViewVBlock.defaultProps = {
  recordsId: '',
  viewName: '',
  lng: '',
};

ViewVBlock.propTypes = {
  recordsId: PropTypes.string.isRequired,
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
