// import { takeEvery } from 'redux-saga/effects';

// import { REMOVE_ALERT } from '../constants/type_s';
// import { alertActions } from '../actions/alert';
// import alertWorker from './alert';
import { alertWorker } from './alerts'
import { recordSaga } from '../../testUtils'
import { delaySomthing } from '../../utils/utils'
import { removeAlert } from '../slices'

jest.mock('../../utils/utils', () => ({ delaySomthing: jest.fn() }))

describe('Whole Saga testing', () => {
  beforeAll(() => {
    jest.resetAllMocks()
  })

  test('alertWorker testing', async () => {
    delaySomthing.mockImplementation(() => Promise.resolve())
    const initialAction = {
      // type: START_ALERT,
      payload: { id: 'mockId' }
    }
    // console.log('alert testing, alertWorker ->', alertWorker)
    const dispatched = await recordSaga(alertWorker, initialAction)
    expect(delaySomthing).toHaveBeenCalledTimes(1)
    expect(dispatched.length).toBe(1)
    expect(dispatched[0]).toEqual({
      type: removeAlert.type,
      payload: initialAction.payload.id
    })
    // console.log('alertActions testing, dispatched ->', dispatched);

    // expect(genObject.next().value).toEqual(takeEvery(START_ALERT, ));
  })
})
