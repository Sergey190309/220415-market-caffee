import React, { useState, useEffect, Fragment } from 'react'
// import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Container, Divider } from 'semantic-ui-react'

import { makeRecordIdList } from '../../../utils/utils'

import ViewParagraph from './ViewParagraph'
import ViewPicture from './ViewPicture'
import ViewNothing from './ViewNothing'

export const addElement = (recordIndex, recordsId) => {
  console.log('components, page_view, view_element, ViewVBlock, add element, \nrecordIndex ->', recordIndex, ' of ', recordsId)
}

export const deleteElement = (recordIndex, recordsId) => {
  console.log('components, page_view, view_element, ViewVBlock, delete element, \nrecordIndex ->', recordIndex, ' of ', recordsId)
}

const ViewVBlock = ({ recordsId, viewName, lng, addElement, deleteElement }) => {
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

  const addElementProp = recordIndex => {
    addElement(recordIndex, recordsId)
  }

  const deleteElementProp = recordIndex => {
    deleteElement(recordIndex, recordsId)
  }

  const props = {
    viewName,
    lng,
    addElementProp,
    deleteElementProp
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
  lng: '',
  addElement,
  deleteElement
}

ViewVBlock.propTypes = {
  recordsId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  addElement: PropTypes.func.isRequired,
  deleteElement: PropTypes.func.isRequired
}

// const mapStateToProps = state => ({
//   lng: state.lng,
// });

// const mapDispatchToProps = dispatch => ({
// structureStart: viewName => dispatch(structureStart(viewName)),
// });

export default ViewVBlock
// export default connect(mapStateToProps)(ViewVBlock);
