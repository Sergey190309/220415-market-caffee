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
  const userName = 'User Name';
  const email = 'e@mail.com';
  const testInitStore = {
    userName: userName,
    email: email,
    isAuthenticated: null,
    isAdmin: null,
    access_token: access_token,
    refresh_token: refresh_token,
    loading: true,
    isSignedUp: false,
  };

  test('sign up success', () => {
    const action = {
      type: SIGN_UP_SUCCESS,
    };
    const expResult = {
      isAuthenticated: false,
      loading: false,
      isSignedUp: true,
      isLoggedIn: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    expect(auth(testInitStore, action)).toEqual(expResult);
  });

  test('sign up fail', () => {
    const action = {
      type: SIGN_UP_FAIL,
    };
    const expResult = {
      isAuthenticated: false,
      loading: false,
      isSignedUp: false,
      isLoggedIn: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    expect(auth(testInitStore, action)).toEqual(expResult);
  });

  test('login success', () => {
    const userName = 'test User Name';
    const email = 'Test@mail.com';
    const isAdmin = true;
    const isAuthenticated = true;
    const access_token = 'test access_token';
    const refresh_token = 'test refresh_token';

    const action = {
      type: LOG_IN_SUCCESS,
      payload: {
        userName: userName,
        email: email,
        isAdmin: isAdmin,
        isAuthenticated: isAuthenticated,
        access_token: access_token,
        refresh_token: refresh_token,
      },
    };
    const expResult = {
      ...testInitStore,
      ...action.payload,
      // access_token: action.payload.access_token,
      // refresh_token: action.payload.refresh_token,
      // userName: action.payload.userName,
      // isAdmin: isAdmin,
      // email: action.payload.email,
      // isAuthenticated: true,
      loading: false,
      isSignedUp: false,
      isLoggedIn: true,
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
      isAuthenticated: false,
      loading: false,
      isSignedUp: false,
      isLoggedIn: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    // console.log(auth(testInitStore, action));
    expect(auth(testInitStore, action)).toEqual(expResult);
  });
});
