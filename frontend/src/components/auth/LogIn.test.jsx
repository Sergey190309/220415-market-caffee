import React from 'react';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  screen,
  // connectedLinkedRender,
  render,
  waitFor,
} from '../../testUtils';
import userEvent from '@testing-library/user-event';

import store from '../../redux/store';
import { LogIn, logInSchema, formStructure } from './LogIn';
// import { useTranslation } from '../../../__mock__/react-i18next';
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    // i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('LogIn component testing', () => {
  const initValues = {
    email: 'a@agatha-ng.com',
    password: 'qwerty',
  };
  const testProps = {
    initValues: initValues,
    logInSchema: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    logInStart: jest.fn(),
    setLoggedInFalse: jest.fn(),
  };
  describe('Non react compinent', () => {
    test('form structure', () => {
      expect(formStructure).toEqual(initValues);
    });

    test('logInSchema function', () => {
      const { t } = useTranslation();
      const result = logInSchema(t);
      expect(result.fields.email.type).toBe('string');
      expect(result.fields.password.type).toBe('string');
    });
  });

  describe('component testing', () => {
    describe('appearance', () => {
      test('it exists and has all elements', () => {
        render(
          <Provider store={store}>
            <LogIn {...testProps} />
          </Provider>
        );
        expect(screen.getAllByRole('heading').length).toBe(2);
        expect(screen.getAllByRole('textbox').length).toBe(1);
        expect(screen.getAllByRole('button').length).toBe(4);
        expect(screen.getByPlaceholderText('placeHolders.password')).toBeVisible();
        // console.log(screen.getByPlaceholderText('placeHolders.password').value)
        // console.log(screen.ByPlaceholderText(''));
      });

      test('input elements has values according props', () => {
        const activeProps = {
          ...testProps,
          initValues: {
            email: 'test@mail.test',
            password: 'password',
          },
        };
        render(
          <Provider store={store}>
            <LogIn {...activeProps} />
          </Provider>
        );
        expect(screen.getByRole('textbox')).toHaveValue('test@mail.test');
        expect(screen.getByPlaceholderText('placeHolders.password')).toHaveValue(
          'password'
        );
      });
      test('Header and footer have appropriate classes', () => {
        render(
          <Provider store={store}>
            <LogIn {...testProps} />
          </Provider>
        );
        expect(screen.getByRole('heading', { name: 'header' })).toHaveClass(
          'ui teal center aligned header',
          { exact: true }
        );
        expect(screen.getByRole('heading', { name: 'message' })).toHaveClass(
          'ui header',
          { exact: true }
        );
        // console.log(screen.getByRole('heading', {name: 'header'}));
      });

      test('buttons have appropriate classes', () => {
        render(
          <Provider store={store}>
            <LogIn {...testProps} />
          </Provider>
        );
        expect(screen.getByRole('button', { name: 'buttons.logIn' })).toHaveClass(
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
        expect(screen.getByRole('button', { name: 'buttons.signUp' })).toHaveClass(
          'ui teal large basic left floated button',
          { exact: true }
        );
      });
    });

    describe('buttons behavior', () => {
      test.only('login', async () => {
        // const dispatch = jest.fn()
        render(
          <Provider store={store}>
            <LogIn {...testProps} />
          </Provider>
        );
        const logInButton = screen.getByRole('button', { name: 'buttons.logIn' });
        userEvent.click(logInButton);
        await waitFor(() => {
          // expect(dispatch).toHaveBeenCalledTimes(1);
          expect(testProps.logInStart).toHaveBeenCalledTimes(1);
          // console.log(testProps.logInStart.mock.calls[0][0]);
          // expect(testProps.logInStart.mock.calls[0][0]).toEqual(initValues);
        });
      });

      test('cancel', async () => {
        render(
          <Provider store={store}>
            <LogIn {...testProps} />
          </Provider>
        );
        const cancelButton = screen.getByRole('button', { name: 'buttons.cancel' });
        userEvent.click(cancelButton);
        await waitFor(() => {
          expect(testProps.closeModal).toHaveBeenCalledTimes(1);
        });
      });

      test('sign up', async () => {
        render(
          <Provider store={store}>
            <LogIn {...testProps} />
          </Provider>
        );
        const sighUpButton = screen.getByRole('button', { name: 'buttons.signUp' });
        userEvent.click(sighUpButton);
        await waitFor(() => {
          expect(testProps.openModal).toHaveBeenCalledTimes(1);
          expect(testProps.setModalOpened.mock.calls[0][0]).toEqual('signUp');
        });
      });
    });
  });
});
