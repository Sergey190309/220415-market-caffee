// import isEmpty from 'lodash/isEmpty'
import React, { useState, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'
import { Segment, Container } from 'semantic-ui-react'
// import styled from 'styled-components'

import ElementSwitcher from '../view_elements/ElementSwitcher'
import {
  // lngSelector,
  structureSelector
} from '../../../redux/slices'

import { viewSegmentColor } from '../../../utils/colors'

// const PaddedButton = styled(Button)`
//   margin: .05em 0em !important;
// `

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
      {/* <Segment>
        <Button.Group vertical>
          <PaddedButton>
            Button1
          </PaddedButton>
          <PaddedButton>
            Button2
          </PaddedButton>
          <PaddedButton>
            Button3
          </PaddedButton>
        </Button.Group>
      </Segment> */}
      <Segment color={viewSegmentColor} data-testid='LandingSegment'
        // style={{ backgroundColor: 'red' }}
      >
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
