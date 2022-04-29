import React from 'react'

import TestRenderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  test('Snapshot', () => {
    // const something = TestRenderer
    const element = TestRenderer.create(<App />)

    expect(element).toMatchSnapshot()
    // await waitFor(() => {

    // })
    // console.log('App ->', container)
    // screen.debug()
    // const tree = component.toJSON()
    // expect(tree).toMatchSnapshot()
  })
  test('Structure', () => {
    render(<App />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent("That's button!")
    // screen.debug()
  })
})
