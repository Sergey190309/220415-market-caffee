import React, {
  Fragment,
  useState, useEffect,
  useRef
} from 'react'
import PropTypes from 'prop-types'

import { Form, Segment } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'

import EditorContextMenu from './EditorContextMenu'
import { createContextFromEvent } from '../../../../utils/createContext'
import { warningColor } from '../../../../utils/colors'

const ParagraphEditor = ({
  comingContent,
  setParagraphEditted,
  setComingContent
}) => {
  const [content, setContent] = useState({
    title: '',
    content: '' // conferted from [''] that on site
  })
  const [editorContextMenuOpened, setEditorContextMenuOpened] = useState(false)
  const [changed, setChanged] = useState(false)
  // const [contextMenuOpened, setContextMenuOpened] = useState(false)

  const contextRef = useRef(null)

  useEffect(() => {
    // console.log('ParagraphEditor, useEffect, comingContent ->', comingContent.content)
    const title = comingContent.title ? comingContent.title : ''
    const content = comingContent.content.join('\n')
    setContent({ title, content })
  }, [comingContent])

  const contextMenuAction = (action) => {
    if (action === 'save') {
      // console.log('ParagraphEditor:\n contextMenuAction',
      //   '\n  content ->', content)
      const _text = content.content === ''
        ? []
        : content.content.split('\n')
      const _content = { ...content, content: _text }
      setComingContent(_content)
      setParagraphEditted(false)
    }
    if (action === 'cancel') {
      setParagraphEditted(false)
    }
  }

  const onChangeHandling = event => {
    // const onChangeHandling = (event, { name }) => {
    event.preventDefault()
    const _content = { ...content, [event.target.name]: event.target.value }
    setChanged(true)
    setContent(_content)
  }

  const onContextMenuHendler = event => {
    // console.log('ParagraphEditor, onContextMenuHendler')
    event.preventDefault()
    contextRef.current = createContextFromEvent(event)
    setEditorContextMenuOpened(true)
  }

  return (
    <Fragment>
      <EditorContextMenu
        isOpened={editorContextMenuOpened}
        saveDisabled={!changed}
        context={contextRef}
        setContextMenuOpened={setEditorContextMenuOpened}
        contextMenuAction={contextMenuAction}
      />
      <Segment
        style={{ backgroundColor: warningColor }}
        onContextMenu={onContextMenuHendler}
        data-testid='Segment'
      >
        <Form>
          <TextareaAutosize
            name='title'
            value={content.title}
            autoFocus
            rows={1}
            onChange={onChangeHandling}
            style={{
              fontSize: '1.15em',
              fontWeight: 'bold'
            }}
          />
          <TextareaAutosize
            name='content'
            value={content.content}
            rows={1}
            onChange={onChangeHandling}
          />
        </Form>
      </Segment>

    </Fragment>
  )
}

ParagraphEditor.defaultProps = {
  comingContent: {
    title: '',
    content: ['']
  },
  setParagraphEditted: () => { },
  setComingContent: () => {}
}

ParagraphEditor.propTypes = {
  comingContent: PropTypes.object.isRequired,
  setParagraphEditted: PropTypes.func.isRequired,
  setComingContent: PropTypes.func.isRequired
}

export default ParagraphEditor
