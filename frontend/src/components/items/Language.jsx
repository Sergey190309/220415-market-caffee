import React from 'react'
import { Flag, Segment, Icon } from 'semantic-ui-react'

const Language = () => {
  return (
    <Segment size='tiny'>
      <Flag name='uk' />
      EN
      <Icon name='angle down'/>
    </Segment>
  )
}

export default Language
