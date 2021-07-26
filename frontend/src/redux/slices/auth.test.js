// import { logInCall } from '../../api/calls/getAuthTechInfo'
import {
  // logInData as mockLogInData,
  // resolveData as mockResolveData,
  logInSuccessArgs as mockLogInSuccessArgs,
  // rejectData as mockRejectData,
} from '../../testAxiosConstants';
import { LOG_IN_INFO } from '../constants/localStorageVariables';

import store from '../store';
import {
  setState,
  notLoggedInfo,
  initialState,
  logInFail,
  logInStart,
  logInSuccess,
  signUpFail,
  signUpStart,
  signUpSuccess,
  logOut,
} from './auth';

jest.mock('../../api/apiClient');
jest.mock('../../api/calls/getAuthTechInfo');
// jest.mock('../../api/apiClient', () => ({
//   axiosCommonToken: () => 'axiosCommonToken',
// }));

describe('Auth slicer testing', () => {
  const emptyState = {
    ...notLoggedInfo,
    isLoggedIn: false,
    loading: false,
    isSignedUp: false,
  };
  const logInPayload = {
    user_name: 'useName',
    email: 'eMail',
    isAdmin: false,
    access_token: 'mockAccessToken',
    refresh_token: 'mockRefreshToken',
  };
  const logInState = {
    ...logInPayload,
    isLoggedIn: true,
    loading: false,
    isSignedUp: false,
  };
  beforeAll(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  describe('logIn group', () => {
    // let state;
    // beforeEach(() => {});
    test('generation initialState', () => {
      const state = store.getState().auth;
      const expState = { ...emptyState };
      expect(state).toEqual(expState);
      // console.log('auth slice, state ->', state);
    });
    test('creating logged in state', () => {
      store.dispatch(setState(logInState));
      const state = store.getState().auth;
      const expState = { ...logInState };
      expect(state).toEqual(expState);
      // console.log('auth slice, state ->', state);
    });
    test('logInStart', () => {
      store.dispatch(
        setState({
          ...emptyState,
          loading: false,
          isSignedUp: true,
          isLoggedIn: true,
        })
      );
      store.dispatch(logInStart());
      const state = store.getState().auth;
      const expState = {
        ...emptyState,
        loading: true,
        isSignedUp: false,
        isLoggedIn: false,
      };
      expect(state).toEqual(expState);
      // console.log('auth slice, state ->', state);
    });
    test('logInSuccess', () => {
      store.dispatch(
        setState({
          ...emptyState,
          loading: true,
          isSignedUp: false,
          isLoggedIn: false,
        })
      );
      store.dispatch(logInSuccess(logInPayload));
      const state = store.getState().auth;
      const expState = { ...logInState };
      expect(state).toEqual(expState);
      const { loading, isSignedUp, isLoggedIn, ...localyStored } = state;
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        LOG_IN_INFO,
        JSON.stringify(localyStored)
      );
        // console.log('auth slice, state ->', state);
    });
    test('logInFail', () => {
      store.dispatch(
        setState({
          ...emptyState,
          loading: true,
          isSignedUp: false,
          isLoggedIn: false,
        })
      );
      store.dispatch(logInFail());
      const state = store.getState().auth;
      const expState = { ...emptyState };
      expect(state).toEqual(expState);
      expect(localStorage.removeItem).toHaveBeenCalledWith(LOG_IN_INFO);
      // console.log('auth slice, state ->', state);
    });
    test('logOut', () => {
      store.dispatch(setState(logInState));
      store.dispatch(logOut());
      const state = store.getState().auth;
      const expState = { ...emptyState };
      expect(state).toEqual(expState);
      expect(localStorage.removeItem).toHaveBeenCalledWith(LOG_IN_INFO);
      // console.log('auth slice, state ->', state);
    });
  });
  describe('SignUp group', () => {
    test('signUpStart', () => {
      store.dispatch(
        setState({
          ...emptyState,
          loading: false,
          isSignedUp: true,
          isLoggedIn: true,
        })
      );
      store.dispatch(signUpStart())
      const state = store.getState().auth;
      const expState = {
        ...emptyState,
        loading: true,
        isSignedUp: false,
        isLoggedIn: false,
      };
      expect(state).toEqual(expState);
      // console.log('auth slice, state ->', state);
    });
    test('signUpSuccess', () => {
      store.dispatch(setState(logInState));
      store.dispatch(signUpSuccess())
      const state = store.getState().auth;
      const expState = {
        ...emptyState,
        loading: false,
        isSignedUp: true,
        isLoggedIn: false,
      };
      expect(state).toEqual(expState);
      expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(localStorage.removeItem).toHaveBeenCalledWith(LOG_IN_INFO);
      // console.log('auth slice, state ->', state);
    });
    test('signUpFail', () => {
      store.dispatch(setState(logInState));
      store.dispatch(signUpFail())
      const state = store.getState().auth;
      const expState = {
        ...emptyState,
        loading: false,
        isSignedUp: false,
        isLoggedIn: false,
      };
      expect(state).toEqual(expState);
      expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(localStorage.removeItem).toHaveBeenCalledWith(LOG_IN_INFO);
      // console.log('auth slice, state ->', state);
    });
  });
});
