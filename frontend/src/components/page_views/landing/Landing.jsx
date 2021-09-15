// import isEmpty from 'lodash/isEmpty'
import React, { useState, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'
import { Segment, Container } from 'semantic-ui-react'

import ElementSwitcher from '../view_elements/ElementSwitcher'
import {
  // lngSelector,
  structureSelector
} from '../../../redux/slices'

import { viewSegmentColor } from '../../../utils/colors'

const MemoElementSwitcher = memo(ElementSwitcher)

export const Landing = () => {
  const [ready, setReady] = useState(false)
  const [componentName] = useState('landing')

  const { loaded } = useSelector(structureSelector)

  useEffect(() => {
    setReady(loaded)
  }, [loaded])

  return (
    <Container data-testid='LandingContainer'>
      <Segment color={viewSegmentColor} data-testid='LandingSegment'>
        {ready
          ? <MemoElementSwitcher viewName={componentName} />
          : null}
      </Segment>
    </Container>
  )
}

// Landing.defaultProps = {
//   getLoadedStructure: getLoadedStructure
// }

// Landing.propTypes = {
//   getLoadedStructure: PropTypes.func.isRequired
// }

export default Landing
