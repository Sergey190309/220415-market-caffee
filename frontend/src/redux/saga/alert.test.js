// import { takeEvery } from 'redux-saga/effects';

import {START_ALERT} from '../actions/types'
// import { alertActions } from '../actions/alert';
import { alertSaga, alertWorker } from './alert';
import { recordSaga } from '../../testUtils';
import { delayAlertHiding } from './alert';

jest.mock('./alert', () => ({ delayAlertHiding: jest.fn() }));

describe('Whole Saga testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('alertWorker testing', async () => {
    delayAlertHiding.mockImplementation(() => Promise.resolve());
    const initialAction = {
      type: START_ALERT,
      payload: { timeout: 10 },
    };
    // const dispatched = await recordSaga(alertWorker, initialAction);
    // console.log('alertActions testing, dispatched ->', dispatched);
    // expect(genObject.next().value).toEqual(takeEvery(START_ALERT, ));
  });
});
