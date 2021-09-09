import isEmpty from 'lodash/isEmpty'
import React, { useState, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Segment, Container } from 'semantic-ui-react'

import ElementSwitcher from '../view_elements/ElementSwitcher'
import { lngSelector, structureSelector } from '../../../redux/slices'

import { viewSegmentColor } from '../../../utils/colors'

export const getLoadedStructure = (pageName, structures) => {
  /**
   * The function created for testing.
   * Recieve all structures, return one that correspond to the component name
   */
  const { [pageName]: value } = structures
  // console.log('Landing, getLoadedStructure, value ->', value)
  return value || {}
}

const MemoElementSwitcher = memo(ElementSwitcher)

export const Landing = ({ getLoadedStructure }) => {
  const [structure, setStructure] = useState({})
  // const [rerender, setRerender] = useState(false)
  const [componentName] = useState('landing')

  const { lng } = useSelector(lngSelector)
  const { loaded } = useSelector(structureSelector)

  const loadedStructures = useSelector(structureSelector)

  useEffect(() => {
    if (loaded) {
      const newStructure = getLoadedStructure(componentName, loadedStructures)
      console.log('components, Landing:',
        '\n new structure[01] ->', newStructure['01']
      )
      setStructure(newStructure)
      // setStructure({ ...newStructure })
      // setStructure(getLoadedStructure(componentName, loadedStructures))
    }
  }, [loaded, componentName, loadedStructures])

  // useEffect(() => {
  //   if (rerender) {
  //     setRerender(false)
  //   }
  // }, [rerender])
  // }, [loaded, getLoadedStructure, componentName, loadedStructures])

  // console.log('Landing, structure->', structure)
  // const _output = structure => {
  //   return <ElementSwitcher viewName={componentName} structure={structure} lng={lng} />
  // }

  return (
    <Container data-testid='LandingContainer'>
      <Segment color={viewSegmentColor} data-testid='LandingSegment'>
        {isEmpty(structure)
          ? null
          : <MemoElementSwitcher viewName={componentName} structureProp={structure} lng={lng} />}
          {/* : <ElementSwitcher viewName={componentName} structureProp={structure} lng={lng} />} */}
          {/* : _output(structure)} */}
      </Segment>
    </Container>
  )
}

Landing.defaultProps = {
  getLoadedStructure: getLoadedStructure
}

Landing.propTypes = {
  getLoadedStructure: PropTypes.func.isRequired
}

export default Landing
