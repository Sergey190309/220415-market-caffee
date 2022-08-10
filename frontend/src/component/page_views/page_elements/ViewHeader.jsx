import React from 'react'
import { useAppState, useAppEffect, useAppContext } from '../../../hooks/react'
import PropTypes from 'prop-types'

import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { HEADER } from '../../../constants/textTypes'
import { useSaga } from '../../../redux/contentSaga/createIO'
import { getContentSaga } from '../../../redux/contentSaga/content'
import { LandingContext } from '../../../context'
import ShowText from '../sub_elements/ShowText'
import TextEditor from '../editing/editor/TextEditor'

const ViewHeader = ({ recordsId, initialState }) => {
  /**
   * recordsId 00_header
   * 00 - serial number
   * header - kind of element
   */
  // const [contextMenu, setContextMenu] = useAppState(null)
  // const [tooltipVisible, setTooltipVisible] = useAppState(false)
  const [state, sagaDispatch] = useSaga(getContentSaga, initialState)
  const [content, setContent] = useAppState(initialState)
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

  useAppEffect(() => {
    const tempState = { title: state.title, content: [state.content] }
    // console.log('  tempState ->', tempState)
    setContent(tempState)
  }, [state])

  return (
    <>
      {edited ?
        <TextEditor
          setTextEdit={setEdited}
        />
        :
        <ShowText
          contentToShow={content}
          recordId={recordsId}
          textType={HEADER}
          setTextEdit={setEdited}
        />
      }
    </>
  )
}

ViewHeader.defaultProps = {
  recordsId: '',
  initialState: {
    title: '',
    content: ['']
  }
}
ViewHeader.propTypes = {
  recordsId: PropTypes.string.isRequired,
  initialState: PropTypes.object.isRequired
}

export default ViewHeader