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
} from '../../../redux/saga/content/content'
import {
  deviceSelector,
  backendUpdateSelector,
  backendTxtUpdateReady, backendTxtUpdateStart,
  resetBackendUpdate
} from '../../../redux/slices'
import { createContextFromEvent } from '../../../utils/createContextFromEvent' // tested
import ParagraphContextMenu
  from './editors/ParagraphContextMenu' // tested
import SaveToBackendContextMenu from '../../items/SaveToBackendContextMenu'
import ParagraphEditor from './editors/ParagraphEditor' // tested
import Indicator from './indicator/Indicator'

const ViewParagraph = ({
  initialState, recordId, viewName,
  addElementProp, deleteElementProp
}) => {
  /**
   * States:
   * state: object - Paragraph content loaded from back-end
   *    using getContentSaga.
   * content: object - Content itself shown on the component.
   *    Updated with useEffect.
   * changed: boolean - Indication content was changed from last
   *    download or upload. Updated with useEffect.
   * contextMenuOpened: boolean - Self explain. Open with right
   *    button.
   * paragraphEditted: boolean - Set close showing, open
   *    textboxes for edition.
   * indicatorOpened: boolean - Set component indicator on and
   *    off respectevily.
   * Store state variables.
   * editable: boolean - Admin only can set this variable on
   *    admin page.
   * loaded: boolean - Indication whether changed content
   *    successfully uploaded to back-end. Used to set save to
   *    back-end context menu disabled.
   */
  const [state, getSagaDispatch] = useSaga(
    getContentSaga, initialState)
  const [content, setContent] = useState({
    title: '',
    content: ['']
  })
  const [changed, setChanged] = useState(false)
  const [contextMenuOpened, setContextMenuOpened] = useState(false)
  const [saveContextMenuOpened, setSaveContextMenuOpened] = useState(false)
  const [indicatorOpened, setIndicatorOpened] = useState(false)
  const [paragraphEditted, setParagraphEditted] = useState(false)

  const { editable } = useSelector(deviceSelector)
  const { loaded, kind } = useSelector(backendUpdateSelector)

  const dispatch = useDispatch()

  const contextRef = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => { // Saga
    // console.log('ViewParagraph, useEffect(getSagaDispatch), recordId ->', recordId)
    if (kind === '') {
      setChanged(false)
      getSagaDispatch({
        type: CONTENT_REQUESTED,
        payload: {
          identity: recordId,
          view_id: viewName
        }
      })
    }
  }, [recordId, viewName, kind])

  useEffect(() => {
    setContent(state)
  }, [state])

  useEffect(() => {
    if (JSON.stringify(state) !== JSON.stringify(content)) {
      dispatch(backendTxtUpdateReady({
        identity: recordId,
        view_id: viewName,
        content: content
      }))
      setChanged(true)
    }
  }, [content])

  useEffect(() => {
    if (changed) {
      setChanged(false)
      dispatch(resetBackendUpdate())
    }
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
    event.preventDefault()
    contextRef.current = createContextFromEvent(event)
    setIndicatorOpened(false)
    if (kind === '') { setContextMenuOpened(true) } else {
      if (changed) {
        setContextMenuOpened(true)
      } else {
        setSaveContextMenuOpened(true)
      }
    }
  }

  const saveToBackend = () => {
    dispatch(backendTxtUpdateStart())
  }
  const addAbove = () => {
    /**
     * To send signal one module above to change structure
     */
    const recordIndex = parseInt(recordId.split('_').pop())
    if (isNaN(recordIndex)) {
      console.log('Unable to parse recordId for index')
    } else { addElementProp(recordIndex) }
  }
  const addBelow = () => {
    /**
     * To send signal one module above to change structure
     */
    const recordIndex = parseInt(recordId.split('_').pop())
    if (isNaN(recordIndex)) {
      console.log('Unable to parse recordId for index')
    } else { addElementProp(recordIndex + 1) }
  }
  const deleteElement = () => {
    /**
     * To send signal one module above to change structure
     */
    const recordIndex = parseInt(recordId.split('_').pop())
    // console.log('ViewParagraph, deleteFmBackend')
    if (isNaN(recordIndex)) {
      console.log('Unable to parse recordId for index')
    } else { deleteElementProp(recordIndex) }
  }

  const normalOutput = () => (
    <Message
      onContextMenu={editable
        ? onContextMenuHendler
        : null
      }
      onClick={onClickHandler}
      data-testid='Message'
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
  )

  const paragraphEditor = () => (
    <ParagraphEditor
      setParagraphEditted={setParagraphEditted}
      comingContent={content}
      setComingContent={setContent}
    />
  )

  // console.log('ViewParagraph:\n indicator',
  //   '\n  indicatorOpened ->', indicatorOpened)
  const indicator = () => (
    <Indicator
      isOpened={indicatorOpened}
      context={indicatorRef}
      header={viewName}
      content={recordId}
      setIndicatorOpened={setIndicatorOpened}
    />
  )

  const paragraphContextMenu = () => (
    <ParagraphContextMenu
      // isOpened={contextMenuOpened}
      saveDisabled={!changed}
      context={contextRef}
      setContextMenuOpened={setContextMenuOpened}
      setParagraphEditted={setParagraphEditted}
      saveToBackend={saveToBackend}
      deleteElement={deleteElement}
      addAbove={addAbove}
      addBelow={addBelow}
    />
  )

  // console.log('ViewParagraph:\n saveToBackendContextMenu')
  const saveToBackendContextMenu = () => (
    <SaveToBackendContextMenu
      isOpened={saveContextMenuOpened}
      context={contextRef}
      setContextMenuOpened={setSaveContextMenuOpened}
    />
  )

  return (
    <Fragment>
      {editable
        ? paragraphEditted
          ? paragraphEditor()
          : <Fragment>
            {normalOutput()}
            {indicatorOpened
              ? indicator()
              : null
            }
            {contextMenuOpened
              ? paragraphContextMenu()
              : null
            }
            {saveContextMenuOpened
              ? saveToBackendContextMenu()
              : null
            }
          </Fragment>
        : normalOutput()
      }
    </Fragment>
  )
}

ViewParagraph.defaultProps = {
  initialState: {
    title: '', // info from back-end
    content: ['']
  },
  recordId: '',
  viewName: '',
  addElementProp: () => { },
  deleteElementProp: () => { }
}

ViewParagraph.propTypes = {
  initialState: PropTypes.object.isRequired,
  recordId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  addElementProp: PropTypes.func.isRequired,
  deleteElementProp: PropTypes.func.isRequired
}

export default ViewParagraph
