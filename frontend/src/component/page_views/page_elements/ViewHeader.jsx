import React from 'react'
import { useAppEffect, useAppContext } from '../../../hooks/react'
import { useAppSelector } from '../../../hooks/reactRedux'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'

import { deviceSelector } from '../../../redux/slices'
import { LandingContext } from '../../../context/LandingViewContext'
import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/contentSaga/createIO'
import { getContentSaga } from '../../../redux/contentSaga/content'
import * as CL from '../../../constants/colors'
import * as SZ from '../../../constants/sizes'
import { bgcolor } from '@mui/system'

const ViewHeader = ({ recordsId, initState }) => {
  /**
   * recordsId 00_header
   * 00 - serial number
   * header - kind of element
   */
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

  return (
    <Box
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
    </Box>

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