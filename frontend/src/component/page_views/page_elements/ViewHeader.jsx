import React from 'react'
import { useAppState, useAppEffect, useAppContext } from '../../../hooks/react'
import { useAppSelector } from '../../../hooks/reactRedux'
import PropTypes from 'prop-types'
import { Box, Grid, Tooltip, Typography } from '@mui/material'

import { deviceSelector } from '../../../redux/slices'
import { LandingContext } from '../../../context/LandingViewContext'
import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/contentSaga/createIO'
import { getContentSaga } from '../../../redux/contentSaga/content'
import ContextMenu from '../editing/menus/ContextMenu'
import * as CL from '../../../constants/colors'
import * as SZ from '../../../constants/sizes'

const ViewHeader = ({ recordsId, initState }) => {
  /**
   * recordsId 00_header
   * 00 - serial number
   * header - kind of element
   */
  const [contextMenu, setContextMenu] = useAppState(null)
  const [tooltipVisible, setTooltipVisible] = useAppState(false)
  const [state, sagaDispatch] = useSaga(getContentSaga, initState)
  // const viewName = useAppContext(LandingContext)

  const { editable } = useAppSelector(deviceSelector)
  const { componentName } = useAppContext(LandingContext)

  // console.log('ViewHeader, componentName ->', componentName)

  useAppEffect(() => {
    // console.log('ViewHeader\n useEffect[]')
    sagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordsId,
        view_id: componentName
      }
    })
  }, [])

  const onContextMenuHandler = event => {
    event.preventDefault()
    // console.log('ViewHeader, onContextMenuHandler')
    // setTooltipVisible(false)
    if (editable) {
      setContextMenu(
        contextMenu === null
          ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
          : null,
      )
    }
  }

  const contextMenuCloseHandler = () => {
    setContextMenu(null)
  }

  return (
    <Tooltip
      title={recordsId} placement='top' followCursor arrow
      open={tooltipVisible}
      onOpen={() => { setTooltipVisible(editable && true) }}
      onClose={() => { setTooltipVisible(false) }}
    >
      <Box
        onContextMenu={onContextMenuHandler}
        sx={{
          display: 'grid',
          p: '2rem',
          m: '.5rem',
          '&:hover': editable && {
            border: SZ.blockBorder,
            borderColor: CL.attention,
            borderRadius: 3
          }
        }}
      >
        <Grid item>
          <Typography align='center' variant='h4'>
            {state.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1'>
            {state.content}
          </Typography>
        </Grid>
        <ContextMenu contextMenu={editable ? contextMenu : null} contextMenuCloseHandler={contextMenuCloseHandler} />
      </Box>
    </Tooltip>
  )
}

ViewHeader.defaultProps = {
  recordsId: '',
  viewName: '',
  initState: {
    title: '',
    content: ''
  }
}
ViewHeader.propTypes = {
  recordsId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  initState: PropTypes.object.isRequired
}

export default ViewHeader