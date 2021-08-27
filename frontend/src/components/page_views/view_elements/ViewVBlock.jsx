import React, { useState, useEffect, Fragment } from 'react'
// import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Container, Divider } from 'semantic-ui-react'

import { makeRecordIdList } from '../../../utils/utils'

import ViewParagraph from './ViewParagraph'
import ViewPicture from './ViewPicture'
import ViewNothing from './ViewNothing'

export const addAbove = recordId => {
  console.log('components, page_view, view_element, ViewVBlock, addAbove, recordId ->', recordId)
}

export const addBelow = recordId => {
  console.log('components, page_view, view_element, ViewVBlock, addBelow, recordId ->', recordId)
}
export const deleteElement = recordId => {
  console.log('components, page_view, view_element, ViewVBlock, deleteElement, recordId ->', recordId)
}

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
    setRecordIdList(makeRecordIdList(recordsId))
  }, [recordsId])

  const props = {
    viewName,
    lng,
    addAboveProp: addAbove,
    addBelowProp: addBelow,
    deleteElementProp: deleteElement
  }
  // console.log('ViewVBlock, recordIdList ->', recordIdList);

  if (recordsId.includes('txt')) {
    return recordIdList.map(txtRecordId => {
      // console.log('ViewVBlock output, recordId ->', recordId)
      return (
        <Fragment key={txtRecordId}>
          <ViewParagraph {...props} recordId={txtRecordId} />
        </Fragment>
      )
    })
  }
  if (recordsId.includes('pix')) {
    // console.log('ViewHBlock, props ->', props)
    return recordIdList.map((pixRecordId, index) => {
      return (
        <Container textAlign='center' key={pixRecordId} >
          <ViewPicture
            {...props}
            recordId={pixRecordId}
            dimension={{ direction: 'horizontal', size: 250 }}
          />
          {index < recordIdList.length - 1 ? <Divider /> : null}
        </Container>
      )
    })
  }
  return <ViewNothing />
}

ViewVBlock.defaultProps = {
  recordsId: '',
  viewName: '',
  lng: ''
}

ViewVBlock.propTypes = {
  recordsId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired
}

// const mapStateToProps = state => ({
//   lng: state.lng,
// });

// const mapDispatchToProps = dispatch => ({
// structureStart: viewName => dispatch(structureStart(viewName)),
// });

export default ViewVBlock
// export default connect(mapStateToProps)(ViewVBlock);
