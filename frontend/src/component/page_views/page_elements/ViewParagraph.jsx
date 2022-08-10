import React from 'react'
import { useAppState, useAppEffect, useAppContext } from '../../../hooks/react'
import PropTypes from 'prop-types'

import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/contentSaga/createIO'
import { getContentSaga } from '../../../redux/contentSaga/content'
import { LandingContext } from '../../../context'
import ShowText from '../sub_elements/ShowText'
import TextEditor from '../editing/editor/TextEditor'
import { PARAGRAPH } from '../../../constants/textTypes'
// import ShowText from '../sub_elements/ShowText'

const ViewParagraph = ({ recordId, initialState }) => {
  /**
  * Component either ShowText or TextEditor
  * States:
  * state: object - Paragraph content loaded from back-end
  *    using getContentSaga.
  * content: object - Content itself shown on the component.
  *    Updated with useEffect.
  * editting: switch show / edit.
  * edited: mark that parargaph edited but not save to backend.
  */
  const [state, getSagaDispatch] = useSaga(getContentSaga, initialState)
  const [content, setContent] = useAppState({ title: '', content: [''] })
  const [editing, setEditing] = useAppState(false)
  const [edited, setEdited] = useAppState(false)

  const { componentName } = useAppContext(LandingContext)

  useAppEffect(() => {
    getSagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordId,
        view_id: componentName
      }
    })
  }, [])

  useAppEffect(() => {
    setContent(state)
  }, [state])

  // console.log('ViewParagrapn, render, edited ->', edited)
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
          recordId={recordId}
          textType={PARAGRAPH}
          setTextEdit={setEditing}
          parentEdited={edited}
        />
      }
    </>
  )
}

ViewParagraph.defaultProps = {
  recordId: '',
  initialState: {
    title: '', // info from back-end
    content: ['']
  }
}
ViewParagraph.propTypes = {
  recordId: PropTypes.string.isRequired,
  initialState: PropTypes.object.isRequired
}

export default ViewParagraph