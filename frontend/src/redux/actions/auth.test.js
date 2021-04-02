import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LOG_IN_MODAL_CLOSED, LOG_OUT, SIGN_UP_MODAL_CLOSED } from './types';

import { logInAction, logOutAction, setLoggedInFalse, setSignedUpFalse } from './auth';

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
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    describe('logInAction', () => {
      // const mockArgs =
      test('success', done => {
        const mockState = {};
        const store = mockStore(mockState);
        const expActions = [];
        store.dispatch(logInAction('email', 'password')).then(()=>expect(store.getActions()).toEqual(expActions))
      });
    });
  });
});
