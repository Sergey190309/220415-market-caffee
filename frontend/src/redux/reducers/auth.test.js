import auth, { initialStore } from './auth';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

describe('Auth reducer testing', () => {
  const token ='some token'
  const testInitStore = {
    token: token,
    isAuthenticated: null,
    loading: true,
    user: null,
  };
  test('initialStore seting', () => {
    const testInitStoreAdopted = {...initialStore, token: token}
    expect(testInitStoreAdopted).toEqual(testInitStore);
  });

  test('register success', () => {
    const token = 'test token';
    const action = {
      type: REGISTER_SUCCESS,
      payload: {
        token: token,
      },
    };
    const expResult = {
      ...testInitStore,
      token: action.payload.token,
      isAuthenticated: true,
      loading: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    expect(auth(testInitStore, action)).toEqual(expResult);
    // console.log(result);
  });

  test('register fail', () => {
    const action = {
      type: REGISTER_FAIL,
    };
    const expResult = {
      ...testInitStore,
      token: 'some token',
      isAuthenticated: false,
      loading: false,
    };
    expect(testInitStore).not.toEqual(expResult);
    // console.log(auth(testInitStore, action));
    expect(auth(testInitStore, action)).toEqual(expResult);
  });
});
