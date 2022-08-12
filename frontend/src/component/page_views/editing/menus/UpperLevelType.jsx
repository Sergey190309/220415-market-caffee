import React, { lazy } from 'react'
import { useAppEffect, useAppState } from '../../../../hooks/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Menu } from '@mui/material'
import {
  ListAltOutlined, VerticalAlignBottom, VerticalAlignTop, ViewColumnOutlined
} from '@mui/icons-material'

import ContextMenuItem from './ContextMenuItem'
import * as CL from '../../../../constants/colors'
const UpperLevelSubType = lazy(()=>import('./UpperLevelSubType'))

const UpperLevelType = ({ upperLevelType, upperLevelTypeCloseHandler }) => {
  /**
   * Upper level element types: header, footer, hblock, vblock.
   * When press on hblock or vblock offer upper level element suptype pix | txt.
   * This component generate upper level componen to add identity also.
   */
  const [opened, setOpened] = useAppState(false)
  const [upperLevelSubType, setUpperLevelSubType] = useAppState(null)
  const { t } = useTranslation('menus')

  useAppEffect(() => {
    setOpened(upperLevelType !== null)
  }, [upperLevelType])

  const setSubType = event => {
    setUpperLevelSubType({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    })
  }

  const onHeaderHandler = () => {
    // console.log('UpperLevelType>onHeaderHandler')
    upperLevelTypeCloseHandler(true)
    setOpened(false)
  }
  const onVBlockHandler = event => {
    // console.log('UpperLevelType>onVBlockHandler')
    setSubType(event)
  }
  const onHBlockHandler = event => {
    // console.log('UpperLevelType>onHBlockHandler')
    setSubType(event)

  }
  const onFooterHandler = () => {
    // console.log('UpperLevelType>onFooterHandler')
    upperLevelTypeCloseHandler(true)
    setOpened(false)
  }

  const onCloseHandler = () => {
    // console.log('UpperLevelType>onCloseHandler')
    upperLevelTypeCloseHandler()
    setOpened(false)
  }

  const upperLevelSubTypeCloseHandler = closeAll => {
    setUpperLevelSubType(null)
    if (closeAll) {
      upperLevelTypeCloseHandler(closeAll)
    }
  }

  return (
    <>
      <Menu
        open={opened}
        anchorReference={'anchorPosition'}
        anchorPosition={upperLevelType !== null ? {
          top: upperLevelType.mouseY, left: upperLevelType.mouseX
        } : undefined}
        onClose={onCloseHandler}
        PaperProps={{
          sx: {
            bgcolor: CL.bodyBackground
          }
        }}
      >
        <ContextMenuItem
          title={t('upperLevelType.header')}
          Icon={VerticalAlignTop}
          onClick={onHeaderHandler}
        />
        <ContextMenuItem
          title={t('upperLevelType.vblock')}
          Icon={ListAltOutlined}
          onClick={onVBlockHandler}
        />
        <ContextMenuItem
          title={t('upperLevelType.hblock')}
          Icon={ViewColumnOutlined}
          onClick={onHBlockHandler}
        />
        <ContextMenuItem
          title={t('upperLevelType.footer')}
          Icon={VerticalAlignBottom}
          onClick={onFooterHandler}
        />
      </Menu>
      <UpperLevelSubType
        upperLevelSubType={upperLevelSubType}
        upperLevelSubTypeCloseHandler={upperLevelSubTypeCloseHandler}
      />
    </>
  )
}

UpperLevelType.defaultProps = {
  upperLevelType: {},
  upperLevelTypeCloseHandler: () => { }
}
UpperLevelType.propTypes = {
  upperLevelType: PropTypes.object,
  upperLevelTypeCloseHandler: PropTypes.func.isRequired
}

export default UpperLevelType