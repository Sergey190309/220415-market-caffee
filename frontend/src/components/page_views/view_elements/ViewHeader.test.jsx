import React from 'react';

import { render, screen } from '../../../testUtils';

import ViewHeader from './ViewHeader';
// import { render } from '@testing-library/react';

// jest.mock('axios');

describe('View header testing', () => {
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
    const result = render(<ViewHeader {...testProps} />)
    expect(result).toMatchSnapshot();
  });

  test('it should render with correct text)', () => {
    render(<ViewHeader {...testProps} />)
    const _title = screen.getByText(testProps['initState']['title'])
    expect(_title).toBeInTheDocument()
    const _content = screen.getByText(testProps['initState']['content'])
    expect(_content).toBeInTheDocument()
  });

});
