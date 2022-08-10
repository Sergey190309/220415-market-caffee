import React from 'react'
import { useAppEffect, useAppState, useAppContext } from '../../../../hooks/react'
import PropTypes from 'prop-types'
import { Menu } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  CancelOutlined, EditOutlined, NorthEastOutlined, SaveOutlined,
  SouthEastOutlined, KeyboardArrowUpOutlined, KeyboardArrowDownOutlined
} from '@mui/icons-material'

// import { ViewParagraphContext } from '../../../../context'
import ContextMenuItem from './ContextMenuItem'
import * as CL from '../../../../constants/colors'

const ContextMenu = ({ contextMenu = {}, contextMenuCloseHandler, simpleElement, setTextEdit }) => {
  /**
   * Offer
   * edit element -> switch to editor -> EditorMenu
   * add element above -> add element
   * add upper level element before -> UpperLevelMenu
   * add upper level element after -> UpperLevelMenu
   * save to backend if changed
   * cancel
   */
  const [opened, setOpened] = useAppState(false)
  // const { setEdited } = useAppContext(ViewParagraphContext)
  const { t } = useTranslation('contextMenu')

  useAppEffect(() => {
    setOpened(contextMenu !== null)
  }, [contextMenu])

  const onEditElementHandler = () => {
    // console.log('onEditElementHandler')
    setOpened(false)
    setTextEdit(true)
  }
  const onAddElementHandler = (above) => {
    setOpened(false)
    console.log('onAddElementHandler')
  }
  const onAddUpperElementHandler = (above) => {
    setOpened(false)
    console.log('onAddUpperElementHandler')
  }
  const onSaveHandler = () => {
    setOpened(false)
    console.log('onSaveHandler')
  }
  const onCancelHandler = () => {
    setOpened(false)
    console.log('onCancelHandler')
  }

  const onCloseHandler = () => {
    setOpened(false)
    contextMenuCloseHandler()
  }

  // console.log('ContextMenu, contextMenu ->', contextMenu)

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
      <ContextMenuItem
        title={t('editElement')}
        Icon={EditOutlined}
        onClick={onEditElementHandler} />
      {simpleElement ?
        null
        :
        <div>
          <ContextMenuItem
            title={t('addAbove')}
            Icon={KeyboardArrowUpOutlined}
            onClick={() => { onAddElementHandler(true) }} />
          <ContextMenuItem
            title={t('addBelow')}
            Icon={KeyboardArrowDownOutlined}
            onClick={() => { onAddElementHandler(false) }} />
        </div>
      }
      <ContextMenuItem
        title={t('addUpperAbove')}
        Icon={NorthEastOutlined}
        onClick={() => { onAddUpperElementHandler(true) }} />
      <ContextMenuItem
        title={t('addUpperBelow')}
        Icon={SouthEastOutlined}
        onClick={() => { onAddUpperElementHandler(false) }} />
      <ContextMenuItem
        title={t('save')}
        Icon={SaveOutlined}
        onClick={onSaveHandler} />
      <ContextMenuItem
        title={t('cancel')}
        Icon={CancelOutlined}
        onClick={onCancelHandler} />
    </Menu>
  )
}

ContextMenu.defaultProps = {
  contextMenu: {},
  contextMenuCloseHandler: () => { },
  simpleElement: false,
  setTextEdit: () => { }
}
ContextMenu.propTypes = {
  contextMenu: PropTypes.object,
  contextMenuCloseHandler: PropTypes.func.isRequired,
  simpleElement: PropTypes.bool.isRequired,
  setTextEdit: PropTypes.func.isRequired
}

export default ContextMenu