import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import {
  // render,
  screen,
  cleanup,
  connectedRender,
  // fireEvent,
  // waitFor
} from '../../testUtils/connectedRenderer'
// '@testing-library/react';

import LogIn from './LogIn';
import userEvent from '@testing-library/user-event';

describe('LogIn component testing', () => {
  const setFormData = jest.fn();
  const formData = {
    email: 'prev@email',
    password: 'prev password',
  };

  const fieldName = 'email';
  const fieldValue = 'new@email';


  const testProps = {
    initValues: {},
    logInSchema: jest.fn(),
    onSubmit: jest.fn(),
    setModalOpened: jest.fn(),
    setModalClosed:jest.fn()
  };
  beforeEach(() => {
    connectedRender(<LogIn {...testProps} />);
  });
  describe('header and footer testing', () => {
    test('these are snapshots', () => {
      const header = screen.getAllByRole('heading')
      // await screen.findByRole();
      expect(header.length).toBe(2);
      expect(header[0]).toMatchSnapshot();
      expect(header[1]).toMatchSnapshot();
    });
  });

  describe('email and password inputs testing', () => {
    let emailInputField, passwordInputField;
    beforeEach(() => {
      emailInputField = screen.getByRole('textbox');
      passwordInputField = screen.getByTestId('input-password');
    });

    test('there are snapshots', () => {
      expect(emailInputField).toMatchSnapshot();
      expect(passwordInputField).toMatchSnapshot();
    });

    test.only('props.initState become field value', () => {
      cleanup();
      const activeProps = {
        ...testProps,
        initState: {
          email: 'test@email.com',
          password: '',
        },
      };
      connectedRender(<LogIn {...activeProps} />);

      const _emailInputField = screen.getByRole('textbox', {name: 'labels.email'});
      // const _emailInputField = screen.getByRole('textbox');
      // const _passwordInputField = screen.getByTestId('password');

      console.log(_emailInputField.value)
      // expect(_emailInputField).toHaveValue('test@email.com');
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
