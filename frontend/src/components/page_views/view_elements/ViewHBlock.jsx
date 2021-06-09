import React, { useState, useEffect, Fragment } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeRecordIdList } from '../../../utils/utils';

import ViewParagraph from './ViewParagraph';
import ViewPicture from './ViewPicture';
import ViewNothing from './ViewNothing';
import { Container, List } from 'semantic-ui-react';

const ViewHBlock = ({ recordId, viewName, lng }) => {
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
          <List.Item key={txtRecordId}>
            <ViewParagraph {...props} recordId={txtRecordId} />
          </List.Item>
        );
      });
    }
    if (recordId.includes('pix')) {
      // console.log('ViewHBlock, props ->', props)
      return recordIdList.map(pixRecordId => {
        return (
          <List.Item key={pixRecordId} >
            <Container fluid textAlign='center'>
              <ViewPicture {...props} recordId={pixRecordId} />
            </Container>
          </List.Item>
        // <Fragment key={pixRecordId} >
        //   <ViewPicture {...props} recordId={pixRecordId} />
        // </Fragment>
        )
      })
    }
    return <ViewNothing />;
  };


  return (
    <Container fluid textAlign='center'>
      <List celled horizontal>
        {output()}
      </List>
    </Container>
  )
}

ViewHBlock.defaultProps = {
  recordId: '',
  viewName: '',
  lng: '',
};

ViewHBlock.propTypes = {
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

export default ViewHBlock;
