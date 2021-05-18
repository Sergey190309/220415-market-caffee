import { takeEvery, take } from 'redux-saga/effects';

import { LOG_IN_START } from '../actions/types';
import { logInSaga, logInFetch } from './auth';

describe('auth testing', () => {
  describe('logIn tesing', () => {
    const genObject = logInSaga();
    test('should catch every LOG_IN_START call', () => {
      // console.log(genObject.next().value)
      expect(genObject.next().value).toEqual(take(LOG_IN_START, logInFetch));
      // console.log(genObject.next().value)
    });

    test('it should be done next iteration', () => {
      expect(genObject.next().done).toBeTruthy();
    });
  });
});
