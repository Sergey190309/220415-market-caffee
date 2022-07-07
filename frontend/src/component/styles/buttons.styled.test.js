import React from 'react'
import renderer from 'react-test-renderer'
// import { render } from '@testing-library/react'


import { DialogButton } from './buttons.styled'

describe('Button styled', () => {
  test('Button', () => {
    const tree = renderer.create(<DialogButton />).toJSON()
    // console.log('buttons.styled ->', tree)

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule(
      'cursor', 'pointer'
    )
    expect(tree).toHaveStyleRule(
      'color', 'white', {
        modifier: ':hover'
      },
      'background-color', 'palevioletred', {
        modifier: ':hover'
      }
    )
  });
});