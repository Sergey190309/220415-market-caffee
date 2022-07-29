import React from 'react'
import { useAppState, useAppEffect } from '../../../hooks/react'
import { useAppSelector } from '../../../hooks/reactRedux'
import { ElementSwitcherProvider } from '../../../context/ElementSwitcherContext'

import PropTypes from 'prop-types'
import { structureSelector } from '../../../redux/slices'

import ViewHeader from './ViewHeader'
import ViewFooter from './ViewFooter'
import ViewVBlock from './ViewVBlock'
import ViewHBlock from './ViewHBlock'
import ViewNothing from './ViewNothing'
import { Box } from '@mui/material'

export const getLoadedStructure = (viewName, structures) => {
  /**
   * Recieve all structures, return one that corresponds
   * to the component name (viewName)
   */
  const { [viewName]: value } = structures
  return value || {}
}

const ElementSwitcher = ({ viewName }) => {
  const [viewStructure, setViewStructure] = useAppState({})

  const loadedStructures = useAppSelector(structureSelector)
  useAppEffect(() => {
    const newStructure = getLoadedStructure(viewName, loadedStructures)
    setViewStructure(newStructure)
  }, [loadedStructures])

  const keys = Object.keys(viewStructure)

  // console.log('rendering, keys ->', keys)

  const output = keys.map((key, index) => {
    const componentType = viewStructure[key].type
    const componentSubType = viewStructure[key].subtype ? viewStructure[key].subtype : null
    const subComponentQnt = viewStructure[key].qnt ? viewStructure[key].qnt : null
    const upperLevelElementId =
      `${key}_${componentType}` +
      (componentSubType ? `_${componentSubType}` : '')
    const recordsId = upperLevelElementId +
      (subComponentQnt ? `_${subComponentQnt}` : '')
    let component
    const props = {
      recordsId,
      viewName
    }
    const value = {
      upperLevelElementId,
      recordsId
    }
    switch (componentType) {
      case 'header':
        component = <ViewHeader {...props} />
        break
      case 'footer':
        component = <ViewFooter {...props} />
        break
      case 'hblock':
        component = <ViewHBlock {...props} />
        break
      case 'vblock':
        component = <ViewVBlock {...props} />
        break
      default:
        component = <ViewNothing {...props} />
    }
    return(
      <ElementSwitcherProvider key={key} value={value}>
        <Box
          display='flex'
        >
          {component}
        </Box>
      </ElementSwitcherProvider>)
    })

  return output
}

ElementSwitcher.defaultProps = {
  viewName: ''
}
ElementSwitcher.propTypes = {
  viewName: PropTypes.string.isRequired
}

export default ElementSwitcher