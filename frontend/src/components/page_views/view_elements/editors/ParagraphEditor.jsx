import React, {
  Fragment,
  useState, useEffect,
  useRef
} from 'react'
import PropTypes from 'prop-types'

import { Form, Segment } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'

import EditorContextMenu from './EditorContextMenu'
// import { contentSaga } from '../../../../redux/saga/contentLoading/contentLoading'
import { createContextFromEvent } from './createContextFromEvent'
import { warningColor } from '../../../../utils/colors'

const ParagraphEditor = ({
  setParagraphEditted,
  comingContent,
  setComimgContent
}) => {
  const [content, setContent] = useState({
    title: '',
    content: '' // conferted from [''] that on site
  })
  const [editorContextMenuOpened, setEditorContextMenuOpened] = useState(false)
  // const [contextMenuOpened, setContextMenuOpened] = useState(false)

  const contextRef = useRef(null)
  useEffect(() => {
    // console.log('ParagraphEditor, useEffect, comingContent ->', comingContent)
    const _text = comingContent.content.join('\n')
    const _content = { ...comingContent, content: _text }
    setContent(_content)
  }, [comingContent])

  const contextMenuAction = (action) => {
    // console.log('ParagraphEditor, contextMenuAction, action ->', action)
    if (action === 'save') {
      const _text = content.content.split('\n')
      const _content = { ...content, content: _text }
      setComimgContent(_content)
      setParagraphEditted(false)
    }
    if (action === 'cancel') {
      setParagraphEditted(false)
    }
  }

  const onChangeHandling = event => {
    // const onChangeHandling = (event, { name }) => {
    console.log('ParagraphEditor, onChangeHandling, event.target ->', event.target.name)
    event.preventDefault()
    const _content = { ...content, [event.target.name]: event.target.value }
    setContent(_content)
  }

  const onContextMenuHendler = event => {
    event.preventDefault()
    contextRef.current = createContextFromEvent(event)
    setEditorContextMenuOpened(true)
  }

  return (
    <Fragment>
      <EditorContextMenu
        isOpened={editorContextMenuOpened}
        context={contextRef}
        setContextMenuOpened={setEditorContextMenuOpened}
        contextMenuAction={contextMenuAction}
      />
      <Segment
        style={{ backgroundColor: warningColor }}
        onContextMenu={onContextMenuHendler}
      >
        <Form>
          <TextareaAutosize
            name='title'
            value={content.title}
            autoFocus
            rows='1'
            onChange={onChangeHandling}
            style={{
              fontSize: '1.15em',
              fontWeight: 'bold'
            }}
          />
          <TextareaAutosize
            name='content'
            value={content.content}
            rows={
              content.content ? content.content.length : 1
            }
            onChange={onChangeHandling}
          />
        </Form>
      </Segment>

    </Fragment>
  )
}

ParagraphEditor.defaultProps = {
  setParagraphEditted: () => { },
  comingContent: {
    title: '',
    content: ['']
  },
  setComimgContent: () => {}
}

ParagraphEditor.propTypes = {
  setParagraphEditted: PropTypes.func.isRequired,
  comingContent: PropTypes.object.isRequired,
  setComimgContent: PropTypes.func.isRequired
}

export default ParagraphEditor
