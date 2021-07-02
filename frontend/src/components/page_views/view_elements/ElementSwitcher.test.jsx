import React from 'react'
import { render, screen } from '../../../testUtils'
import ElementSwitcher from './ElementSwitcher'

// jest.mock('./ViewHeader')
// jest.mock('./ViewFooter')
// jest.mock('./ViewVBlock')
// jest.mock('./ViewHBlock')
// jest.mock('./ViewNothing')
describe('ElementSwitcher testing', () => {

  test('it should exist and rendered (snapshot)', () => {
    const result = render(<ElementSwitcher />)
    expect(result).toMatchSnapshot();
    screen.debug()
  });
});