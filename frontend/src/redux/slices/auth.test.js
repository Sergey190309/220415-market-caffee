import { techAxiosClient as mockAxios } from '../../api/apiClient';
import {
  // logInData as mockLogInData,
  resolveData as mockResolveData,
  // rejectData as mockRejectData,
} from '../../testAxiosConstants';
import { LOG_IN_INFO } from '../constants/localStorageVariables';

import store from '../store';
import {
  initialState,
  logInStart,
  logInSuccess,
  resetState,
  signUpFail,
  signUpStart,
  signUpSuccess,
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
    mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }));

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
    console.log('authSlice testing, signUp state ->', state);
  });

  test('state testing, logIn', () => {
    mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }));
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

    store.dispatch(logInSuccess({
      payload: 'mockPayload'
    }));
    expState = {
      ...initialState,
      loading: true,
      isSignedUp: false,
      isLoggedIn: false,
    };
    state = store.getState().auth;
    // expect(state).toEqual(expState);

    console.log('authSlice testing, logIn state ->', state);
  });
});
