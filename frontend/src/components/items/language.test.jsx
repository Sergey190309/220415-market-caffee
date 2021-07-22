import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';

import store from '../../redux/store';
import Language, { onChange } from './Language';
import { initLoadingSuccess } from '../../redux/slices';
import userEvent from '@testing-library/user-event';

describe('Language switcher testing', () => {
  describe('function testing', () => {
    test('onChange testing', () => {
      const mockValue = 'mockValue';
      const mockSetActiveLng = jest.fn();
      const mockDispatch = jest.fn();
      const mockI18next = {
        changeLanguage: jest.fn(),
      };

      onChange(mockValue, mockSetActiveLng, mockDispatch, mockI18next);
      expect(mockSetActiveLng).toHaveBeenCalledTimes(1);
      expect(mockSetActiveLng).toHaveBeenCalledWith(mockValue);

      expect(mockDispatch).toHaveBeenCalledTimes(1);

      expect(mockI18next.changeLanguage).toHaveBeenCalledTimes(1);
      expect(mockI18next.changeLanguage).toHaveBeenCalledWith(mockValue);
    });
  });
  describe('Component', () => {
    const mockProps = {
      onChange: jest.fn(),
      i18next: {
        language: 'ru',
        languages: ['en', 'ru'],
      },
    };

    test('it rendered normal way (snapshot)', () => {
      const { container, rerender } = render(
        <Provider store={store}>
          <Language {...mockProps} />
        </Provider>
      );
      store.dispatch(initLoadingSuccess())
      rerender(
        <Provider store={store}>
          <Language {...mockProps} />
        </Provider>
      )
      expect(container).toMatchSnapshot();
      // screen.debug();
    });

    describe('user action', () => {
      test.only('click', async () => {
        store.dispatch(initLoadingSuccess())
        render(
          <Provider store={store}>
            <Language {...mockProps} />
          </Provider>
        );
        const button = screen.getByRole('listbox')
        expect(button).toBeVisible()
        const dropDown = screen.getAllByRole('option')
        expect(dropDown.length).toBe(2)
        // expect(dropDown[0]).toBeChecked()
        // expect(dropDown[1]).not.toBeChecked()
        // userEvent.click(dropDown[1])
        // await waitFor(() => {
        //   expect(dropDown[0]).toBeChecked()
        // })
        screen.debug();


        // expect(container).toMatchSnapshot()
        // console.log('language.test, user action, click, item ->', item)
      });
    })
  });
});
