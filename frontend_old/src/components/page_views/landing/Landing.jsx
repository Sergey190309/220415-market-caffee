import React, { useState, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { Segment, Container } from 'semantic-ui-react'

import { LandingProvider } from '../../../context'
import ElementSwitcher from '../view_elements/ElementSwitcher'
import {
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
    <>
      <Container data-testid='LandingContainer'>
        <Segment color={viewSegmentColor} data-testid='LandingSegment'
        // style={{ backgroundColor: 'red' }}
        >
          <LandingProvider value={{ componentName }}>
            {ready
              ? <MemoElementSwitcher viewName={componentName} />
              : null}
          </LandingProvider>
        </Segment>
      </Container>
    </>
  )
}

export default Landing
