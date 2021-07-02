import React, { useEffect } from 'react';
import { render, screen } from '../../../testUtils';
import ElementSwitcher from './ElementSwitcher';
import { structure } from '../../page_views/landing/Landing.test';
import ViewHeader from './ViewHeader';

const MockViewHeader = ({ recordId, viewName, lng }) => {
  return <div data-testid='ViewHeader' />;
  // return <div>mockViewHeader</div>;
};

jest.mock('./ViewHeader', () => ({
  __esModule: true,
  // namedExport: jest.fn(),
  default: jest.fn(),
}));
// jest.mock('./ViewHeader');
// jest.mock('./ViewFooter');
// jest.mock('./ViewVBlock');
// jest.mock('./ViewHBlock');
// jest.mock('./ViewNothing');

describe('ElementSwitcher testing', () => {
  beforeEach(() => {
    ViewHeader.mockImplementation(MockViewHeader);
  });
  const testProps = {
    structure: { '00': { type: 'header' } },
    // structure: { ...structure, '05': { type: 'wrongType' } },
    viewName: 'landing',
    lng: 'en',
  };
  test.skip('it should exist and rendered (snapshot)', () => {
    const result = render(<ElementSwitcher {...testProps} />);
    expect(result).toMatchSnapshot();
    screen.debug();
  });
  test('call children with appropriate props', () => {
    render(<ElementSwitcher {...testProps} />);
    expect(ViewHeader).toHaveBeenCalledTimes(1);
    // screen.debug();
    console.log('ElementSwitcher testing, ViewHeader call ->', ViewHeader.mock.calls[0][0])
    // expect(ViewHeader).toHaveBeenCalledWith('')
  });
});
