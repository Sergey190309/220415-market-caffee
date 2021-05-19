// import { takeEvery } from 'redux-saga/effects';

// import {START_ALERT} from '../actions/types'
// import { alertActions } from '../actions/alert';
import { alertSaga } from './alert';
import { recordSaga } from '../../testUtils';
import { delayAlertHiding } from './alert';

jest.mock('./alert', () => ({ delayAlertHiding: jest.fn() }));

describe('Whole Saga testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('alertActions testing', () => {
    delayAlertHiding.mockImplementation(() => Promise.resolve());
    const initialAction = {
      payload: { timeout: 1000 },
    };
    const dispatched = recordSaga(alertSaga, initialAction);
    console.log('alertActions testing, dispatched ->', dispatched);
    // expect(genObject.next().value).toEqual(takeEvery(START_ALERT, ));
  });
});
