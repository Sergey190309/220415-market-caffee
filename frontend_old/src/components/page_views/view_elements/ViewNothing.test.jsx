import React from 'react'
import { render, screen } from '@testing-library/react'
import ViewNothing from './ViewNothing'
describe('ViewNothing testing', () => {
  test('appearance (snapshot)', () => {
    render(<ViewNothing />)
    const viewNothing = screen.getByTestId('ViewNothing')
    expect(viewNothing).toMatchSnapshot()
    // screen.debug()
    // screen.debug(viewNothing)
  })
})
