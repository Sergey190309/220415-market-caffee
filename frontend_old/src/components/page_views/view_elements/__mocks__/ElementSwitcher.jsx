import React from 'react'

export const ElementSwitcher = ({ viewName, structure, lng }) => {
  // console.log('mockElementSwitcher, viewName ->', viewName)
  return (
    <div data-testid='ElementSwitcher'>
      ElementSwitcher
      {JSON.stringify(structure)}
      {viewName}
      {lng}
    </div>
  )
}

export default ElementSwitcher
