import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import {
  getByRole,
  render,
  screen,
  cleanup,
  waitFor,
  // fireEvent,
  // waitFor
} from '@testing-library/react';

import { LogIn, onChange } from './LogIn';

describe('LogIn component testing', () => {
  describe('Non react elements', () => {
    test('onChange function testing', () => {
      const setFormData = jest.fn();
      const formData = {
        email: 'prev@email',
        password: 'prev password',
      };
      const target = {
        name: 'email',
        value: 'new@email',
      };

      onChange(setFormData, formData, target);
      const name = target.name;
      const value = target.value;
      expect(setFormData).toHaveBeenCalledWith({ ...formData, [name]: value });
    });
  });

  const testProps = {
    onCancelClick: jest.fn(),
    onChange: jest.fn(),
    initState: {
      email: '',
      password: '',
    },
  };
  beforeEach(() => {
    render(<LogIn {...testProps} />)
  })
  describe('header testing', () => {
    test('it is snapshot', () => {
      const header = screen.getByRole('heading');
      expect(header).toMatchSnapshot();
    });
  });

  describe('email input testing', () => {
    let emailInputField;
    beforeEach(() => {
      emailInputField = screen.getByRole('textbox', { type: 'email' });
    });

    test('it is snapshot', () => {
      expect(emailInputField).toMatchSnapshot();
    });

    test('props.initState become field value', async () => {
      cleanup();
      const activeProps = {
        ...testProps,
        initState: {
          email: 'test@email.com',
          password: '',
        },
      };
      render(<LogIn {...activeProps} />);
      const _emailInputField = screen.getByRole('textbox', { type: 'email' });
      // console.log('email', _emailInputField.value);
      expect(_emailInputField.value).toBe('test@email.com');
    });
  });

  describe('password input testing', () => {});

  describe('buttons testing', () => {});

  describe('message testing', () => {});
});
