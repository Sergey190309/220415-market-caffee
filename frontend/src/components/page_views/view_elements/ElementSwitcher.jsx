import React, { Fragment, useState, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'

// import { structureSelector, structureResetChanged } from '../../../redux/slices'
import { structureSelector } from '../../../redux/slices'

// import { HEADER, FOOTER, H_BLOCK, V_BLOCK } from '../../../redux/constants/types'

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
  // console.log('Landing, getLoadedStructure, value ->', value)
  return value || {}
}

export const upperLvlAddElement = () => {
  console.log('ElementSwitcher\n upperLvlAddElement')
}
export const upperLvlRemoveElement = () => {
  console.log('ElementSwitcher\n upperLvlRemoveElement')
}

export const ElementSwitcher = ({
  viewName, getStructure,
  upperLvlAddElementProp, upperLvlDeleteElementProp
}) => {
  // const [language, setLanguage] = useState('')
  const [structure, setStructure] = useState({})
  // const lng = useSelector(lngSelector)
  const loadedStructures = useSelector(structureSelector)

  useEffect(() => {
    const newStructure = getStructure(
      viewName, loadedStructures)
    // console.log('ElementSwitcher, useEffect[loadedStructures]:',
    //   '\n structureProp[01] ->', newStructure['01'])
    setStructure(newStructure)
  }, [loadedStructures])

  const keys = Object.keys(structure)
  const output = keys.map((key, index) => {
    const componentType = structure[key].type
    const componentSubType = structure[key].subtype ? structure[key].subtype : null
    const subComponentQnt = structure[key].qnt ? structure[key].qnt : null
    const recordsId =
      `${key}_${componentType}` +
      (componentSubType ? `_${componentSubType}` : '') +
      (subComponentQnt ? `_${subComponentQnt}` : '')
    let component
    const props = {
      recordsId: recordsId,
      viewName: viewName,
      upperLvlAddElementProp,
      upperLvlDeleteElementProp
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
      <Fragment key={key}>
        {component}
        {index < keys.length - 1 ? <Divider /> : null}
      </Fragment>
    )
  })
  // console.log('output, output ->', output);
  // return (
  //   <Container style={{ backgroundColor: 'blue' }}>
  //     {output}
  //   </Container>
  // )
  return output
}

ElementSwitcher.defaultProps = {
  viewName: '',
  getStructure: getLoadedStructure,
  upperLvlAddElementProp: upperLvlAddElement,
  upperLvlDeleteElementProp: upperLvlRemoveElement
}

ElementSwitcher.propTypes = {
  viewName: PropTypes.string.isRequired,
  getStructure: PropTypes.func.isRequired,
  upperLvlAddElementProp: PropTypes.func.isRequired,
  upperLvlDeleteElementProp: PropTypes.func.isRequired
}

export default ElementSwitcher
