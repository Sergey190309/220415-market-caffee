import React, { lazy } from 'react'
import { useAppState, useAppEffect, useAppContext } from '../../../hooks/react'
import { useAppSelector } from '../../../hooks/reactRedux'
// import PropTypes from 'prop-types'
import { Box } from '@mui/material'

import { LandingContext } from '../../../context'

import {
  structureSelector,
  // deviceSelector
} from '../../../redux/slices'

const ViewHeader = lazy(() => import('./ViewHeader'))
const ViewFooter = lazy(() => import('./ViewFooter'))
const ViewVBlock = lazy(() => import('./ViewVBlock'))
const ViewHBlock = lazy(() => import('./ViewHBlock'))
const ViewNothing = lazy(() => import('./ViewNothing'))

export const getLoadedStructure = (viewName, structures) => {
  /**
   * Recieve all structures, return one that corresponds
   * to the component name (viewName)
   */
  const { [viewName]: value } = structures
  return value || {}
}

const ElementSwitcher = () => {
  const [viewStructure, setViewStructure] = useAppState({})

  const loadedStructures = useAppSelector(structureSelector)
  // const { editable } = useAppSelector(deviceSelector)
  const { componentName } = useAppContext(LandingContext)


  useAppEffect(() => {
    const newStructure = getLoadedStructure(componentName, loadedStructures)
    setViewStructure(newStructure)
  }, [loadedStructures])

  const keys = Object.keys(viewStructure)

  // console.log('rendering, keys ->', keys)

  const Output = () => keys.map((key, index) => {
    const componentType = viewStructure[key].type
    const componentSubType = viewStructure[key].subtype ? viewStructure[key].subtype : null
    const subComponentQnt = viewStructure[key].qnt ? viewStructure[key].qnt : null
    const upperLevelElementId =
      `${key}_${componentType}` +
      (componentSubType ? `_${componentSubType}` : '')
    const recordsId = upperLevelElementId +
      (subComponentQnt ? `_${subComponentQnt}` : '')
    // let component
    const props = {
      key,
      recordsId
    }
    // const value = {
    //   upperLevelElementId,
    //   recordsId
    // }
    switch (componentType) {
      case 'header':
        return <ViewHeader {...props} />
      // component = <ViewHeader {...props} />
      // break
      case 'footer':
        return <ViewFooter {...props} />
      // component = <ViewFooter {...props} />
      // break
      case 'hblock':
        return <ViewHBlock {...props} />
      // component = <ViewHBlock {...props} />
      // break
      case 'vblock':
        return <ViewVBlock {...props} />
      // component = <ViewVBlock {...props} />
      // break
      default:
        return <ViewNothing {...props} />
      // component = <ViewNothing {...props} />
    }
  })

    // console.log('ElementSwitcher, key ->', key, '\n  value ->', value)
  return (
    // <ElementSwitcherProvider key={key} value={value}>
      <Box
        display='block'
        // sx={editable && {
        //   '&:hover': {
        //     border: '1px solid red',
        //     borderRadius: 2
        //     // borderColor: 'red'
        //   }
        // }}
      >
        <Output />
      </Box>
    // </ElementSwitcherProvider>
  )
}

ElementSwitcher.defaultProps = {}
ElementSwitcher.propTypes = {}

export default ElementSwitcher