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
import { string } from 'yup/lib/locale';

describe('SignUp form testing', () => {
  const initValues = {
    userName: '',
    email: '',
    password: '',
    password2: '',
  };
  const testProps = {
    initValues: initValues,
    logInSchema: jest.fn(),
    onSubmit: jest.fn(),
    setModalOpened: jest.fn(),
    setModalClosed: jest.fn(),
  };
  describe('Non react components', () => {
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
});
