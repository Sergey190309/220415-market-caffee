import React, { useState, useEffect, Fragment } from 'react'
// import { connect } from 'react-redux';
import {
  useDispatch
  // useSelector
} from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Divider } from 'semantic-ui-react'

import { makeRecordIdList } from '../../../utils/utils'
import {
  backendAddElementStart,
  backendRemoveElementStart
  // lngSelector
} from '../../../redux/slices'

import ViewParagraph from './ViewParagraph'
import ViewPicture from './ViewPicture'
import ViewNothing from './ViewNothing'

export const addElement = (viewName, recordsId, recordIndex, dispatch) => {
  // console.log('components, page_view, view_element, ViewVBlock, add element, \nrecordIndex ->',
  //   recordIndex, ' of ', recordsId)
  dispatch(backendAddElementStart({
    view_id: viewName,
    identity: recordsId,
    index: recordIndex
  }))
}

export const deleteElement = (viewName, recordsId, recordIndex, dispatch) => {
  console.log('components, page_view, view_element, ViewVBlock:\n delete element:\n  recordIndex ->',
    recordIndex, ' of ', recordsId)
  dispatch(backendRemoveElementStart({
    view_id: viewName,
    identity: recordsId,
    index: recordIndex
  }))
}

const ViewVBlock = ({ recordsId, viewName, addElementProp, deleteElementProp }) => {
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
  // const [structureChanged, setStructureChanged] = useState(false)
  // const [language, setLanguage] = useState('')
  // const lng = useSelector(lngSelector)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   setLanguage(lng.lng)
  // }, [lng])
  useEffect(() => {
    const newRecordIdList = makeRecordIdList(recordsId)
    // console.log('ViewVBlock, useEffect[recordsId]:',
    //   '\n newRecordIdList ->', newRecordIdList)
    setRecordIdList(newRecordIdList)
  }, [recordsId])

  const addElement = recordIndex => {
    addElementProp(viewName, recordsId, recordIndex, dispatch)
  }

  const deleteElement = recordIndex => {
    deleteElementProp(viewName, recordsId, recordIndex, dispatch)
  }

  const props = {
    viewName,
    // lng: language,
    addElementProp: addElement,
    deleteElementProp: deleteElement
  }
  // console.log('ViewVBlock:',
  //   '\n language ->', language,
  //   '\n recordIdList ->', recordIdList)

  if (recordsId.includes('txt')) {
    // console.log('ViewVBlock output:',
    //   '\n length ->', recordIdList.length)
    return recordIdList.map(txtRecordId => {
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
  addElementProp: addElement,
  deleteElementProp: deleteElement
}

ViewVBlock.propTypes = {
  recordsId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  addElementProp: PropTypes.func.isRequired,
  deleteElementProp: PropTypes.func.isRequired
}

// const mapStateToProps = state => ({
//   lng: state.lng,
// });

// const mapDispatchToProps = dispatch => ({
// structureStart: viewName => dispatch(structureStart(viewName)),
// });

export default ViewVBlock
// export default connect(mapStateToProps)(ViewVBlock);
