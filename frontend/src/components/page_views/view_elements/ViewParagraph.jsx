import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Message, Divider } from 'semantic-ui-react'

import {
  CONTENT_REQUESTED
} from '../../../redux/constants/types'
import { useSaga } from '../../../redux/saga/content/createIO'
import {
  getContentSaga
  // putContentSaga
} from '../../../redux/saga/content/content'
import {
  deviceSelector, backendUpdateStart,
  resetBackendUpdate, backendUpdateSelector
} from '../../../redux/slices'
import { createContextFromEvent } from './editors/createContextFromEvent' // tested
import ParagraphContextMenu
  from './editors/ParagraphContextMenu' // tested
import ParagraphEditor from './editors/ParagraphEditor' // tested
import Indicator from './indicator/Indicator'

const ViewParagraph = ({
  initialState, recordId, viewName, lng,
  addAboveProp,
  addBelowProp,
  deleteElementProp
}) => {
  /**
   * States:
   * state: object - Paragraph content loaded from back-end using getContentSaga.
   * content: object - Content itself shown on the component. Updated with useEffect.
   * changed: boolean - Indication content was changed from last download or upload.
   *    Updated with useEffect.
   * contextMenuOpened: boolean - Self explain. Open with right button.
   * paragraphEditted: boolean - Set close showing, open textboxes for edition.
   * indicatorOpened: boolean - Set component indicator on and off respectevily.
   * Store state variables.
   * editable: boolean - Admin only can set this variable on admin page.
   * loaded: boolean - Indication whether changed content successfully uploaded to back-end.
   *    Used to set save to back-end context menu disabled.
   */
  const [state, getSagaDispatch] = useSaga(
    getContentSaga, initialState)
  const [content, setContent] = useState({
    title: '',
    content: ['']
  })
  const [changed, setChanged] = useState(false)
  const [contextMenuOpened, setContextMenuOpened] = useState(false)
  const [paragraphEditted, setParagraphEditted] = useState(false)
  const [indicatorOpened, setIndicatorOpened] = useState(false)
  const { editable } = useSelector(deviceSelector)
  const { loaded } = useSelector(backendUpdateSelector)
  const dispatch = useDispatch()

  const contextRef = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => { // Saga
    // console.log('ViewParagraph, useEffect(getSagaDispatch), recordId ->', recordId)
    getSagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordId,
        view_id: viewName
      }
    })
  }, [recordId, viewName, lng])

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

  const onClickHandler = event => {
    // console.log('components, page_view, view_elements, ViewParagraph, identities ->', identities)
    event.preventDefault()
    if (editable) {
      setIndicatorOpened(editable && !indicatorOpened)
      indicatorRef.current = createContextFromEvent(event)
    }
  }

  const onContextMenuHendler = event => {
    // console.log('ViewParagraph, onContextMenuHendler')
    event.preventDefault()
    contextRef.current = createContextFromEvent(event)
    setIndicatorOpened(false)
    setContextMenuOpened(true)
  }

  const NormalOutput = () => (<Message
    onClick={onClickHandler}
    onMouseLeave={() => {
      setIndicatorOpened(false)
      setContextMenuOpened(false)
    }}
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
  </Message>)

  const saveToBackend = () => {
    // console.log('ViewParagraph, saveToBackend, content ->', content)
    dispatch(backendUpdateStart({
      identity: recordId,
      view_id: viewName,
      content: content
    }))
  }
  const addAbove = () => {
    /**
     * To send signal one block above to change structure
     */
    addAboveProp(recordId)
    // console.log('ViewParagraph, addAbove')
  }
  const addBelow = () => {
    /**
     * To send signal one block above to change structure
     */
    addBelowProp(recordId)
    // console.log('ViewParagraph, addBelow')
  }
  const deleteElement = () => {
    /**
     * To send signal one block above to change structure
     */
    deleteElementProp(recordId)
    // console.log('ViewParagraph, deleteFmBackend')
  }

  return (
    <Fragment>
      {editable
        ? paragraphEditted
          ? <ParagraphEditor
            setParagraphEditted={setParagraphEditted}
            comingContent={content}
            setComimgContent={setContent}
          />
          : <ParagraphContextMenu
              isOpened={contextMenuOpened}
              // saveDisabled={false}
              saveDisabled={!changed}
              context={contextRef}
              setContextMenuOpened={setContextMenuOpened}
              setParagraphEditted={setParagraphEditted}
              saveToBackend={saveToBackend}
              deleteElement={deleteElement}
              addAbove={addAbove}
              addBelow={addBelow}
            />
        : null
      }
      <NormalOutput />
      {indicatorOpened
        ? <Indicator
            isOpened={indicatorOpened}
            context={indicatorRef}
            header={viewName}
            // header={identities.recordId}
            content={recordId}
            setIndicatorOpened={setIndicatorOpened}
            // content={identities.viewName}
          />
        : null
      }
    </Fragment>
  )
}
ViewParagraph.defaultProps = {
  initialState: {
    title: '', // info from back end
    content: ['']
  },
  recordId: '',
  viewName: '',
  lng: '',
  addAboveProp: () => {},
  addBelowProp: () => {},
  deleteElementProp: () => {}
}

ViewParagraph.propTypes = {
  initialState: PropTypes.object.isRequired,
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  addAboveProp: PropTypes.func.isRequired,
  addBelowProp: PropTypes.func.isRequired,
  deleteElementProp: PropTypes.func.isRequired
}

export default ViewParagraph
