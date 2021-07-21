import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import store from '../../redux/store'
import Language, { onChange } from './Language';

describe('Language switcher testing', () => {
  describe('layout', () => {
    test('it exists', () => {
      render(
        <Provider store={store}>
          <Language />
        </Provider>
      );
      const item = screen.getByRole('listbox');
      expect(item).toBeVisible();
    });
  });
  describe('function testing', () => {
    test('onChange testing', () => {
      const value = 'mockValue'
      const setActiveLng =jest.fn()
      const dispatch = jest.fn()

      onChange(value, setActiveLng, dispatch)
      expect(setActiveLng).toHaveBeenCalledTimes(1);
      expect(setActiveLng).toHaveBeenCalledWith(value);
    })
  });
});
