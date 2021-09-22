import React, { createContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Divider } from 'semantic-ui-react'

import { makeRecordIdList } from '../../../utils/utils'
import {
  backendAddElementStart,
  backendRemoveElementStart
} from '../../../redux/slices'

import ViewParagraph from './ViewParagraph'
import ViewPicture from './ViewPicture'
import ViewNothing from './ViewNothing'

export const UpperLeverElementId = createContext()

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
  // console.log('components, page_view, view_element, ViewVBlock:',
  //   '\n delete element:\n  recordIndex ->',
  //   recordIndex, ' of ', recordsId)
  dispatch(backendRemoveElementStart({
    view_id: viewName,
    identity: recordsId,
    index: recordIndex
  }))
}

const ViewVBlock = ({
  recordsId, viewName, addElementProp, deleteElementProp
  // upperLvlAddElementProp, upperLvlDeleteElementProp
}) => {
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

  const dispatch = useDispatch()

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
    addElementProp: addElement,
    deleteElementProp: deleteElement
  }

  if (recordsId.includes('txt')) {
    return recordIdList.map(txtRecordId => {
      return (
        <UpperLeverElementId.Provider key={txtRecordId} value={recordsId}>
          <ViewParagraph {...props} recordId={txtRecordId} />
        </UpperLeverElementId.Provider>
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

export default ViewVBlock
