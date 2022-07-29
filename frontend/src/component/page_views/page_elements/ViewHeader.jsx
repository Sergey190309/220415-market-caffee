import React from 'react'
import { useAppEffect } from '../../../hooks/react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

import { CONTENT_REQUESTED } from '../../../redux/constants/types'
import { useSaga } from '../../../redux/contentSaga/createIO'
import { getContentSaga } from '../../../redux/contentSaga/content'

const ViewHeader = ({ recordsId, viewName, initState }) => {
  /**
   * recordsId 00_header
   * 00 - serial number
   * header - kind of element
   */
  const [state, sagaDispatch] = useSaga(getContentSaga, initState)

  useAppEffect(() => {
    // console.log('ViewHeader\n useEffect[]')
    sagaDispatch({
      type: CONTENT_REQUESTED,
      payload: {
        identity: recordsId,
        view_id: viewName
      }
    })
  }, [])

  return (
    <Box>
      <Typography variant='h4'>
        {state.title}
      </Typography>
      <Typography variant='body1'>
        {state.content}
      </Typography>
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