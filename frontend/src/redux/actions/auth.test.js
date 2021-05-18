import mockAxios from '../../api/apiClient';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  LOG_IN_MODAL_CLOSED,
  LOG_IN_START,
  LOG_OUT,
  SIGN_UP_MODAL_CLOSED,
  SIGN_UP_START,
} from './types';

import {
  logInAction,
  logOutAction,
  setLoggedInFalse,
  setSignedUpFalse,
  signUpAction,
  techInAction,
} from './auth';

jest.mock('../reducers');

describe('Auth action testing', () => {
  test('logOutAction', () => {
    const expAction = {
      type: LOG_OUT,
    };
    expect(logOutAction()).toEqual(expAction);
  });

  test('setSignedUpFalse', () => {
    const expAction = {
      type: SIGN_UP_MODAL_CLOSED,
    };
    expect(setSignedUpFalse()).toEqual(expAction);
  });

  test('setLoggedInFalse', () => {
    const expAction = {
      type: LOG_IN_MODAL_CLOSED,
    };
    expect(setLoggedInFalse()).toEqual(expAction);
  });

  test('signUpAction', () => {
    const mockSignUpData = {
      user_name: 'sa',
      email: 'sa6702@gmail.com',
      password: 'qwerty',
    };
    const expAction = {
      type: SIGN_UP_START,
      payload: mockSignUpData,
    };
    expect(signUpAction(mockSignUpData)).toEqual(expAction);
  });

  test('logInAction', () => {
    const mockLogInData = {
      email: 'sa6702@gmail.com',
      password: 'qwerty',
    };
    const expAction = {
      type: LOG_IN_START,
      payload: mockLogInData,
    };
    expect(logInAction(mockLogInData)).toEqual(expAction);
  });


});
