import React from 'react'
import { useAppEffect, useAppState } from '../../../../hooks/react'
import { useAppSelector } from '../../../../hooks/reactRedux'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Menu } from '@mui/material'
import { ArticleOutlined, Image } from '@mui/icons-material'

import { deviceSelector } from '../../../../redux/slices'
import ContextMenuItem from './ContextMenuItem'
import * as CL from '../../../../constants/colors'


const UpperLevelSubType = ({ upperLevelSubType, upperLevelSubTypeCloseHandler }) => {
  /**
   * That's upper level elemnet sub type - pix | txt
   */
  const [opened, setOpened] = useAppState(false)
  const { editable } = useAppSelector(deviceSelector)
  const { t } = useTranslation('menus')
  useAppEffect(() => {
    setOpened(upperLevelSubType !== null)
  }, [upperLevelSubType])

  const onTxtHandler = () => {
    // console.log('UpperLevelSubType>onTxtHandler')
    upperLevelSubTypeCloseHandler(true)
    setOpened(false)
  }
  const onPixHandler = () => {
    // console.log('UpperLevelSubType>onPixHandler')
    upperLevelSubTypeCloseHandler(true)
    setOpened(false)
  }
  const onCloseHandler = () => {
    console.log('UpperLevelSubType>onCloseHandler')
    upperLevelSubTypeCloseHandler()
    setOpened(false)
  }

  return (
    <Menu
      open={opened}
      anchorReference={'anchorPosition'}
      anchorPosition={upperLevelSubType !== null ? {
        top: upperLevelSubType.mouseY, left: upperLevelSubType.mouseX
      } : undefined}
      onClose={onCloseHandler}
      PaperProps={{
        sx: {
          bgcolor: CL.bodyBackground
        }
      }}

    >
      <ContextMenuItem
        title={t('upperLevelSubType.txt')}
        Icon={ArticleOutlined}
        onClick={onTxtHandler}
      />
      <ContextMenuItem
        title={t('upperLevelSubType.pix')}
        Icon={Image}
        onClick={onPixHandler}
      />
    </Menu>
  )
}

UpperLevelSubType.defaultProps = {
  upperLevelSubType: {},
  upperLevelSubTypeCloseHandler: () => { }
}
UpperLevelSubType.propTypes = {
  upperLevelSubType: PropTypes.object,
  upperLevelSubTypeCloseHandler: PropTypes.func.isRequired

}

export default UpperLevelSubType