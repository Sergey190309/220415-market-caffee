import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Message, Divider } from 'semantic-ui-react'

import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/saga/contentLoading/createIO'
import { contentSaga } from '../../../redux/saga/contentLoading/contentLoading'
import { deviceSelector } from '../../../redux/slices'
import { createContextFromEvent } from './editors/createContextFromEvent' // tested
import ParagraphContextMenu from './editors/ParagraphContextMenu' // tested
import ParagraphEditor from './editors/ParagraphEditor' // tested

const ViewParagraph = ({ initialState, recordId, viewName, lng }) => {
  const [state, sagaDispatch] = useSaga(contentSaga, initialState)
  const [content, setContent] = useState({
    title: '',
    content: ['']
  })
  const [changed, setChanged] = useState(false)

  const [contextMenuOpened, setContextMenuOpened] = useState(false)
  const [paragraphEditted, setParagraphEditted] = useState(false)
  const { editable } = useSelector(deviceSelector)

  const contextRef = useRef(null)

  useEffect(() => { // Saga
    // console.log('ViewParagraph, useEffect(sagaDispatch), recordId ->', recordId)
    sagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordId,
        view_id: viewName,
        locale_id: lng
      }
    })
  }, [recordId, viewName, lng, sagaDispatch])

  useEffect(() => {
    // console.log('ViewParagraph, useEffect (state to content), state ->', state)
    setContent(state)
  }, [state])

  useEffect(() => {
    if (JSON.stringify(state) !== JSON.stringify(content)) {
      setChanged(true)
    }
  }, [content])

  const onContextMenuHendler = event => {
    // console.log('ViewParagraph, onContextMenuHendler')
    event.preventDefault()
    contextRef.current = createContextFromEvent(event)
    setContextMenuOpened(true)
  }

  const saveToBackend = () => {
    console.log('ViewParagraph, saveToBackend')
  }

  return (
    <Fragment>
      {editable
        ? <ParagraphContextMenu
          isOpened={contextMenuOpened}
          saveDisabled={!changed}
          context={contextRef}
          setContextMenuOpened={setContextMenuOpened}
          setParagraphEditted={setParagraphEditted}
          saveToBackend={saveToBackend}
        />
        : null
      }
      {paragraphEditted
        ? <ParagraphEditor
          setParagraphEditted={setParagraphEditted}
          comingContent={content}
          setComimgContent={setContent}
          />
        : <Message
            data-testid='Message'
            onContextMenu={editable
              ? onContextMenuHendler
              : null
            }
          >
          <Message.Header content={content.title} />
          {content.title && content.content.length > 0
            ? <Divider />
            : null}
          {content.content.map((item, index) => (
            <Message.Item as='p' key={index}>
              {item}
            </Message.Item>
          ))}
        </Message>
      }
    </Fragment>
  // content={state.content}
  )
}
ViewParagraph.defaultProps = {
  initialState: {
    title: '', // info from back end
    content: ['']
  },
  recordId: '',
  viewName: '',
  lng: ''
}

ViewParagraph.propTypes = {
  initialState: PropTypes.object.isRequired,
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired
}

export default ViewParagraph
