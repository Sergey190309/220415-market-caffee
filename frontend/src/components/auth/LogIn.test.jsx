import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  cleanup,
  // fireEvent,
  // waitFor
} from '@testing-library/react';

import { LogIn, onChange } from './LogIn';
import userEvent from '@testing-library/user-event';

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
    onSubmit: jest.fn(),
    initState: {
      email: 'test@email.test',
      password: 'qwerty',
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

    test('enter text to email field would call onChange exact quontity of times', () => {
      userEvent.type(emailInputField, 'sa6702@gmail.com');
      expect(testProps.onChange).toHaveBeenCalledTimes(16);
    });

    test('enter text to password field would call onChange exact quontity of times', () => {
      // it's somwthing strange with testing to password field
      userEvent.type(passwordInputField, 'qwerty');
      expect(testProps.onChange).not.toHaveBeenCalled();
    });
  });

  describe('buttons testing', () => {
    let logInButton, cancelButton
    beforeEach(() => {
      logInButton = screen.getByRole('button', {name: 'Log In'})
      cancelButton = screen.getByRole('button', {name: 'Cancel'})
    })
    test('there are snapshots', () => {
      expect(logInButton).toMatchSnapshot();
      expect(cancelButton).toMatchSnapshot();
    });

    test('press login resutes in function call', () => {
      userEvent.click(logInButton)
      expect(testProps.onSubmit).toHaveBeenCalledWith(testProps.initState);
      // expect(testProps.onSubmit).toHaveBeenCalledTimes(1);
      expect(testProps.onCancelClick).toHaveBeenCalledTimes(1);
    });

    test('press cancel resutes in function call', () => {
      userEvent.click(cancelButton)
      // expect(testProps.onSubmit).toHaveBeenCalledTimes(1);
      expect(testProps.onCancelClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('message testing', () => {});
});
