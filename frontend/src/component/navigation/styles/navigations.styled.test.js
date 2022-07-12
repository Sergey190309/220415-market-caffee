import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'

import { NavBarLink, FixedButton } from './navigations.styled'

describe('navigations.styled testing', () => {
  describe('FixedButton', () => {
    test('props', () => {
      const testProps = {
        vertical: { side: 'top', value: '15%' },
        horizontal: {side:'left', value: '10%'}
      }
      const tree = renderer.create(
        <FixedButton {...testProps} />
      ).toJSON()
      // expect(tree).toMatchSnapshot();
      expect(tree).toHaveStyleRule('position', 'fixed')
      expect(tree).toHaveStyleRule('top', '15%')
      expect(tree).toHaveStyleRule('left', '10%')
    })
  })
  describe('NavBarLink', () => {
    test('Snapshot', () => {
      const tree = renderer.create(
        <Router>
          <NavBarLink to='/' />
        </Router>
      ).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
