import React from 'react'
import { Flag, Button, Icon } from 'semantic-ui-react'

const Language = () => {
  return (
    <Button basic>
      <Flag name='uk' />
      EN
      <Icon name='angle down'/>
    </Button>
  )
}

export default Language
