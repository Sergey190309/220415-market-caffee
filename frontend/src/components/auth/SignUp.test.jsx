import React from 'react';
// import {
//   Icon,
// } from 'semantic-ui-react';
import {
  // render,
  screen,
  // cleanup,
  connectedRender,
  waitFor,
  // fireEvent,
  // waitFor
} from '../../testUtils/connectedRenderer';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { SignUp, formStructure, signUpSchema, onChange, onSubmit } from './SignUp';
import { useTranslation } from '../../__mock__/react-i18next';
// import { string } from 'yup/lib/locale';
// import { exact } from 'prop-types';

describe('SignUp form testing', () => {
  const initValues = {
    userName: '',
    email: '',
    password: '',
    password2: '',
  };
  const activeValues = {
    userName: 'User Name',
    email: 'test@mail.test',
    password: 'qwer',
    password2: '1234',
  };
  const testProps = {
    initValues: initValues,
    signUpSchema: jest.fn(),
    onSubmit: jest.fn(),
    setModalClosed: jest.fn(),
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
        connectedRender(<SignUp {...testProps} />);
        expect(screen.getAllByRole('heading').length).toBe(1);
        expect(screen.getAllByRole('textbox').length).toBe(2);
        expect(screen.getAllByRole('button').length).toBe(3);
        expect(screen.getByPlaceholderText('placeHolders.password')).toBeVisible();
        expect(screen.getByPlaceholderText('placeHolders.password2')).toBeVisible();
      });

      test('input elements have values according props', () => {
        connectedRender(<SignUp {...activeProps} />);
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
        connectedRender(<SignUp {...testProps} />);
        expect(screen.getByRole('heading')).toHaveClass('ui teal center aligned header', {
          exact: true,
        });
      });

      test('buttons have appropriate classes', () => {
        connectedRender(<SignUp {...testProps} />);
        expect(
          screen.getByRole('button', { name: 'buttons.signUp' })
        ).toHaveClass('ui teal large basic button', { exact: true });
        expect(
          screen.getByRole('button', { name: 'buttons.reset' })
        ).toHaveClass('ui olive large basic button', { exact: true });
        expect(
          screen.getByRole('button', { name: 'buttons.cancel' })
        ).toHaveClass('ui orange large basic button', { exact: true });
      });
    });
    describe('buttons behavior', () => {
      test('signUp', async () => {
        connectedRender(<SignUp {...activeProps} />);
        const signUpButton = screen.getByRole('button', { name: 'buttons.signUp' });

        userEvent.click(signUpButton);
        await waitFor(() => {
          expect(activeProps.onSubmit).toHaveBeenCalledTimes(1);
          expect(activeProps.onSubmit.mock.calls[0][0]).toEqual(activeValues);
        });
      });

      test('cancel', async () => {
        connectedRender(<SignUp {...activeProps} />);
        const cancelButton = screen.getByRole('button', { name: 'buttons.cancel' });

        userEvent.click(cancelButton);
        await waitFor(() => {
          expect(activeProps.setModalClosed).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
