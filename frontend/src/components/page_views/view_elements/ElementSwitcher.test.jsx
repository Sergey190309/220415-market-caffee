import React from 'react';
import { render, screen } from '../../../testUtils';
import ElementSwitcher from './ElementSwitcher';
import { structure } from '../../page_views/landing/Landing.test';
import { ViewHeader } from './ViewHeader';

// jest.mock('./ViewHeader', () => ({
//   ViewHeader: jest.fn(({ children }) => <div data-testid='ViewHeader'>{children}</div>),
// }));
jest.mock('./ViewHeader');
// jest.mock('./ViewFooter');
// jest.mock('./ViewVBlock');
// jest.mock('./ViewHBlock');
// jest.mock('./ViewNothing');

describe('ElementSwitcher testing', () => {
  const testProps = {
    structure: { ...structure, '05': { type: 'wrongType' } },
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
    // expect(ViewHeader).toHaveBeenCalledTimes(1);
    // expect(result).toMatchSnapshot();
    // screen.debug();
    // console.log('ElementSwitcher testing, ViewHeader call ->', ViewHeader.mock.calls)
    // expect(ViewHeader).toHaveBeenCalledWith('')
  });
});
