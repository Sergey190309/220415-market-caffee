import React from 'react'
import { useAppEffect, useAppState } from '../../../../hooks/react'
import { useAppSelector } from '../../../../hooks/reactRedux'
import PropTypes from 'prop-types'
import { Menu } from '@mui/material'
import { CancelOutlined, DeleteOutline, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { deviceSelector } from '../../../../redux/slices'
import ContextMenuItem from './ContextMenuItem'
import * as CL from '../../../../constants/colors'
import UpperLevelType from './UpperLevelType'

const UpperLevelMenu = ({ upperLevelMenu, upperLevelMenuCloseHandler }) => {
  /**
   * add above
   * add below
   * delete
   * cancel
   */
  const [opened, setOpened] = useAppState(false)
  const [upperLevelType, setUpperLevelType] = useAppState(null)

  const { editable } = useAppSelector(deviceSelector)

  const { t } = useTranslation('menus')

  useAppEffect(() => {
    setOpened(upperLevelMenu !== null)
  }, [upperLevelMenu])


  const onAddElementHandler = (event, above) => {
    // console.log('UpperLevelMenu>onAddElementHandler, above ->', above)
    event.preventDefault()
    if (editable) {
      // console.log('ContextMenu>onUpperElementHandler, event ->', event)
      setUpperLevelType({
        mouseX: event.clientX + 2,
        mouseY: event.clientY - 6,
      })
    }
    // setOpened(false)
  }
  const onDeleteHandler = () => {
    // console.log('UpperLevelMenu>onDeleteHandler')
    upperLevelMenuCloseHandler(true)
    setOpened(false)
  }
  const onCancelHandler = () => {
    // console.log('UpperLevelMenu>onCancelHandler')
    setOpened(false)
  }
  const onCloseHandler = () => {
    upperLevelMenuCloseHandler()
    setOpened(false)
  }

  const upperLevelTypeCloseHandler = closeAll => {
    setUpperLevelType(null)
    if (closeAll) {
      upperLevelMenuCloseHandler(closeAll)
    }
  }
  // console.log('UpperLevelMenu, render, upperLevelType ->', upperLevelType)

  return (
    <>
      <Menu
        open={opened}
        anchorReference={'anchorPosition'}
        anchorPosition={upperLevelMenu !== null ? {
          top: upperLevelMenu.mouseY, left: upperLevelMenu.mouseX
        } : undefined}
        onClose={onCloseHandler}
        PaperProps={{
          sx: {
            bgcolor: CL.bodyBackground
          }
        }}
      >
        <ContextMenuItem
          title={t('upperLevelMenu.addAbove')}
          Icon={KeyboardArrowUp}
          // onClick={onAddElementHandler} />
          onClick={(e) => { onAddElementHandler(e, true) }} />
        <ContextMenuItem
          title={t('upperLevelMenu.addBelow')}
          Icon={KeyboardArrowDown}
          onClick={(e) => { onAddElementHandler(e, false) }} />
        <ContextMenuItem
          title={t('upperLevelMenu.delete')}
          Icon={DeleteOutline}
          onClick={onDeleteHandler} />
        <ContextMenuItem
          title={t('upperLevelMenu.cancel')}
          Icon={CancelOutlined}
          onClick={onCancelHandler} />
      </Menu>
      {upperLevelType === null ? null :
        <UpperLevelType
          upperLevelType={upperLevelType}
          upperLevelTypeCloseHandler={upperLevelTypeCloseHandler}
        />
      }
    </>
  )
}

UpperLevelMenu.defaultProps = {
  upperLevelMenu: {},
  upperLevelMenuCloseHandler: () => { }
}
UpperLevelMenu.propTypes = {
  upperLevelMenu: PropTypes.object,
  upperLevelMenuCloseHandler: PropTypes.func.isRequired
}

export default UpperLevelMenu