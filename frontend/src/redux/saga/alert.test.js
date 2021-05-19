// import { takeEvery } from 'redux-saga/effects';

import {START_ALERT} from '../actions/types'
// import { alertActions } from '../actions/alert';
// import alertWorker from './alert';
import { alertSaga, alertWorker } from './alert';
import { recordSaga } from '../../testUtils';
import { delaySomthing } from './sagasUtils';

jest.mock('./sagasUtils', () => ({ delaySomthing: jest.fn() }));

describe('Whole Saga testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('alertWorker testing', async () => {
    // delayAlertHiding.mockImplementation(() => Promise.resolve());
    const initialAction = {
      type: START_ALERT,
      payload: { timeout: 10 },
    };
    console.log('alert testing, alertWorker ->', alertWorker)
    const dispatched = await recordSaga(alertWorker, initialAction);
    // console.log('alertActions testing, dispatched ->', dispatched);
    // expect(genObject.next().value).toEqual(takeEvery(START_ALERT, ));
  });
});
