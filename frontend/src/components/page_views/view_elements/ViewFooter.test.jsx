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

  test('it should render with correct text)', () => {
    render(<ViewFooter {...testProps} />)
    const _title = screen.getByText(testProps['initState']['title'])
    expect(_title).toBeInTheDocument()
    const _content = screen.getByText(testProps['initState']['content'])
    expect(_content).toBeInTheDocument()
  });

});