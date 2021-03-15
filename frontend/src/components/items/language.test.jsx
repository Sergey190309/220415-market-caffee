import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import { Language } from './Language';

describe('Language switcher testing', () => {
  describe('layout', () => {
    test('it exists', () => {
      render(<Language />);
      const item = screen.getByRole('listbox');
      expect(item).toBeVisible();
    });
  });
});
