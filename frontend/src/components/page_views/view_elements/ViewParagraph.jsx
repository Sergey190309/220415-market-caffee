import React, {
  useState, useEffect, useRef, Fragment, useContext
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Message, Divider } from 'semantic-ui-react'
// import { useTranslation } from 'react-i18next'

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
  backendTxtUpdateReady,
  // backendTxtUpdateStart,
  resetBackendUpdate
} from '../../../redux/slices'
import { createContextFromEvent } from '../../../utils/createContext' // tested
import { ViewParagraphProvider, LandingContext } from '../../../context'
import ParagraphContextMenu from './editors/ParagraphContextMenu' // tested
import UpperLevelMenu from './editors/UpperLevelMenu'
import
UpperLevelElementTypesMenu from './editors/UpperLevelElementTypesMenu'
import UpperLevelElementSubtypesMenu from './editors/UpperLevelElementSubtypesMenu'
import SaveToBackendContextMenu from '../../items/SaveToBackendContextMenu'
import ParagraphEditor from './editors/ParagraphEditor' // tested
import Indicator from './indicator/Indicator'

const ViewParagraph = ({
  initialState, recordId
  // viewName
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
   * upperLevelContextMenuOpened: boolean. Open when appropriate button
   *    pressed on context menu.
   * paragraphEditted: boolean - Set close showing, open
   *    textboxes for edition.
   * indicatorOpened: boolean - Set component indicator on and
   *    off respectevily.
   */
  // const { t } = useTranslation('errors')
  const [state, getSagaDispatch] = useSaga(getContentSaga, initialState)
  const [content, setContent] = useState({
    title: '',
    content: ['']
  })
  const [changed, setChanged] = useState(false)
  const [contextMenuOpened, setContextMenuOpened] = useState(false)
  const [upperLevelContextMenuOpened,
    setUpperLevelContextMenuOpened] = useState(false)
  const [
    upperLevelTypeMenuOpened, setUpperLevelTypeMenuOpened
  ] = useState(false)
  const [
    upperLevelSubtypeMenuOpened, setUpperLevelSubtypeMenuOpened
  ] = useState(false)
  const [saveContextMenuOpened,
    setSaveContextMenuOpened] = useState(false)
  const [indicatorOpened, setIndicatorOpened] = useState(false)
  const [paragraphEditted, setParagraphEditted] = useState(false)

  const { editable } = useSelector(deviceSelector)
  const { loaded, kind } = useSelector(backendUpdateSelector)

  const dispatch = useDispatch()

  const contextRef = useRef(null) // place on screen for popup menu
  const indexRef = useRef(null) // index of low level element to handle.
  const addBelowRef = useRef(false) // shows whether add 1 to upper level
  // element handling.
  const upperLevelElementTypeRef = useRef('')

  const addBelow = addBelowArg => {
    addBelowRef.current = addBelowArg
  }
  const setUpperLevelElementType = type => {
    upperLevelElementTypeRef.current = type
  }
  const { componentName: viewName } = useContext(LandingContext)

  useEffect(() => { // Saga
    // console.log('ViewParagraph:',
    //   '\n useEffect[recordId, kind]',
    //   '\n  recordId ->', recordId)
    indexRef.current = +recordId.split('_').pop()
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
    // }, [recordId, kind])
  }, [])

  useEffect(() => {
    // console.log('ViewParagraph:',
    //   '\n useEffect[state]',
    //   '\n  state ->', state,
    //   '\n  content ->', content
    // )
    if (Array.isArray(state.content)) {
      setContent(state)
    } else {
      console.log('  wrong content ->', state.content)
    }
  }, [state])

  useEffect(() => {
    // console.log('ViewParagraph:',
    //   '\n useEffect[content]',
    //   '\n  state ->', state,
    //   '\n  content ->', content
    // )
    if (JSON.stringify(state) !== JSON.stringify(content)) {
      dispatch(backendTxtUpdateReady({
        identity: recordId,
        view_id: viewName,
        content: content
      }))
      setChanged(true)
    } else {
      setChanged(false)
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
      contextRef.current = createContextFromEvent(event)
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

  const upperLevelElementMenu = () => {
    // console.log('ViewParagraph:\n upperLevelElementHandler',
    //   '\n  context ->'
    // )
    setContextMenuOpened(false)
    setUpperLevelContextMenuOpened(true)
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
      context={contextRef}
      content={recordId}
      setIndicatorOpened={setIndicatorOpened}
    />
  )

  const paragraphContextMenu = () => (
    <ParagraphContextMenu
      // isOpened={contextMenuOpened}
      saveDisabled={!changed}
      context={contextRef}
      setMenuOpened={setContextMenuOpened}
      {...{
        upperLevelElementMenu,
        setParagraphEditted
      }}
    />
  )

  const upperLevelContextMenu = () => (
    <UpperLevelMenu
      context={contextRef}
      setMenuOpened={setUpperLevelContextMenuOpened}
      {...{ setUpperLevelTypeMenuOpened, addBelow }}
    />
  )

  const upperLevelElementTypesMenu = () => (
    <UpperLevelElementTypesMenu
      context={contextRef}
      setMenuOpened={setUpperLevelTypeMenuOpened}
      addBelow={addBelowRef.current}
      {...{ setUpperLevelSubtypeMenuOpened, setUpperLevelElementType }}
    />
  )

  const upperLevelElementSubtypesMenu = () => (
    <UpperLevelElementSubtypesMenu
      context={contextRef}
      addBelow={addBelowRef.current}
      upperLevelElementType={upperLevelElementTypeRef.current}
      setMenuOpened={setUpperLevelSubtypeMenuOpened}
    />
  )

  const saveToBackendContextMenu = () => (
    <SaveToBackendContextMenu
      isOpened={saveContextMenuOpened}
      context={contextRef}
      setContextMenuOpened={setSaveContextMenuOpened}
    />
  )

  return (
    <ViewParagraphProvider value={{ index: indexRef.current }}>
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
            {upperLevelContextMenuOpened
              ? upperLevelContextMenu()
              : null
            }
            {upperLevelTypeMenuOpened
              ? upperLevelElementTypesMenu()
              : null
            }
            {upperLevelSubtypeMenuOpened
              ? upperLevelElementSubtypesMenu()
              : null
            }
            {saveContextMenuOpened
              ? saveToBackendContextMenu()
              : null
            }
          </Fragment>
        : normalOutput()
      }
    </ViewParagraphProvider>
  )
}

ViewParagraph.defaultProps = {
  initialState: {
    title: '', // info from back-end
    content: ['']
  },
  recordId: ''
}

ViewParagraph.propTypes = {
  initialState: PropTypes.object.isRequired,
  recordId: PropTypes.string.isRequired
}

export default ViewParagraph
