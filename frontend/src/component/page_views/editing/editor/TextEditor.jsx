import React from 'react'
import { useAppState } from '../../../../hooks/react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

import { deviceSelector } from '../../../../redux/slices'
import { useAppSelector } from '../../../../hooks/reactRedux'
import EditorMenu from '../menus/EditorMenu'

const TextEditor = ({ setTextEdit }) => {
  /**
   * Component render instead of edited element while editing.
   */
  const [contextMenu, setContextMenu] = useAppState(null)

  const { editable } = useAppSelector(deviceSelector)

  const onContextMenuHandler = event => {
    // console.log('TextEditor>onContextMenuHandler')
    event.preventDefault()
    if (editable) {
      setContextMenu({
        mouseX: event.clientX + 2,
        mouseY: event.clientY - 6,
      })
    }
  }

  const contextMenuCloseHandler = () => {
    // console.log('ViewHeader, contextMenuCloseHandler')
    setContextMenu(null)
  }
  // console.log('TextEditor, editable ->', editable)

  return (
    <Box
      onContextMenu={editable ? onContextMenuHandler : null}
    // sx={{}}
    >
      TextEditor
      {contextMenu === null ? null :
        <EditorMenu
          contextMenu={editable ? contextMenu : null}
          contextMenuCloseHandler={contextMenuCloseHandler}
          setTextEdit={setTextEdit}
        />}
    </Box>
  )
}

TextEditor.defaultProps = {
  setTextEdit: () => { }
}
TextEditor.propTypes = {
  setTextEdit: PropTypes.func.isRequired
}

export default TextEditor