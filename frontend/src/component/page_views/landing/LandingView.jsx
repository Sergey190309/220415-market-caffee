import React from 'react'
import { useAppSelector } from '../../../hooks/reactRedux'
import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

import { structureSelector } from '../../../redux/slices'

const LandingView = () => {

  const { loaded } = useAppSelector(structureSelector)
  console.log('loaded ->', loaded)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: '1rem',
        backgroundColor: 'lightGreen',
        // alignContent: 'center',
        // alignItems: 'center'
      }}
    >
      <Box
        // zIndex={-1}
        className="animate__animated animate__fadeInDown"
        sx={{
          zIndex: 10,
          width: '85%',
          p: '1rem',
          backgroundColor: 'lightBlue',
        }}
      >
        <Typography variant='h4' align='center'>
          LandingView
        </Typography>
      </Box>
    </Box>
  )
}

LandingView.defaultProps = {}
LandingView.propTypes = {}

export default LandingView