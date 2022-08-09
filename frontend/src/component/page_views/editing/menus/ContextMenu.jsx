import React from 'react'
import { useAppEffect, useAppState } from '../../../../hooks/react'
import PropTypes from 'prop-types'
import { Menu } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  CancelOutlined, EditOutlined, NorthEastOutlined, SaveOutlined,
  SouthEastOutlined, KeyboardArrowUpOutlined, KeyboardArrowDownOutlined
} from '@mui/icons-material'

import ContextMenuItem from './ContextMenuItem'
import * as CL from '../../../../constants/colors'

const ContextMenu = ({ contextMenu = {}, contextMenuCloseHandler, simpleElement }) => {
  /**
   * Offer
   * edit element -> switch to editor -> EditorMenu
   * add upper level element before -> UpperLevelMenu
   * add upper level element after -> UpperLevelMenu
   * save to backend if changed
   * cancel
   */
  const [opened, setOpened] = useAppState(false)

  useAppEffect(() => {
    setOpened(contextMenu !== null)
  }, [contextMenu])

  const onEditElementHandler = () => {
    setOpened(false)
    console.log('onEditElementHandler')
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

  const { t } = useTranslation('contextMenu')

  console.log('ContextMenu, contextMenu ->', contextMenu)

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
      <ContextMenuItem
        title={t('addAbove')}
        Icon={KeyboardArrowUpOutlined}
        onClick={() => { onAddElementHandler(true) }} />
      <ContextMenuItem
        title={t('addBelow')}
        Icon={KeyboardArrowDownOutlined}
        onClick={() => { onAddElementHandler(false) }} />
      {simpleElement ?
        null
        :
        <div>
          <ContextMenuItem
            title={t('addUpperAbove')}
            Icon={NorthEastOutlined}
            onClick={() => { onAddUpperElementHandler(true) }} />
          <ContextMenuItem
            title={t('addUpperBelow')}
            Icon={SouthEastOutlined}
            onClick={() => { onAddUpperElementHandler(false) }} />
        </div>
      }
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
  simpleElement: false
}
ContextMenu.propTypes = {
  contextMenu: PropTypes.object,
  contextMenuCloseHandler: PropTypes.func.isRequired,
  simpleElement: PropTypes.bool.isRequired
}

export default ContextMenu