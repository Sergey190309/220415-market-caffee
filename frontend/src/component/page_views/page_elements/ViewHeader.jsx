import React, { lazy } from 'react'
import { useAppState, useAppEffect, useAppContext } from '../../../hooks/react'
import PropTypes from 'prop-types'

import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { HEADER } from '../../../constants/elementTypes'
import { useSaga } from '../../../redux/contentSaga/createIO'
import { getContentSaga } from '../../../redux/contentSaga/content'
import { LandingContext } from '../../../context'
import ShowText from '../sub_elements/ShowText'
const TextEditor = lazy(()=>import('../editing/editor/TextEditor'))

const ViewHeader = ({ recordsId, initialState }) => {
  /**
   * recordsId 00_header
   * 00 - serial number
   * header - kind of element
   */
  const [state, sagaDispatch] = useSaga(getContentSaga, initialState)
  const [content, setContent] = useAppState(initialState)
  const [editing, setEditing] = useAppState(false)
  const [edited, setEdited] = useAppState(false)

  const { componentName } = useAppContext(LandingContext)

  useAppEffect(() => {
    sagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordsId,
        view_id: componentName
      }
    })
  }, [])
  // console.log(first)
  useAppEffect(() => {
    const tempState = { title: state.title, content: [state.content] }
    // console.log('tempState ->', tempState)
    setContent(tempState)
  }, [state])

  return (
    <>
      {editing ?
        <TextEditor
          contentToEdit={content}
          setParentContent={setContent}
          setTextEdit={setEditing}
          setParentEdited={setEdited}
        />
        :
        <ShowText
          contentToShow={content}
          recordId={recordsId}
          textType={HEADER}
          setTextEdit={setEditing}
          parentEdited={edited}
        />
      }
    </>
  )
}

ViewHeader.defaultProps = {
  // key: '',
  recordsId: '',
  initialState: {
    title: '',
    content: ['']
  }
}
ViewHeader.propTypes = {
  // key: PropTypes.string.isRequired,
  recordsId: PropTypes.string.isRequired,
  initialState: PropTypes.object.isRequired
}

export default ViewHeader