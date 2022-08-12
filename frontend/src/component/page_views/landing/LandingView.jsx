import React from 'react'
import { useAppState } from '../../../hooks/react'
import { useAppSelector } from '../../../hooks/reactRedux'
import { Box } from '@mui/material'
// import PropTypes from 'prop-types'

import { structureSelector } from '../../../redux/slices'
import { LandingProvider } from '../../../context'
import ElementSwitcher from '../page_elements/ElementSwitcher'

import * as SZ from '../../../constants/sizes'

const LandingView = () => {
  const [componentName] = useAppState('landing')

  const { loaded } = useAppSelector(structureSelector)
  // console.log('loaded ->', loaded)

  return (
    loaded ?
      <LandingProvider value={{componentName}}
        children={
          <Box
            // className="animate__animated animate__fadeInDown"
            sx={{
              border: SZ.buttonsBorder, borderColor: 'text.disabled', borderRadius: 3,
              display: 'block',
              // display: 'flex',
              justifyContent: 'center',
              py: '.5rem',
            }}
          >
            <ElementSwitcher />
          </Box>
        }
      /> : null
  )
}

LandingView.defaultProps = {}
LandingView.propTypes = {}

export default LandingView