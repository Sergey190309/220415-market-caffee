import mockAxios from '../../api/apiClient'
// import mockAxios from 'axios';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import MockAdapter from 'axios-mock-adapter'

import {
  LOG_IN_MODAL_CLOSED,
  LOG_IN_SUCCESS,
  LOG_OUT,
  SIGN_UP_MODAL_CLOSED,
} from './types';

import { logInAction, logOutAction, setLoggedInFalse, setSignedUpFalse } from './auth';

// const mock = new MockAdapter(mockAxios)

jest.mock('../reducers');

describe('Auth action testing', () => {
  describe('normal action creators', () => {
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
  });

  describe('async action creators', () => {
    describe('logInAction', () => {
      // const mockArgs =
      test.only('success', async () => {
        // jest.setTimeout(10000);
        const middleWares = [thunk];
        const mockStore = configureMockStore(middleWares);
        // const mockState = {};
        const store = mockStore();
        // const store = mockStore(mockState);
        const mockEmail = 'test@email.com';
        const mockPassword = 'password';
        const mockData = {
          message: 'message',
          payload: {
            user_name: 'user_name',
            email: 'email',
            isAdmin: true,
            access_token: 'access_token',
            refresh_token: 'refresh_token',
          },
        };
        const expActions = [
          {
            type: LOG_IN_SUCCESS,
            payload: {
              userName: 'user_name',
              email: 'email',
              isAdmin: 'isAdmin',
              access_token: 'access_token',
              refresh_token: 'refresh_token',
            },
          },
        ];

        mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: mockData }));
        // mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: mockData }),)
        // mockAxios.post.mockResolvedValue({ data: mockData })

        await store.dispatch(logInAction(mockEmail, mockPassword));
        // console.log('hi')
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        // expect(mockAxios.post).toHaveBeenCalledWith(
        //   '/users/login',
        //   `{"email":"${mockEmail}","password":"${mockPassword}"}`
        // );
        console.log(store.getActions()[0])
        console.log(store.getActions()[1])
        // expect(store.getActions()).toEqual(expActions);
        // done();
      });
    });
  });
});
