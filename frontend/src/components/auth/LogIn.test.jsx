import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
import {
  // render,
  screen,
  // cleanup,
  connectedRender,
  waitFor,
  // fireEvent,
  // waitFor
} from '../../testUtils/connectedRenderer';
import userEvent from '@testing-library/user-event';

import LogInConnected, { LogIn, logInSchema } from './LogIn';
import { useTranslation } from '../../__mock__/react-i18next';

describe('LogIn component testing', () => {
  const testProps = {
    initValues: {},
    logInSchema: jest.fn(),
    onSubmit: jest.fn(),
    setModalOpened: jest.fn(),
    setModalClosed: jest.fn(),
  };
  describe('Non react compinent', () => {
    test('logInSchema functions', () => {
      const { t } = useTranslation();
      const result = logInSchema(t);
      expect(result.fields.email.type).toBe('string');
      expect(result.fields.password.type).toBe('string');
      // console.log(typeof(result.fields.email))
      // console.log(typeof(result))
    });
  });

  describe('component testing', () => {
    describe('apiance', () => {
      test('it exists and has all elements', () => {
        connectedRender(<LogIn {...testProps} />);
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
        connectedRender(<LogIn {...activeProps} />);
        expect(screen.getByRole('textbox')).toHaveValue('test@mail.test');
        expect(screen.getByPlaceholderText('placeHolders.password')).toHaveValue(
          'password'
        );
      });
      test('Header and footer have appropriate classes', () => {
        connectedRender(<LogIn {...testProps} />);
        expect(screen.getByRole('heading', { name: 'header' })).toHaveClass(
          'ui teal center aligned header'
        );
        expect(screen.getByRole('heading', { name: 'message' })).toHaveClass('ui header');
        // console.log(screen.getByRole('heading', {name: 'header'}));
      });

      test('buttons have appropriate classes', () => {
        connectedRender(<LogIn {...testProps} />);
        expect(screen.getByRole('button', { name: 'buttons.logIn' })).toHaveClass(
          'ui teal large basic button'
        );
        expect(screen.getByRole('button', { name: 'buttons.reset' })).toHaveClass(
          'ui olive large basic button'
        );
        expect(screen.getByRole('button', { name: 'buttons.cancel' })).toHaveClass(
          'ui orange large basic button'
        );
        expect(screen.getByRole('button', { name: 'buttons.signUp' })).toHaveClass(
          'ui teal large basic left floated button'
        );
      });
    });

    describe('buttons behavior', () => {
      test('login', async () => {
        const initValues = {
          email: 'test@mail.test',
          password: 'password',
        };
        const activeProps = {
          ...testProps,
          initValues: initValues,
        };
        connectedRender(<LogIn {...activeProps} />);
        const logInButton = screen.getByRole('button', { name: 'buttons.logIn' });
        userEvent.click(logInButton);
        await waitFor(() => {
          expect(testProps.onSubmit).toHaveBeenCalledTimes(1);
          expect(testProps.onSubmit.mock.calls[0][0]).toEqual(initValues);
        });
      })

      test('cancel', async () => {
        connectedRender(<LogIn {...testProps} />);
        const cancelButton = screen.getByRole('button', { name: 'buttons.cancel' });
        userEvent.click(cancelButton);
        await waitFor(() => {
          expect(testProps.setModalClosed).toHaveBeenCalledTimes(1);
        });
      });

      test('sign up', async () => {
        connectedRender(<LogIn {...testProps} />);
        const sighUpButton = screen.getByRole('button', { name: 'buttons.signUp' });
        userEvent.click(sighUpButton);
        await waitFor(() => {
          expect(testProps.setModalOpened).toHaveBeenCalledTimes(1);
          expect(testProps.setModalOpened.mock.calls[0][0]).toEqual('signup');
        });
      });
    });
  });
});
