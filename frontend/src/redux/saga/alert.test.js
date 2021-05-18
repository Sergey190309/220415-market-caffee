import { takeEvery } from 'redux-saga/effects';

import {START_ALERT} from '../actions/types'
import { alertSaga, alertWorker } from './alert';

describe('Alert saga tesing', () => {
  const genObject = alertSaga()

  test('it should wait every start alert', () => {
    console.log(genObject.next().value)
    // console.log(genObject.next().value)
    // expect(genObject.next().value).toEqual(takeEvery(START_ALERT, ));
  });

});
