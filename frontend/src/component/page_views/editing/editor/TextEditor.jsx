import React, { lazy } from 'react'
import { useAppState, useAppEffect } from '../../../../hooks/react'
import PropTypes from 'prop-types'
import { Box, TextareaAutosize, Typography } from '@mui/material'

import { deviceSelector } from '../../../../redux/slices'
import { useAppSelector } from '../../../../hooks/reactRedux'
// import EditorMenu from '../menus/EditorMenu'
import * as SZ from '../../../../constants/sizes'
import * as CL from '../../../../constants/colors'
const EditorMenu=lazy(()=>import('../menus/EditorMenu'))

const TextEditor = ({
  contentToEdit, // content to show in editor
  setParentContent, // set content on save
  setTextEdit,  // set show/edit switcher
  setParentEdited // set mark that text edited but not saved to backend
}) => {
  /**
   * Component render instead of edited element while editing.
   * Content is adapted for text area {str, str}
   */
  const [content, setContent] = useAppState({ title: '' })
  const [changed, setChanged] = useAppState(false)
  const [contextMenu, setContextMenu] = useAppState(null)

  const { editable } = useAppSelector(deviceSelector)

  useAppEffect(() => {
    const title = contentToEdit.title ? contentToEdit.title : ''
    const content = contentToEdit.content.join('\n')
    setContent({ title, content })
  }, [contentToEdit])

  const onChangeHandler = event => {
    // console.log('TextEditor>onChangeHandler')
    event.preventDefault()
    // const _content = { ...content, [event.target.name]: event.target.value }
    setChanged(true)
    setContent({ ...content, [event.target.name]: event.target.value })
  }

  const onContextMenuHandler = event => {
    // console.log('TextEditor>onContextMenuHandler, event ->', event)
    event.preventDefault()
    if (editable) {
      setContextMenu({
        mouseX: event.clientX + 2,
        mouseY: event.clientY - 6,
      })
    }
  }

  const onMenuSaveAction = () => {
    // console.log('TextEditor>onMenuSaveAction')
    setParentEdited(true)
    setParentContent({
      ...content,
      content: content.content === ''
        ? []
        : content.content.split('\n')
    })
  }

  const contextMenuCloseHandler = () => {
    // console.log('ViewHeader, contextMenuCloseHandler')
    setContextMenu(null)
  }
  // console.log('TextEditor, editable ->', editable)

  return (
    <Box
      display='grid'
      onContextMenu={editable ? onContextMenuHandler : null}
      sx={{
        border: SZ.blockBorder,
        borderColor: CL.attention,
        borderRadius: SZ.blockBorderRadius,
        m: '.25rem',
        p: '.5rem'

      }}
    >
      <TextareaAutosize
        name='title'
        autoFocus
        value={content.title}
        onChange={onChangeHandler}
      />
      <TextareaAutosize
        name='content'
        value={content.content}
        onChange={onChangeHandler}
      />
      {contextMenu === null ? null :
        <EditorMenu
          contextMenu={editable ? contextMenu : null}
          saveDisabled={!changed}
          menuSaveAction={onMenuSaveAction}
          contextMenuCloseHandler={contextMenuCloseHandler}
          setTextEdit={setTextEdit}
        />}
    </Box>
  )
}

TextEditor.defaultProps = {
  contentToEdit: {
    title: '',
    content: ['']
  },
  setParentContent: () => { },
  setTextEdit: () => { },
  setParentEdited: () => { },
}
TextEditor.propTypes = {
  contentToEdit: PropTypes.object.isRequired,
  setParentContent: PropTypes.func.isRequired,
  setTextEdit: PropTypes.func.isRequired,
  setParentEdited: PropTypes.func.isRequired
}

export default TextEditor