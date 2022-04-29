import React from 'react'
import {Button} from 'semantic-ui-react'

const App = () => {
  return (
    <>
      <h1>App</h1>
      <Button
        primary
        content='Save'
      />
      <Button
        secondary
        content='Cancel'
      />
    </>
  )
}

export default App