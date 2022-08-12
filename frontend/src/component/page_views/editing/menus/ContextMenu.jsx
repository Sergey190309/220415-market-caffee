import React from 'react'
import { useAppEffect, useAppState } from '../../../../hooks/react'
import { useAppSelector } from '../../../../hooks/reactRedux'
import PropTypes from 'prop-types'
import { Menu } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  CancelOutlined, EditOutlined, NorthEastOutlined, SaveOutlined, DeleteOutline,
  KeyboardArrowUpOutlined, KeyboardArrowDownOutlined
} from '@mui/icons-material'

// import { ViewParagraphContext } from '../../../../context'
import { deviceSelector } from '../../../../redux/slices'
import ContextMenuItem from './ContextMenuItem'
import * as CL from '../../../../constants/colors'
import UpperLevelMenu from './UpperLevelMenu'

const ContextMenu = ({
  contextMenu = {},
  contextMenuCloseHandler,  //
  simpleElement,
  setTextEdit,
  // setUpperLevelMenu
}) => {
  /**
   * Offer
   * edit element -> switch to editor -> EditorMenu
   * delete element -> delete element
   * add element above -> add element
   * add element before ->
   * add element after ->
   * handl upperLevelElement UpperLevelMenu
   * save to backend if changed
   * cancel
   */
  const [opened, setOpened] = useAppState(false)
  const [upperLevelMenu, setUpperLevelMenu] = useAppState(null)


  const { editable } = useAppSelector(deviceSelector)

  const { t } = useTranslation('menus')

  useAppEffect(() => {
    setOpened(contextMenu !== null)
  }, [contextMenu])

  const onEditElementHandler = () => {
    // console.log('onEditElementHandler')
    setOpened(false)
    setTextEdit(true)
  }
  const onDeleteElementHandler = () => {
    setOpened(false)
    // console.log('onAddElementHandler')
  }
  const onAddElementHandler = (above) => {
    setOpened(false)
    // console.log('onAddElementHandler')
  }
  const onUpperElementHandler = event => {
    // setOpened(false)
    // contextMenuCloseHandler()
    event.preventDefault()
    if (editable) {
      // console.log('ContextMenu>onUpperElementHandler, event ->', event)
      setUpperLevelMenu({
        mouseX: event.clientX + 2,
        mouseY: event.clientY - 6,
      })
    }
  }
  const onSaveHandler =() => {
    setOpened(false)
    // console.log('onSaveHandler')
  }
  const onCancelHandler = () => {
    // event.preventDefault()
    // console.log('ContexMenu>onCancelHandler, event ->', event)
    // if (editable) {
    //   setUpperLevelMenu({
    //     mouseX: event.clientX + 2,
    //     mouseY: event.clientY - 6,
    //   })
    // }
    setOpened(false)
    // console.log('onCancelHandler')
  }

  const onCloseHandler = () => {
    setOpened(false)
    contextMenuCloseHandler()
  }
  const upperLevelMenuCloseHandler = closeAll => {
    setUpperLevelMenu(null)
    if (closeAll) {
      contextMenuCloseHandler()
    }
  }
  // console.log('ContextMenu, contextMenu ->', contextMenu)
  return (
    <>
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
          title={t('contextMenu.editElement')}
          Icon={EditOutlined}
          onClick={onEditElementHandler} />
        {simpleElement ?
          null
          :
          <div>
            <ContextMenuItem
              title={t('contextMenu.deleteElement')}
              Icon={DeleteOutline}
              onClick={onDeleteElementHandler} />
            <ContextMenuItem
              title={t('contextMenu.addAbove')}
              Icon={KeyboardArrowUpOutlined}
              onClick={() => { onAddElementHandler(true) }} />
            <ContextMenuItem
              title={t('contextMenu.addBelow')}
              Icon={KeyboardArrowDownOutlined}
              onClick={() => { onAddElementHandler(false) }} />
          </div>
        }
        <ContextMenuItem
          title={t('contextMenu.handleUpperLevelElement')}
          Icon={NorthEastOutlined}
          onClick={ onUpperElementHandler} />
        {/*<ContextMenuItem
          title={t('addUpperBelow')}
          Icon={SouthEastOutlined}
          onClick={() => { onAddUpperElementHandler(false) }} /> */}
        <ContextMenuItem
          title={t('contextMenu.save')}
          Icon={SaveOutlined}
          onClick={onSaveHandler} />
        <ContextMenuItem
          title={t('contextMenu.cancel')}
          Icon={CancelOutlined}
          onClick={onCancelHandler} />
      </Menu>
      {upperLevelMenu === null ? null :
        <UpperLevelMenu
          upperLevelMenu={upperLevelMenu}
          upperLevelMenuCloseHandler={upperLevelMenuCloseHandler}
        />
      }
    </>
  )
}

ContextMenu.defaultProps = {
  contextMenu: {},
  contextMenuCloseHandler: () => { },
  simpleElement: false,
  setTextEdit: () => { },
  // setUpperLevelMenu: () => { }
}
ContextMenu.propTypes = {
  contextMenu: PropTypes.object, // if not null shows coordinates
  contextMenuCloseHandler: PropTypes.func.isRequired, // set contextMenu to null -> close menu
  simpleElement: PropTypes.bool.isRequired, // true weather element is simple = not blocks
  setTextEdit: PropTypes.func.isRequired, // switch show / edit text
  // setUpperLevelMenu: PropTypes.func.isRequired // switching upper level menu
}

export default ContextMenu