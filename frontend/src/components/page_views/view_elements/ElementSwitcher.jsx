import React, { Fragment, useState, useEffect, memo } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'

// import { structureSelector, structureResetChanged } from '../../../redux/slices'

import ViewHeader from './ViewHeader'
import ViewFooter from './ViewFooter'
import ViewVBlock from './ViewVBlock'
import ViewHBlock from './ViewHBlock'
import ViewNothing from './ViewNothing'

const MemoViewVBlock = memo(ViewVBlock)

const ElementSwitcher = ({ structureProp, viewName, lng }) => {
  const [structure, setStructure] = useState(structureProp)
  useEffect(() => {
    console.log('ElementSwitcher, useEffect:',
      '\n structureProp ->', structureProp)
    setStructure(structureProp)
    // setStructure({ ...structureProp })
  }, [structureProp])
  // const [structureChanged, setStructureChanged] = useState(false)
  // const dispatch = useDispatch()
  // const { changed } = useSelector(structureSelector)

  // useEffect(() => {
  //   if (changed) {
  //     setStructureChanged(true)
  //     console.log('ElementSwitcher, useEffect:\n changed ->',
  //       changed)
  //   }
  // }, [changed])

  // useEffect(() => {
  //   if (structureChanged) {
  //     setStructureChanged(false)
  //     dispatch(structureResetChanged())
  //   }
  // }, [structureChanged])

  console.log('ElementSwitcher:',
    '\n structure[01] ->', structure['01'],
    '\n structureProp ->', structureProp)
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
      recordsId: recordsId, viewName: viewName, lng: lng
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
  structureProp: {},
  viewName: '',
  lng: ''
}

ElementSwitcher.propTypes = {
  structureProp: PropTypes.object.isRequired,
  viewName: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired
}

export default ElementSwitcher
