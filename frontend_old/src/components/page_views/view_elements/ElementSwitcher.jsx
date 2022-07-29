import React, { createContext, useState, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { structureSelector } from '../../../redux/slices'
import { ElementSwitcherProvider } from '../../../context'

import ViewHeader from './ViewHeader'
import ViewFooter from './ViewFooter'
import ViewVBlock from './ViewVBlock'
import ViewHBlock from './ViewHBlock'
import ViewNothing from './ViewNothing'

const MemoViewVBlock = memo(ViewVBlock)

export const getLoadedStructure = (viewName, structures) => {
  /**
   * Recieve all structures, return one that corresponds
   * to the component name (ViewName)
   */
  const { [viewName]: value } = structures
  return value || {}
}

export const UpperLevel = createContext()

export const ElementSwitcher = ({
  viewName, getStructure
}) => {
  const [structure, setStructure] = useState({})
  const loadedStructures = useSelector(structureSelector)

  useEffect(() => {
    const newStructure = getStructure(
      viewName, loadedStructures)
    setStructure(newStructure)
  }, [loadedStructures])

  const keys = Object.keys(structure)

  const output = keys.map((key, index) => {
    // console.log('ElementSwitcher: \n keys ->', keys)
    const componentType = structure[key].type
    const componentSubType = structure[key].subtype ? structure[key].subtype : null
    const subComponentQnt = structure[key].qnt ? structure[key].qnt : null
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
        component = <MemoViewVBlock {...props} />
        break
      default:
        component = <ViewNothing {...props} />
    }
    return (
      // <Fragment key={key}>
      <ElementSwitcherProvider key={key} value={value}>
        {component}
        {index < keys.length - 1 ? <Divider /> : null}
      </ElementSwitcherProvider>
      // </Fragment>
    )
  })
  return output
}

ElementSwitcher.defaultProps = {
  viewName: '',
  getStructure: getLoadedStructure
}

ElementSwitcher.propTypes = {
  viewName: PropTypes.string.isRequired,
  getStructure: PropTypes.func.isRequired
}

export default ElementSwitcher
