import auth, { initialStore } from './auth';
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from '../actions/types';

describe('Auth reducer testing', () => {
  const access_token = 'access_token';
  const refresh_token = 'refresh_token';
  const testInitStore = {
    access_token: access_token,
    refresh_token: refresh_token,
    isAuthenticated: null,
    loading: true,
    user: null,
  };
  test('initialStore seting', () => {
    const testInitStoreAdopted = {
      ...initialStore,
      access_token: access_token,
      refresh_token: refresh_token,
    };
    expect(testInitStoreAdopted).toEqual(testInitStore);
  });

  test('sign up success', () => {
    const action = {
      type: SIGN_UP_SUCCESS,
    };
    const expResult = {
      ...testInitStore,
      isAuthenticated: false,
      loading: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    expect(auth(testInitStore, action)).toEqual(expResult);
  });

  test('sign up fail', () => {
    const action = {
      type: SIGN_UP_FAIL,
    };
    const expResult = {
      ...testInitStore,
      isAuthenticated: false,
      loading: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    expect(auth(testInitStore, action)).toEqual(expResult);
  });

  test('login success', () => {
    const access_token = 'test access_token';
    const refresh_token = 'test refresh_token';
    const action = {
      type: LOG_IN_SUCCESS,
      payload: {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    };
    const expResult = {
      ...testInitStore,
      access_token: action.payload.access_token,
      refresh_token: action.payload.refresh_token,
      isAuthenticated: true,
      loading: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    expect(auth(testInitStore, action)).toEqual(expResult);
    // console.log(result);
  });

  test('log in fail', () => {
    const action = {
      type: LOG_IN_FAIL,
    };
    const expResult = {
      ...testInitStore,
      // access_token: 'some access_token',
      // refresh_token: 'some refresh_token',
      isAuthenticated: false,
      loading: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    // console.log(auth(testInitStore, action));
    expect(auth(testInitStore, action)).toEqual(expResult);
  });
});
