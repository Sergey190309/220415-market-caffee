import React from 'react';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { screen, render, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import store from '../../redux/store';
import { SignUp, formStructure, signUpSchema } from './SignUp';
import { closeModal } from '../../redux/slices';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    // i18n: { changeLanguage: jest.fn() },
  }),
}));
jest.mock('../../api/calls/getAuthTechInfo');

describe('SignUp form testing', () => {
  const initValues = {
    userName: 'sa',
    email: 'sa6702@gmail.com',
    password: 'qwerty',
    password2: 'qwerty',
  };
  const activeValues = {
    userName: 'User Name',
    email: 'test@mail.test',
    password: 'qwerty',
    password2: 'qwerty',
  };
  const testProps = {
    initValues: initValues,
    signUpSchema: jest.fn(),
    // setModalClosed: jest.fn(),
    signUpStart: jest.fn(),
  };
  const activeProps = {
    ...testProps,
    initValues: activeValues,
  };

  describe('Non react items', () => {
    test('form structure', () => {
      expect(formStructure).toEqual(initValues);
    });

    test('signUpSchema function', () => {
      const { t } = useTranslation();
      const result = signUpSchema(t);
      expect(result.fields.userName.type).toBe('string');
      expect(result.fields.email.type).toBe('string');
      expect(result.fields.password.type).toBe('string');
      expect(result.fields.password2.type).toBe('string');
    });
  });

  describe('component testing', () => {
    describe('appearance', () => {
      test('it exists and has all elements', () => {
        render(
          <Provider store={store}>
            <SignUp {...testProps} />
          </Provider>
        );
        expect(screen.getAllByRole('heading').length).toBe(1);
        expect(screen.getAllByRole('textbox').length).toBe(2);
        expect(screen.getAllByRole('button').length).toBe(3);
        expect(screen.getByPlaceholderText('placeHolders.password')).toBeVisible();
        expect(screen.getByPlaceholderText('placeHolders.password2')).toBeVisible();
        // screen.debug()
      });

      test('input elements have values according props', () => {
        render(
          <Provider store={store}>
            <SignUp {...activeProps} />
          </Provider>
        );
        expect(screen.getByRole('textbox', { name: 'labels.userName' })).toHaveValue(
          activeValues.userName
        );
        expect(screen.getByRole('textbox', { name: 'labels.email' })).toHaveValue(
          activeValues.email
        );
        expect(screen.getByPlaceholderText('placeHolders.password')).toHaveValue(
          activeValues.password
        );
        expect(screen.getByPlaceholderText('placeHolders.password2')).toHaveValue(
          activeValues.password2
        );
      });

      test('header has appropriate classes', () => {
        render(
          <Provider store={store}>
            <SignUp {...testProps} />
          </Provider>
        );
        expect(screen.getByRole('heading')).toHaveClass('ui teal center aligned header', {
          exact: true,
        });
      });

      test('buttons have appropriate classes', () => {
        render(
          <Provider store={store}>
            <SignUp {...testProps} />
          </Provider>
        );
        expect(screen.getByRole('button', { name: 'buttons.signUp' })).toHaveClass(
          'ui teal large basic button',
          { exact: true }
        );
        expect(screen.getByRole('button', { name: 'buttons.reset' })).toHaveClass(
          'ui olive large basic button',
          { exact: true }
        );
        expect(screen.getByRole('button', { name: 'buttons.cancel' })).toHaveClass(
          'ui orange large basic button',
          { exact: true }
        );
      });
    });
    describe('buttons behavior', () => {
      let actualProps;
      beforeEach(() => {
        jest.resetAllMocks();
        actualProps = {
          ...testProps,
          signUpStart: jest.fn(() => ({ type: 'auth/signUpStart' })),
          // signUpStart: jest.fn().mockReturnValue({ type: 'auth/signUpStart' }),
          closeModal: jest.fn(() => ({ type: 'device/closeModal' })),
          // closeModal: jest.fn().mockReturnValue({ type: 'device/closeModal' })
        };
      });
      test('signUp', async () => {
        render(
          <Provider store={store}>
            <SignUp {...actualProps} />
          </Provider>
        );
        const signUpButton = screen.getByRole('button', { name: 'buttons.signUp' });

        userEvent.click(signUpButton);
        await waitFor(() => {
          expect(actualProps.signUpStart).toHaveBeenCalledTimes(1);
          const { userName, password2, ...otherProps } = initValues;
          const sentValues = { ...otherProps, user_name: userName };
          expect(actualProps.signUpStart).toHaveBeenCalledWith(sentValues);
          console.log('buttong sign up, activeValues ->', sentValues);
          // expect(activeProps.signUpStart.mock.calls[0][0]).toEqual(sentValues);
        });
      });

      test('cancel', async () => {
        render(
          <Provider store={store}>
            <SignUp {...actualProps} />
          </Provider>
        );
        const cancelButton = screen.getByRole('button', { name: 'buttons.cancel' });

        userEvent.click(cancelButton);
        await waitFor(() => {
          expect(actualProps.closeModal).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
