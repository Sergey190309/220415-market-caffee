import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import store from '../../redux/store'
import Language, { onChange } from './Language';

describe('Language switcher testing', () => {
  describe('function testing', () => {
    test('onChange testing', () => {
      const mockValue = 'mockValue'
      const mockSetActiveLng =jest.fn()
      const mockDispatch = jest.fn()
      const mockI18next = {
        changeLanguage: jest.fn()
      }

      onChange(mockValue, mockSetActiveLng, mockDispatch, mockI18next)
      expect(mockSetActiveLng).toHaveBeenCalledTimes(1);
      expect(mockSetActiveLng).toHaveBeenCalledWith(mockValue);

      expect(mockDispatch).toHaveBeenCalledTimes(1);

      expect(mockI18next.changeLanguage).toHaveBeenCalledTimes(1);
      expect(mockI18next.changeLanguage).toHaveBeenCalledWith(mockValue);
    })
  });
  describe('Component', () => {
    const mockProps = {
      onChange: jest.fn(),
      i18next: {
        language: 'ru',
        languages: ['en', 'ru']
      }
    }
    test('it exists', () => {
      render(
        <Provider store={store}>
          <Language {...mockProps} />
        </Provider>
      );
      const item = screen.getByRole('listbox');
      expect(item).toBeVisible();
      screen.debug()
    });
  });
});
