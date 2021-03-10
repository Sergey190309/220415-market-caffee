import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  // fireEvent,
  // waitFor
} from '@testing-library/react';

import { LogIn, onChange } from './LogIn';
// import userEvent from '@testing-library/user-event';

describe('LogIn component testing', () => {
  const setFormData = jest.fn();
  const formData = {
    email: 'prev@email',
    password: 'prev password',
  };

  const fieldName = 'email';
  const fieldValue = 'new@email';

  describe('Non react elements', () => {
    test('onChange function testing', () => {
      onChange(setFormData, formData, fieldName, fieldValue);
      expect(setFormData).toHaveBeenCalledWith({ ...formData, [fieldName]: fieldValue });
    });
  });

  const testProps = {
    onCancelClick: jest.fn(),
    onChange: jest.fn(),
    initState: {
      email: 'test',
      password: '',
    },
  };
  beforeEach(() => {
    render(<LogIn {...testProps} />);
  });
  describe('header testing', () => {
    test('it is snapshot', () => {
      const header = screen.getByRole('heading');
      expect(header).toMatchSnapshot();
    });
  });

  describe('email and password inputs testing', () => {
    let emailInputField, passwordInputField;
    beforeEach(() => {
      emailInputField = screen.getByRole('textbox');
      passwordInputField = screen.getByTestId('password');
    });

    test('there are snapshots', () => {
      expect(emailInputField).toMatchSnapshot();
      expect(passwordInputField).toMatchSnapshot();
    });

    test('props.initState become field value', async () => {
      cleanup();
      const activeProps = {
        ...testProps,
        initState: {
          email: 'test@email.com',
          password: 'password',
        },
      };
      render(<LogIn {...activeProps} />);

      const _emailInputField = screen.getByRole('textbox');
      // const _passwordInputField = screen.getByTestId('password');

      // console.log(_passwordInputField.value)
      expect(_emailInputField).toHaveValue('test@email.com');
      // expect(_passwordInputField).toHaveValue('password')
    });

    test('entered text would call onChange with appropriate arguments', () => {
      // userEvent.type(emailInputField, 'sa6702@gmail.com');
      fireEvent.change(emailInputField, { target: { value: 'sa6702@gmail.com' } });
      expect(testProps.onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('password input testing', () => {});

  describe('buttons testing', () => {});

  describe('message testing', () => {});
});
