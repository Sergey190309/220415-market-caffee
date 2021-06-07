// import mockAxios from '../../api/apiClient';
import auth from './auth';
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  // TECH_IN_SUCCESS,
  // TECH_IN_FAIL,
  LOG_OUT,
  SIGN_UP_START,
  LOG_IN_START,
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
    loading: null,
    isSignedUp: false,
  };

  test('log out', () => {
    const mockSetToken = jest.fn()
    const action = {
      type: LOG_OUT,
    };
    const expResult = {
      // isAuthenticated: false,
      loading: false,
      isSignedUp: false,
      isLoggedIn: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    // console.log(auth(testInitStore, action));
    expect(auth(testInitStore, action, mockSetToken)).toEqual(expResult);
    // expect(mockSetToken).toHaveBeenCalledTimes(1);
  });
  test('sign up start', () => {
    const action = {
      type: SIGN_UP_START,
    };
    const expResult = {
      ...testInitStore,
      loading: true
    };
    expect(testInitStore).not.toEqual(expResult);
    expect(auth(testInitStore, action)).toEqual(expResult);
  });

  test('sign up success', () => {
    const action = {
      type: SIGN_UP_SUCCESS,
    };
    const expResult = {
      // isAuthenticated: false,
      loading: false,
      isSignedUp: true,
      isLoggedIn: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    expect(auth(testInitStore, action)).toEqual(expResult);
  });

  test('sign up fail', () => {
    const mockSetToken = jest.fn()
    const action = {
      type: SIGN_UP_FAIL,
    };
    const expResult = {
      // isAuthenticated: false,
      loading: false,
      isSignedUp: false,
      isLoggedIn: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    expect(auth(testInitStore, action, mockSetToken)).toEqual(expResult);
    // expect(mockSetToken).toHaveBeenCalledTimes(1);
    // expect(mockSetToken).toHaveBeenCalledWith(action.payload);
    // console.log('tech in fail ->', mockSetToken.mock.calls)
  });

  test('log in start', () => {
    const action = {
      type: LOG_IN_START,
    };
    const expResult = {
      ...testInitStore,
      loading: true
    };
    expect(testInitStore).not.toEqual(expResult);
    expect(auth(testInitStore, action)).toEqual(expResult);
  });

  test('login success', () => {
    const mockSetToken = jest.fn()
    const userName = 'test User Name';
    const email = 'test@mail.com';
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
    expect(auth(testInitStore, action, mockSetToken)).toEqual(expResult);
    expect(mockSetToken).toHaveBeenCalledTimes(1);
    // expect(mockSetToken).toHaveBeenCalledWith(action.payload.access_token);
    expect(mockSetToken.mock.calls[0][0]).toBe(action.payload.access_token);
    // console.log('auth reducer, login success', mockSetToken.mock.calls[0][1])

  });

  test('log in fail', () => {
    const mockSetToken = jest.fn()
    const action = {
      type: LOG_IN_FAIL,
    };
    const expResult = {
      // isAuthenticated: false,
      loading: false,
      isSignedUp: false,
      isLoggedIn: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    // console.log(auth(testInitStore, action));
    expect(auth(testInitStore, action, mockSetToken)).toEqual(expResult);
    // expect(mockSetToken).toHaveBeenCalledTimes(1);
    // expect(mockSetToken).toHaveBeenCalledWith(action.payload);
  });


});
