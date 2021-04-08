import React from 'react';
// import axios from 'axios'

import {
  render,
  connectedLinkedRender,
  screen,
  waitFor,
  act,
} from '../../../testUtils/modifiedRenderReactTesting';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import ViewHeader from './ViewHeader';
// import { render } from '@testing-library/react';

// jest.mock('axios');

describe('View header testing', () => {
  describe('non react components', () => {});

  describe('react components', () => {
    describe('appeance', () => {
      test('it should exist, snapshot', async () => {
        const mockGetValues = jest
          .fn()
          .mockImplementation(() =>
            Promise.resolve({ title: 'Welcome to our nice caffee!', content: null })
          );
        const testProps = {
          keys: { view_id: 'landing', identity: 'view_heading' },
          initData: {
            title: '',
            content: '',
          },
          getValues: mockGetValues,

        };

        render(<ViewHeader {...testProps} />);

        await waitFor(() => {
          expect(testProps.getValues).toHaveBeenCalledTimes(1);
          expect(testProps.getValues).toHaveBeenCalledWith(testProps.keys);
          // console.log(
          //   'getValues, results ->',
          //   testProps.getValues.mock.results[0]
          // );
        });
      });
    });
  });
});
