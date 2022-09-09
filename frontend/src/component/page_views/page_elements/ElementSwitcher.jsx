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

// import ViewHeader from './ViewHeader'
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
  const { componentName } = useAppContext(LandingContext)

  useAppEffect(() => {
    const newStructure = getLoadedStructure(componentName, loadedStructures)
    setViewStructure(newStructure)
  }, [loadedStructures])

  const keys = Object.keys(viewStructure)

  const Output = () => keys.map((key, index) => {
    const componentType = viewStructure[key].type
    const componentSubType = viewStructure[key].subtype ? viewStructure[key].subtype : null
    const subComponentQnt = viewStructure[key].qnt ? viewStructure[key].qnt : null
    const upperLevelElementId =
      `${key}_${componentType}` +
      (componentSubType ? `_${componentSubType}` : '')
    const recordsId = upperLevelElementId +
      (subComponentQnt ? `_${subComponentQnt}` : '')
    const props = {
      key, // for original identity while mapping
      recordsId
    }
    switch (componentType) {
      case 'header':
        return <ViewHeader {...props} />
      case 'footer':
        return <ViewFooter {...props} />
      case 'hblock':
        return <ViewHBlock {...props} />
      case 'vblock':
        return <ViewVBlock {...props} />
      default:
        return <ViewNothing {...props} />
    }
  })

  return (
    <Box
      display='block'
      data-testid='root-box'
      children={<Output />}
    />
 )
}

// ElementSwitcher.defaultProps = {}
// ElementSwitcher.propTypes = {}

export default ElementSwitcher