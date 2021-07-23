import { techAxiosClient } from '../../api/apiClient';
import {
  // logInData as mockLogInData,
  // resolveData as mockResolveData,
  logInSuccessArgs as mockLogInSuccessArgs,
  // rejectData as mockRejectData,
} from '../../testAxiosConstants';
import { LOG_IN_INFO } from '../constants/localStorageVariables';

import store from '../store';
import {
  notLoggedInfo,
  initialState,
  logInFail,
  logInStart,
  logInSuccess,
  resetState,
  signUpFail,
  signUpStart,
  signUpSuccess,
  logOut,
} from './auth';

jest.mock('../../api/apiClient');
// jest.mock('../../api/apiClient', () => ({
//   axiosCommonToken: () => 'axiosCommonToken',
// }));

describe('Auth slicer testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('state testing, signUp', () => {
    // mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }));

    let state = store.getState().auth;
    let expState = { ...initialState };
    expect(state).toEqual(expState);

    store.dispatch(signUpStart());
    expState = {
      ...expState,
      loading: true,
      isSignedUp: false,
      isLoggedIn: false,
    };
    state = store.getState().auth;
    expect(state).toEqual(expState);

    store.dispatch(signUpSuccess());
    expState = {
      ...expState,
      loading: false,
      isSignedUp: true,
      isLoggedIn: false,
    };
    state = store.getState().auth;
    expect(state).toEqual(expState);
    expect(localStorage.removeItem).toHaveBeenLastCalledWith(LOG_IN_INFO);

    store.dispatch(signUpFail());
    expState = {
      ...expState,
      loading: false,
      isSignedUp: false,
      isLoggedIn: false,
    };
    state = store.getState().auth;
    expect(state).toEqual(expState);
    expect(localStorage.removeItem).toHaveBeenLastCalledWith(LOG_IN_INFO);
    // console.log('authSlice testing, signUp state ->', state);
  });

  test('state testing, logIn', () => {
    // mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }));
    // console.log('authSlice testing, logIn state ->', initialState);

    let state = store.getState().auth;
    store.dispatch(resetState());
    state = store.getState().auth;
    let expState = { ...initialState };
    expect(state).toEqual(expState);

    store.dispatch(logInStart());
    expState = {
      ...initialState,
      loading: true,
      isSignedUp: false,
      isLoggedIn: false,
    };
    state = store.getState().auth;
    expect(state).toEqual(expState);

    store.dispatch(logInSuccess(mockLogInSuccessArgs));
    expState = {
      ...mockLogInSuccessArgs,
      loading: false,
      isSignedUp: false,
      isLoggedIn: true,
    };
    state = store.getState().auth;
    expect(state).toEqual(expState);
    const { loading, isSignedUp, isLoggedIn, ...localStored } = state;
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      LOG_IN_INFO,
      JSON.stringify(localStored)
    );

    store.dispatch(logInFail())
    expState = {
      ...notLoggedInfo,
      loading: false,
      isSignedUp: false,
      isLoggedIn: false,
    }
    state = store.getState().auth;
    expect(state).toEqual(expState);

    store.dispatch(logInSuccess(mockLogInSuccessArgs))  // emulate logged condition
    expState = {
      ...mockLogInSuccessArgs,
      loading: false,
      isSignedUp: false,
      isLoggedIn: true,
    };
    state = store.getState().auth;
    expect(state).toEqual(expState);  // Check logged condition
    store.dispatch(logOut())
    expState = {
      ...notLoggedInfo,
      loading: false,
      isSignedUp: false,
      isLoggedIn: false,
    }
    state = store.getState().auth;
    expect(state).toEqual(expState);

    // console.log('authSlice testing, logIn state ->', state);
  });
});
