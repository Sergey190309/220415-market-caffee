import React from 'react'
import { useAppState, useAppEffect } from '../../../hooks/react'
import { useAppSelector } from '../../../hooks/reactRedux'
import PropTypes from 'prop-types'
import { Box, Divider, Grid, Tooltip, Typography } from '@mui/material'

import {
  HEADER, PARAGRAPH,
  // FOOTER
} from '../../../constants/textTypes'
import { deviceSelector } from '../../../redux/slices'
import ContextMenu from '../editing/menus/ContextMenu'
import * as SZ from '../../../constants/sizes'
import * as CL from '../../../constants/colors'

const ShowText = ({ contentToShow, recordId, textType, initContent, setTextEdit }) => {
  /**
   * Component shows text title and content according textKind.
   * recordId - shown on hover when application hs been editable.
   * textKind could be:
   * HEADER
   * PARAGRAPH
   * FOOTER
   * content - what to be shown {title: , content:}
   * textStyling - how to show content {}
   *
   */
  const [content, setContent] = useAppState(initContent)
  const [textStyling, setTextStyling] = useAppState({})
  const [tooltipVisible, setTooltipVisible] = useAppState(false)
  const [contextMenu, setContextMenu] = useAppState(null)

  const { editable } = useAppSelector(deviceSelector)

  useAppEffect(() => {
    setContent(contentToShow)
  }, [contentToShow])

  useAppEffect(() => {
    switch (textType) {
      case HEADER:
        setTextStyling({
          titleVariant: 'h4',
          contentVariant: 'body1',
          divider: false,
          simpleElement: true,
          boxStyle: {
            display: 'grid',
            justifyContent: 'center',
            p: '2rem',
            m: '.5rem',
            '&:hover': editable && {
              border: SZ.blockBorder,
              borderColor: CL.attention,
              borderRadius: 3
            }
          }
        })
        break
      default: // PARAGRAPH
        setTextStyling({
          titleVariant: 'h6',
          contentVariant: 'body2',
          divider: true,
          simpleElement: false,
          boxStyle: {
            border: SZ.blockBorder, borderColor: 'text.disabled', borderRadius: 3,
            m: '.25rem',
            p: '.5rem',
            '&:hover': editable && {
              borderColor: CL.attention
            }
          }
        })
    }
  }, [editable, textType])


  const onContextMenuHandler = event => {
    // console.log('ShowText>onContextMenyHandler')
    event.preventDefault()
    if (editable) {
      setContextMenu({
        mouseX: event.clientX + 2,
        mouseY: event.clientY - 6,
      })
    }
  }

  const contextMenuCloseHandler = () => {
    console.log('ViewHeader, contextMenuCloseHandler')
    setContextMenu(null)
  }

  return (
    <Tooltip
      title={recordId} placement='top' followCursor arrow
      open={tooltipVisible}
      onOpen={() => { setTooltipVisible(editable && true) }}
      onClose={() => { setTooltipVisible(false) }}
    >
      <Box
        onContextMenu={editable ? onContextMenuHandler : null}
        sx={textStyling.boxStyle}
      >
        <Grid item>
          <Typography variant={textStyling.titleVariant}>
            {content.title}
          </Typography>
        </Grid>
        <Grid item>
          {content.title && textStyling.divider && content.content.length > 0
            ? <Divider />
            : null}
          {content.content.map((item, index) => (
            <Typography key={index} variant={textStyling.contentVariant}>
              {item}
            </Typography>
          ))}
        </Grid>
        {contextMenu === null ? null :
          <ContextMenu
            contextMenu={editable ? contextMenu : null}
            contextMenuCloseHandler={contextMenuCloseHandler}
            simpleElement={textStyling.simpleElement}
            setTextEdit={setTextEdit}
          />}
      </Box>
    </Tooltip>
  )
}
ShowText.defaultProps = {
  contentToShow: {
    title: '',
    content: ['']
  },
  recordId: '',
  textType: PARAGRAPH,
  initContent: {
    title: '',
    content: ['']
  },
  setTextEdit: () => { }
}
ShowText.propTypes = {
  contentToShow: PropTypes.object.isRequired,
  recordId: PropTypes.string.isRequired,
  textType: PropTypes.string.isRequired,
  initContent: PropTypes.object.isRequired,
  setTextEdit: PropTypes.func.isRequired
}

export default ShowText