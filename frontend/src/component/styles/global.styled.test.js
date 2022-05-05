import React from 'react'
import renderer from 'react-test-renderer'

import { MainContainer, MainItem } from './global.styled'

describe('global.styled', () => {
  describe('MainContainer', () => {
    test('Snapshot', () => {
      const tree = renderer.create(<MainContainer />).toJSON()
      expect(tree).toMatchSnapshot();
      // console.log('global.styled ->', tree)
      expect(tree).toHaveStyleRule(
        'display', 'grid',
        'grid-template-columns', 'auto'
      )
     })
  })
  describe('MainItem', () => {

  });
});