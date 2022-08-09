import React from 'react'
import { useAppState, useAppEffect, useAppContext } from '../../../hooks/react'
import { useAppSelector } from '../../../hooks/reactRedux'
import PropTypes from 'prop-types'
import { Box, Grid, Tooltip, Typography } from '@mui/material'

import { deviceSelector } from '../../../redux/slices'
import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { HEADER } from '../../../constants/textTypes'
import { LandingContext } from '../../../context/LandingViewContext'
import { useSaga } from '../../../redux/contentSaga/createIO'
import { getContentSaga } from '../../../redux/contentSaga/content'
import ContextMenu from '../editing/menus/ContextMenu'
import * as CL from '../../../constants/colors'
import * as SZ from '../../../constants/sizes'
import ShowText from '../sub_elements/ShowText'

const ViewHeader = ({ recordsId, initialState }) => {
  /**
   * recordsId 00_header
   * 00 - serial number
   * header - kind of element
   */
  // const [contextMenu, setContextMenu] = useAppState(null)
  // const [tooltipVisible, setTooltipVisible] = useAppState(false)
  const [state, sagaDispatch] = useSaga(getContentSaga, initialState)
  const [content, setContent] = useAppState(initialState)
  // const viewName = useAppContext(LandingContext)

  // const { editable } = useAppSelector(deviceSelector)
  const { componentName } = useAppContext(LandingContext)

  // console.log('ViewHeader, componentName ->', componentName)

  useAppEffect(() => {
    sagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordsId,
        view_id: componentName
      }
    })
  }, [])

  useAppEffect(() => {
    console.log('ViewHeader>useEffect[state], state ->', state)
    const tempState = { title: state.title, content: [state.content] }
    console.log('  tempState ->', tempState)
    setContent(tempState)
  }, [state])

  return (
    <ShowText
      contentToShow={content}
      recordId={recordsId}
      textType={HEADER}
    />
    // <Tooltip
    //   title={recordsId} placement='top' followCursor arrow
    //   open={tooltipVisible}
    //   onOpen={() => { setTooltipVisible(editable && true) }}
    //   onClose={() => { setTooltipVisible(false) }}
    // >
    //   <Box
    //     onContextMenu={editable ? onContextMenuHandler : null}
    //     sx={{
    //       display: 'grid',
    //       p: '2rem',
    //       m: '.5rem',
    //       '&:hover': editable && {
    //         border: SZ.blockBorder,
    //         borderColor: CL.attention,
    //         borderRadius: 3
    //       }
    //     }}
    //   >
    //     <Grid item>
    //       <Typography align='center' variant='h4'>
    //         {state.title}
    //       </Typography>
    //     </Grid>
    //     <Grid item>
    //       <Typography variant='body1'>
    //         {state.content}
    //       </Typography>
    //     </Grid>
    //     {contextMenu !== null ?
    //       <ContextMenu
    //         contextMenu={editable ? contextMenu : null}
    //         contextMenuCloseHandler={contextMenuCloseHandler}
    //         simpleElement={true}
    //       />
    //       : null}
    //   </Box>
    // </Tooltip>
  )
}

ViewHeader.defaultProps = {
  recordsId: '',
  viewName: '',
  initialState: {
    title: '',
    content: ['']
  }
}
ViewHeader.propTypes = {
  recordsId: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired,
  initialState: PropTypes.object.isRequired
}

export default ViewHeader