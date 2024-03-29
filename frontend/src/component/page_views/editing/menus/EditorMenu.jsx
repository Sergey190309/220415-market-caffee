import React from 'react'
import { useAppState, useAppEffect } from '../../../../hooks/react'
import PropTypes from 'prop-types'
import { Menu } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SaveOutlined, CancelOutlined, EditOutlined } from '@mui/icons-material'


// import { ViewHeaderContext, ViewParagraphContext } from '../../../../context'
import ContextMenuItem from './ContextMenuItem'
import * as CL from '../../../../constants/colors'

const EditorMenu = ({ contextMenu = {}, saveDisabled, menuSaveAction, contextMenuCloseHandler, setTextEdit }) => {
  /**
   * Offer
   * save - could be disabled.
   * cancel
   * back to editing.
   */
  const [opened, setOpened] = useAppState(false)
  const { t } = useTranslation('menus')

  // const { recordId: recordParagraphId, setEdited } = useAppContext(ViewParagraphContext)
  // const { recordId: recordHeaderId, setEdited } = useAppContext(ViewHeaderContext)

  useAppEffect(() => {
    setOpened(contextMenu !== null)
  }, [contextMenu])


  const onSaveHandler = () => {
    // console.log('EditorMenu>onSaveHandler recordParagraphId')
    menuSaveAction()
    contextMenuCloseHandler()
    setTextEdit(false)
  }

  const onCancelHandler = () => {
    contextMenuCloseHandler()
    // console.log('EditorMenu>onCancelHandler')
    setTextEdit(false)
    // setEdited(false)
  }

  const onEditHandler = () => {
    contextMenuCloseHandler()
    // console.log('EditorMenu>onEditHandler')
  }

  const onCloseHandler = () => {
    setOpened(false)
    contextMenuCloseHandler()
  }

  // console.log('EditorMenu, render, contextMenu ->', contextMenu)

  return (
    <Menu
      open={opened}
      anchorReference={'anchorPosition'}
      anchorPosition={contextMenu !== null ? {
        top: contextMenu.mouseY, left: contextMenu.mouseX
      } : undefined}
      onClose={onCloseHandler}
      PaperProps={{
        sx: {
          bgcolor: CL.bodyBackground
        }
      }}
    >
      {/* <h1>Something</h1> */}
      <ContextMenuItem
        disabled={saveDisabled}
        title={t('editorMenu.saveEdited')}
        Icon={SaveOutlined}
        onClick={onSaveHandler}
      />
      <ContextMenuItem
        title={t('editorMenu.cancelEdited')}
        Icon={CancelOutlined}
        onClick={onCancelHandler}
      />
      <ContextMenuItem
        title={t('editorMenu.backEditing')}
        Icon={EditOutlined}
        onClick={onEditHandler}
      />
    </Menu>
  )
}

EditorMenu.defaultProps = {
  contextMenu: {},
  saveDisabled: false,
  menuSaveAction: () => { },
  contextMenuCloseHandler: () => { },
  setTextEdit: () => { }
}
EditorMenu.propTypes = {
  contextMenu: PropTypes.object.isRequired,
  saveDisabled: PropTypes.bool.isRequired,
  menuSaveAction:PropTypes.func.isRequired,
  contextMenuCloseHandler: PropTypes.func.isRequired,
  setTextEdit: PropTypes.func.isRequired
}

export default EditorMenu