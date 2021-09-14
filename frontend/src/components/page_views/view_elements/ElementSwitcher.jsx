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
   * Recieve all structures, return one that correspond
   * to the component name (ViewName)
   */
  const { [viewName]: value } = structures
  // console.log('Landing, getLoadedStructure, value ->', value)
  return value || {}
}

export const ElementSwitcher = ({ viewName, getStructure }) => {
  // const [language, setLanguage] = useState('')
  const [structure, setStructure] = useState({})
  // const lng = useSelector(lngSelector)
  const loadedStructures = useSelector(structureSelector)

  // useEffect(() => {
  //   // console.log('ElementSwitcher, useEffect[lng]:',
  //   //   '\n lng ->', lng)
  //   setLanguage(lng.lng)
  // }, [lng])
  useEffect(() => {
    const newStructure = getStructure(
      viewName, loadedStructures)
    // console.log('ElementSwitcher, useEffect[loadedStructures]:',
    //   '\n structureProp[01] ->', newStructure['01'])
    setStructure(newStructure)
    // setStructure(getLoadedStructure(viewName, loadedStructures))
  }, [loadedStructures])

  // console.log('ElementSwitcher:',
  //   '\n structure ->', structure)
  // '\n language ->', language,
  // '\n (language) ->', typeof language)
  const keys = Object.keys(structure)
  const output = keys.map((key, index) => {
    // console.log('ElementSwitcher: \n keys ->', keys)
    const componentType = structure[key].type
    const componentSubType = structure[key].subtype ? structure[key].subtype : null
    const subComponentQnt = structure[key].qnt ? structure[key].qnt : null
    const recordsId =
      `${key}_${componentType}` +
      (componentSubType ? `_${componentSubType}` : '') +
      (subComponentQnt ? `_${subComponentQnt}` : '')
    // console.log(recordsId)
    let component
    const props = {
      recordsId: recordsId,
      viewName: viewName
      // lng: language
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
  return output
}

ElementSwitcher.defaultProps = {
  // structureProp: {},
  viewName: '',
  getStructure: getLoadedStructure
  // lng: ''
}

ElementSwitcher.propTypes = {
  // structureProp: PropTypes.object.isRequired,
  viewName: PropTypes.string.isRequired,
  getStructure: PropTypes.func.isRequired
  // lng: PropTypes.string.isRequired
}

export default ElementSwitcher
