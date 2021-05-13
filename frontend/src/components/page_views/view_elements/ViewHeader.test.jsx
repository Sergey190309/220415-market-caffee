import React from 'react';
// import axios from 'axios'

// import { render, screen, waitFor } from '../../../testUtils/modifiedRenderReactTesting';
import { render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import ViewHeader from './ViewHeader';
// import { render } from '@testing-library/react';

// jest.mock('axios');

describe('View header testing', () => {
  describe('non react components', () => {});

  describe('react components', () => {
    describe('API activity', () => {
      const mockTitle = 'This is a title!';
      const mockContent = 'There is content here';
      let testProps = {};

      beforeEach(() => {
        const mockGetValues = jest.fn().mockImplementation(() =>
          Promise.resolve({
            title: mockTitle,
            content: mockContent,
          })
        );
        testProps = {
          keys: { view_id: 'landing', identity: 'view_heading' },
          initData: {
            title: '',
            content: '',
          },
          getValues: mockGetValues,
        };
      });

      test('calling API function', async () => {
        render(<ViewHeader {...testProps} />);
        await waitFor(() => {
          const header = screen.getByTestId('header');
          expect(header).toHaveTextContent(mockTitle);

          // console.log(header)
          expect(testProps.getValues).toHaveBeenCalledTimes(1);
          expect(testProps.getValues).toHaveBeenCalledWith(testProps.keys);
          // const header = screen.getByTestId('header')
          // expect(header).toHaveTextContent(mockTitle)
          // expect(header).toHaveClass('ui yellow medium center aligned header', { exact: true })
          // const content = screen.getByTestId('content')
          // expect(content).toHaveTextContent(mockContent)
        });
      });

      test('Having appropriate text in HTML structure', async () => {
        render(<ViewHeader {...testProps} />);
        await waitFor(() => {
          const header = screen.getByTestId('header');
          expect(header).toHaveTextContent(mockTitle);
          expect(header).toHaveClass('ui yellow medium center aligned header', {
            exact: true,
          });
          const content = screen.getByTestId('content');
          expect(content).toHaveTextContent(mockContent);
        });
      });
    });
    describe('appeance', () => {
      const mockTitle = 'This is a title!';
      const mockContent = 'There is content here';
      let testProps = {};

      beforeEach(() => {
        const mockGetValues = jest.fn().mockImplementation(() =>
          Promise.resolve({
            title: mockTitle,
            content: mockContent,
          })
        );
        testProps = {
          keys: { view_id: 'landing', identity: 'view_heading' },
          initData: {
            title: '',
            content: '',
          },
          getValues: mockGetValues,
        };
      });
      test('snapshot', async () => {
        const result = renderer.create(<ViewHeader {...testProps} />).toJSON();
        //   const result = await renderer.create(<ViewHeader {...testProps} />)
        //   const jsonResult = await result.toJSON()
        expect(result).toMatchSnapshot();
        // await waitFor(() => {
        // });
      });
    });
  });
});
