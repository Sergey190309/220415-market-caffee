import React from 'react';
// import {
//   Icon,
// } from 'semantic-ui-react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { SignUp, onChange, onSubmit } from './SignUp';

describe('SignUp form testing', () => {
  const testProps = {
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    onCancelClick: jest.fn(),
    initState: {
      userName: 'Test Name',
      email: 'test@email.com',
      password: 'qwer',
      password2: 'qwer',
    },
  };

  describe('functions testing', () => {
    const setFormData = jest.fn();
    const formData = testProps.initState;
    const fieldName = 'userName';
    const fieldData = 'New Name';

    test('onChange testing', () => {
      onChange(setFormData, formData, fieldName, fieldData);
      // console.log()
      const args = { ...testProps.initState, [fieldName]: fieldData };
      expect(setFormData).toHaveBeenCalledWith(args);
    });

    test('onSubmit testing (to be upgraded)', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('layout and properies', () => {
    test('header', () => {
      render(<SignUp {...testProps} />);
      const header = screen.getByRole('heading');
      const icon = screen.getByTestId('icon')
      expect(header).toHaveTextContent('Sign up', {normalizeWhitespace: true});
      expect(header).toContainElement(icon)
    });

    test('userName', () => {
      render(<SignUp {...testProps} />);
      const userName = screen.getByPlaceholderText('Choose username')
      expect(userName).toHaveAttribute('type', 'text')
      expect(userName).toHaveAttribute('value', 'Test Name')
      expect(userName).toHaveAttribute('name', 'userName')
    });

    test('email', () => {
      render(<SignUp {...testProps} />);
      const email = screen.getByPlaceholderText('E-mail address')
      expect(email).toHaveAttribute('type', 'email')
      expect(email).toHaveAttribute('value', 'test@email.com')
      expect(email).toHaveAttribute('name', 'email')
      expect(email).toHaveAttribute('required')
    });

    test('password', () => {
      render(<SignUp {...testProps} />);
      const password = screen.getByPlaceholderText('Password')
      expect(password).toHaveAttribute('type', 'password')
      expect(password).toHaveAttribute('value', 'qwer')
      expect(password).toHaveAttribute('name', 'password')
      expect(password).toHaveAttribute('required')
    });

    test('password2', () => {
      render(<SignUp {...testProps} />);
      const password2 = screen.getByPlaceholderText('Repeate your passord')
      expect(password2).toHaveAttribute('type', 'password')
      expect(password2).toHaveAttribute('value', 'qwer')
      expect(password2).toHaveAttribute('name', 'password2')
      expect(password2).toHaveAttribute('required')
    });

    test('Sign Up button', () => {
      render(<SignUp {...testProps} />);
      const signUpButton = screen.getByRole('button', {name: 'Sign Up'})
      expect(signUpButton.className).toBe('ui teal large button');
    });

    test('Cancel button', () => {
      render(<SignUp {...testProps} />);
      const cancelButton = screen.getByRole('button', {name: 'Sign Up'})
      expect(cancelButton.className).toBe('ui teal large button');
    });
  });

  describe('elements actions', () => {

    describe('userName', () => {
      test('value based on props', () => {
        render(<SignUp {...testProps} />);
        const userName = screen.getByPlaceholderText('Choose username')
        expect(userName).toHaveValue('Test Name')
      });

      test('typing resutls in calling appropriate function', () => {
        render(<SignUp {...testProps} />);
        const userName = screen.getByPlaceholderText('Choose username')
        userEvent.type(userName, 'NewName')
        expect(testProps.onChange).toHaveBeenCalledTimes(7);
        // expect(testProps.onChange).toHaveBeenLastCalledWith('value');
      });
    })
    describe('email', () => {
      test('value based on props', () => {
        render(<SignUp {...testProps} />);
        const email = screen.getByPlaceholderText('E-mail address')
        expect(email).toHaveValue('test@email.com')
      });

      test('typing resutls in calling appropriate function', () => {
        render(<SignUp {...testProps} />);
        const email = screen.getByPlaceholderText('E-mail address')
        userEvent.type(email, 'new@email.test')
        expect(testProps.onChange).toHaveBeenCalledTimes(14);
        // expect(testProps.onChange).toHaveBeenLastCalledWith('value');
      });
    })
    describe('password', () => {
      test('value based on props', () => {
        render(<SignUp {...testProps} />);
        const password = screen.getByPlaceholderText('Password')
        expect(password).toHaveValue('qwer')
      });

      test('typing resutls in calling appropriate function', () => {
        render(<SignUp {...testProps} />);
        const password = screen.getByPlaceholderText('Password')
        userEvent.type(password, 'NewQwerty')
        expect(testProps.onChange).toHaveBeenCalledTimes(9);
        // expect(testProps.onChange).toHaveBeenLastCalledWith('value');
      });

    })
    describe('password2', () => {
      test('value based on props', () => {
        render(<SignUp {...testProps} />);
        const password2 = screen.getByPlaceholderText('Repeate your passord')
        expect(password2).toHaveValue('qwer')
      });

      test('typing resutls in calling appropriate function', () => {
        render(<SignUp {...testProps} />);
        const password2 = screen.getByPlaceholderText('Repeate your passord')
        userEvent.type(password2, 'NewName')
        expect(testProps.onChange).toHaveBeenCalledTimes(7);
        // expect(testProps.onChange).toHaveBeenLastCalledWith('value');
      });

    })

  })

});
