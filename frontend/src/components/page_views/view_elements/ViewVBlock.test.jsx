import React from 'react';
import { render } from '@testing-library/react';

import ViewVBlock from './ViewVBlock'

import ViewParagraph from './ViewParagraph';
import ViewPicture from './ViewPicture';
import ViewNothing from './ViewNothing';



describe('ViewVBlock testing', () => {
  const testProps = {
    recordId: '01_vblock_txt_001',
    viewName: 'landing',
    lng: 'en',
    output: jest.fn()
  }

  test('it should call output function with proper args', () => {
    render(<ViewVBlock {...testProps} />)
    console.log('ViewVBlock testing, calling output ->', testProps['output'].mock.calls[0])

  })


  describe('output function testing', () => {
    test('dummy', () => {

    });
  });
});
