import React from 'react';
import { render, screen } from '../../../testUtils';

import ViewFooter from './ViewFooter'

describe('ViewFooter testing', () => {
  const testProps = {
    recordId: 'mockRecordId',
    viewName: 'mockViewName',
    lng: 'mockLng',
    initState: {
      title: 'mockTitle',
      content: 'mockContent',
    },
  };

  test('it should render (snapshot)', () => {
    const result = render(<ViewFooter {...testProps} />)
    expect(result).toMatchSnapshot();
  });
});