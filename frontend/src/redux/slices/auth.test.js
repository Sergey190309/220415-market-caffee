import { techAxiosClient as mockAxios } from '../../api/apiClient';
import {
  // logInData as mockLogInData,
  resolveData as mockResolveData,
  // rejectData as mockRejectData,
} from '../../testAxiosConstants'


import store from '../store'
import { initialState, signUpStart,  } from './auth'

describe('Auth slicer testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('state testing', () => {
    mockAxios.post.mockImplementation(() => Promise.resolve({ data: mockResolveData }));

    let state = store.getState().auth
    let expState = {...initialState}
    expect(state).toEqual(expState);

    store.dispatch(signUpStart())
    expState = {...expState, loading: true}
    state = store.getState().auth
    expect(state).toEqual(expState);

    console.log('authSlice testing, state ->', state)

  });
});