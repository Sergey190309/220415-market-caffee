import mockAxios from 'axios';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LOG_IN_MODAL_CLOSED, LOG_IN_SUCCESS, LOG_OUT, SIGN_UP_MODAL_CLOSED } from './types';

import { logInAction, logOutAction, setLoggedInFalse, setSignedUpFalse } from './auth';

jest.mock('../reducers/index');

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
      test.only('success', async done => {
        const middleWares = [thunk];
        const mockStore = configureMockStore(middleWares);
        const mockState = {};
        const store = mockStore(mockState);
        const mockEmail = 'test@email.com';
        const mockPassword = 'password';
        const mockData = {
          data: {
            message: 'message',
            payload: {
              user_name: 'user_name',
              email: 'email',
              isAdmin: 'isAdmin',
              access_token: 'access_token',
              refresh_token: 'refresh_token',
            },
          },
        };
        const expActions = [
          {
            type: LOG_IN_SUCCESS,
            payload: {
              user_name: 'user_name',
              email: 'email',
              isAdmin: 'isAdmin',
              access_token: 'access_token',
              refresh_token: 'refresh_token',
            }
          }
        ];

        mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: mockData }));

        await store.dispatch(logInAction(mockEmail, mockPassword))
        expect(store.getActions()).toEqual(expActions);
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
      });
    });
  });
});
