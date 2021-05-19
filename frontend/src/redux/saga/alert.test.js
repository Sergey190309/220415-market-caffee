import { takeEvery } from 'redux-saga/effects';

import {START_ALERT} from '../actions/types'
import { alertSaga, delay } from './alert';

describe('Alert saga tesing', () => {
  describe('Normal func testing', () => {
    test('delay func testing', () => {
      console.log('delay func testing, result ->', delay(1000))
    });
  });

  describe('Saga testing', () => {
    test('it should wait every start alert', () => {
      // console.log(genObject.next().value)
      // expect(genObject.next().value).toEqual(takeEvery(START_ALERT, ));
    });

  });

});
