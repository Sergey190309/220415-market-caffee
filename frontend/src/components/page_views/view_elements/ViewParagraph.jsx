import React, { useState, useEffect, useRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Message, Divider } from 'semantic-ui-react'

import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/saga/contentLoading/createIO'
import { contentSaga } from '../../../redux/saga/contentLoading/contentLoading'
import ParagraphContextMenu from './editors/ParagraphContextMenu'
import ParagraphEditor from './editors/ParagraphEditor'
import { createContextFromEvent } from './editors/createContextFromEvent'

const ViewParagraph = ({ recordId, viewName, lng }) => {
  const [state, sagaDispatch] = useSaga(contentSaga, {
    title: '',
    content: ['']
  })

  const [content, setContent] = useState({
    title: '',
    content: ['']
  })
  const [contextMenuOpened, setContextMenuOpened] = useState(false)
  const [paragraphEditted, setParagraphEditted] = useState(false)

  const contextRef = useRef(null)

  useEffect(() => {
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
    // console.log('ViewParagraph, useEffect, state ->', state)
    setContent(state)
  }, [state])

  const onContextMenuHendler = event => {
    // console.log('ViewParagraph, onContextMenuHendler')
    event.preventDefault()
    contextRef.current = createContextFromEvent(event)
    setContextMenuOpened(true)
  }

  // const spy = something => {
  //   console.log('spy, something ->', something)
  // }

  return (
    <Fragment>
      <ParagraphContextMenu
        isOpened={contextMenuOpened}
        context={contextRef}
        setContextMenuOpened={setContextMenuOpened}
        setParagraphEditted={setParagraphEditted}
      />
      {paragraphEditted
        ? <ParagraphEditor
          shit='shit'
          setParagraphEditted={setParagraphEditted}
          comingContent={content}
          setComimgContent={setContent}
          />
        : <Message onContextMenu={onContextMenuHendler}>
          <Message.Header content={content.title} />
          <Divider />
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
  recordId: '',
  viewName: '',
  lng: ''
}

ViewParagraph.propTypes = {
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired
}

export default ViewParagraph
