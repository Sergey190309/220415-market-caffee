// import { takeEvery } from 'redux-saga/effects';

// import {START_ALERT} from '../actions/types'
import { recordSaga } from '../../testUtils';
import { delayAlertHiding } from './alert';



jest.mock('./alert', () => ({ delayAlertHiding: jest.fn() }));

describe('Whole Saga testing', () => {

  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('it should wait every start alert', () => {
    // delayAlertHiding.mockImplementation(() => Promise.resolve());
    // const dispatched = recordSaga()
    // console.log(genObject.next().value)
    // expect(genObject.next().value).toEqual(takeEvery(START_ALERT, ));
  });
});
