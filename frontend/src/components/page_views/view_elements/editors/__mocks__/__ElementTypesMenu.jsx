/* eslint-disable react/prop-types */
import React from 'react'

export const mockChildComponent = jest.fn()

const ElementTypesMenu = props => {
  console.log('__mocks__/ElementTypesMenu:',
    '\n props ->', props)
  mockChildComponent(props)
  return (
    <div data-testid='ElementTypesMenu'>
      Nothing
    </div>
  )
}

export default ElementTypesMenu
