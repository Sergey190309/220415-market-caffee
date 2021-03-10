import React from 'react'; // useState
import { act, fireEvent, queryByText, render, screen, wait, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SignUp } from './SignUp';

describe('SignUp form testing', () => {
  describe('Layout', () => {
    test('there should be header of signup', () => {
      render(<SignUp />);
      // screen.debug();
      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByRole('heading')).toHaveTextContent('Sign Up');
    });

    test('there should be input for user name', () => {
      render(<SignUp />);
      expect(screen.getByTestId('userName')).toBeInTheDocument();
    });

    test('there should be input for email', () => {
      render(<SignUp />);
      expect(screen.getByTestId('email')).toBeInTheDocument();
    });

    test('there should be input for password', () => {
      render(<SignUp />);
      expect(screen.getByTestId('password')).toBeInTheDocument();
    });

    test('there should be input to repeat password', () => {
      render(<SignUp />);
      expect(screen.getByTestId('password2')).toBeInTheDocument();
    });

    test('password fields should have password type', () => {
      render(<SignUp />);
      // console.log(object)
      expect(screen.getByTestId('password').type).toBe('password');
      expect(screen.getByTestId('password2').type).toBe('password');
    });

    test('there should be sign up button', () => {
      render(<SignUp />);
      expect(screen.getByTestId('signUp')).toBeInTheDocument();
      expect(screen.getByTestId('signUp')).toHaveTextContent('Sign Up');
    });

    test('there should be cancel button', () => {
      render(<SignUp />);
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
      expect(screen.getByTestId('cancel')).toHaveTextContent('Cancel');
    });
  });

  describe('Interactions', () => {
    const changeEvent = content => ({
      target: {
        value: content,
      },
    });

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 300);
        });
      });
    };

    let displayNameInput,
      emailInput,
      passwordInput,
      password2Input,
      signUpButton,
      cancelButton;

    const setupForSubmit = props => {
      act(() => {
        render(<SignUp {...props} />);
      });

      displayNameInput = screen.getByTestId('userName');
      emailInput = screen.getByTestId('email');
      passwordInput = screen.getByTestId('password');
      password2Input = screen.getByTestId('password2');

      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      fireEvent.change(emailInput, changeEvent('test@email.com'));
      fireEvent.change(passwordInput, changeEvent('password'));
      fireEvent.change(password2Input, changeEvent('password2'));

      signUpButton = screen.getByTestId('signUp');
      cancelButton = screen.getByTestId('cancel');
    };

    test('input field userName should set state and own value', () => {
      render(<SignUp />);
      const displayNameInput = screen.getByTestId('userName');
      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      expect(displayNameInput).toHaveValue('my-display-name');
    });

    test('input field email should set state and own value', () => {
      render(<SignUp />);
      const emailInput = screen.getByTestId('email');
      fireEvent.change(emailInput, changeEvent('test@email.com'));
      expect(emailInput).toHaveValue('test@email.com');
    });

    test('input field password should set state and own value', () => {
      render(<SignUp />);
      const passwordInput = screen.getByTestId('password');
      fireEvent.change(passwordInput, changeEvent('password'));
      expect(passwordInput).toHaveValue('password');
    });

    test('input field repeat password should set state and own value', () => {
      render(<SignUp />);
      const password2Input = screen.getByTestId('password2');
      fireEvent.change(password2Input, changeEvent('password2'));
      expect(password2Input).toHaveValue('password2');
    });

    test('sign up button should call postSignUp', () => {
      const postSignUp = jest.fn().mockReturnValueOnce({});
      setupForSubmit({ postSignUp });
      fireEvent.click(signUpButton);
      expect(postSignUp).toHaveBeenCalledTimes(1);
    });

    test('cancel button should call cancel', () => {
      const cancel = jest.fn().mockReturnValueOnce({});
      setupForSubmit({ cancel });
      fireEvent.click(cancelButton);
      expect(cancel).toHaveBeenCalledTimes(1);
    });

    test('sign up button should not throw error without actions as a prop', () => {
      setupForSubmit();
      expect(() => {
        fireEvent.click(signUpButton);
      }).not.toThrow();
    });

    test('cancel button should not throw error without actions as a prop', () => {
      act(() => {
        setupForSubmit();
      });
      expect(() => {
        act(() => {
          fireEvent.click(cancelButton);
        });
      }).not.toThrow();
    });

    test('sign up button should call postSignUp with expected values', () => {
      const postSignUp = jest.fn().mockReturnValueOnce({});
      setupForSubmit({ postSignUp });
      const expectedUseerObject = {
        userName: 'my-display-name',
        email: 'test@email.com',
        password: 'password',
      };
      fireEvent.click(signUpButton);
      expect(postSignUp).toHaveBeenCalledWith(expectedUseerObject);
    });

    test('it is not allowed user to click Sign Up when there is ongoing api call', () => {
      const postSignUp = mockAsyncDelayed();
      setupForSubmit({ postSignUp });
      fireEvent.click(signUpButton);
      fireEvent.click(signUpButton);
      expect(postSignUp).toHaveBeenCalledTimes(1);
    });

    // test('it hides spinner when call finished successfully', async () => {
    //   // It does not work. I need to access to style here.
    //   const actions = {
    //     postSignUp: mockAsyncDelayed(),
    //   };
    //   setupForSubmit({ actions });
    //   fireEvent.click(signUpButton);
    //   expect(actions.postSignUp).toHaveBeenCalledTimes(1);
    //   await waitFor(() => {
    //     console.log('within waitFor');
    //     fireEvent.click(signUpButton);
    //     expect(actions.postSignUp).toHaveBeenCalledTimes(1);
    //   });
    // });

    // test('it displays validation error for email when error is recieved', async () => {
    //   const postSignUp = jest.fn().mockRejectedValue({
    //     response: {
    //       data: {
    //         validationError: 'Missing data for required field.',
    //       },
    //     },
    //   });
    //   setupForSubmit({ postSignUp });
    //   // const emailInput = screen.getByTestId('email')
    //   // console.log(emailInput)
    //   fireEvent.click(signUpButton)
    //   const errorMessage = await waitFor(() => {
    //     expect(screen).toContain('Missing data for required field.')
    //   })
    //   console.log(errorMessage)
    // });
  });
});
