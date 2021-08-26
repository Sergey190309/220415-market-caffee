import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Message, Divider } from 'semantic-ui-react'

import {
  CONTENT_REQUESTED
  // CONTENT_PUT
} from '../../../redux/constants/types'
import { useSaga } from '../../../redux/saga/content/createIO'
import {
  getContentSaga
  // putContentSaga
} from '../../../redux/saga/content/content'
import { deviceSelector, backendUpdateStart, resetBackendUpdate, backendUpdateSelector } from '../../../redux/slices'
import { createContextFromEvent } from './editors/createContextFromEvent' // tested
import ParagraphContextMenu from './editors/ParagraphContextMenu' // tested
import ParagraphEditor from './editors/ParagraphEditor' // tested

const ViewParagraph = ({ initialState, recordId, viewName, lng }) => {
  const [state, getSagaDispatch] = useSaga(getContentSaga, initialState)
  // const [
  //   // eslint-disable-next-line no-unused-vars
  //   result,
  //   putSagaDispatch] = useSaga(putContentSaga, '')
  const [content, setContent] = useState({
    title: '',
    content: ['']
  })

  const [changed, setChanged] = useState(false)
  const [contextMenuOpened, setContextMenuOpened] = useState(false)
  const [paragraphEditted, setParagraphEditted] = useState(false)
  const dispatch = useDispatch()
  const { editable } = useSelector(deviceSelector)
  const { loaded } = useSelector(backendUpdateSelector)

  const contextRef = useRef(null)

  useEffect(() => { // Saga
    // console.log('ViewParagraph, useEffect(getSagaDispatch), recordId ->', recordId)
    getSagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordId,
        view_id: viewName
      }
    })
  }, [recordId, viewName, lng, getSagaDispatch])

  useEffect(() => {
    // console.log('ViewParagraph, useEffect (state to content), editable ->', editable)
    setContent(state)
  }, [state])

  useEffect(() => {
    if (JSON.stringify(state) !== JSON.stringify(content)) {
      setChanged(true)
    }
  }, [content])

  useEffect(() => {
    setChanged(false)
    dispatch(resetBackendUpdate())
  }, [loaded])

  const onContextMenuHendler = event => {
    // console.log('ViewParagraph, onContextMenuHendler')
    event.preventDefault()
    contextRef.current = createContextFromEvent(event)
    setContextMenuOpened(true)
  }

  const saveToBackend = () => {
    // console.log('ViewParagraph, saveToBackend, content ->', content)
    dispatch(backendUpdateStart({
      identity: recordId,
      view_id: viewName,
      // locale_id: lng,
      content: content
    }))
    // putSagaDispatch({
    //   type: CONTENT_PUT,
    //   payload: {
    //     identity: recordId,
    //     view_id: viewName,
    //     // locale_id: lng,
    //     content: content
    //   }
    // })
  }

  const deleteFmBackend = () => {
    /**
     * To send signal one block above to change structure
     */
    console.log('ViewParagraph, deleteFmBackend')
  }
  const addAboveToBacken = () => {
    /**
     * To send signal one block above to change structure
     */
    console.log('ViewParagraph, addAboveToBacken')
  }
  const addBelowToBacken = () => {
    /**
     * To send signal one block above to change structure
     */
    console.log('ViewParagraph, addBelowToBacken')
  }

  return (
    <Fragment>
      {editable
        ? <ParagraphContextMenu
          isOpened={contextMenuOpened}
          // saveDisabled={false}
          saveDisabled={!changed}
          context={contextRef}
          setContextMenuOpened={setContextMenuOpened}
          setParagraphEditted={setParagraphEditted}
          saveToBackend={saveToBackend}
          deleteFmBackend={deleteFmBackend}
          addAboveToBacken={addAboveToBacken}
          addBelowToBacken={addBelowToBacken}
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
