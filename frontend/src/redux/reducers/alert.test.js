import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import alertReducer from './alert';

describe('alertReducer', () => {
  test('should return initial state haveing invalid action', () => {
    expect(alertReducer(undefined, {})).toEqual([]);
  });

  test('should set alert', () => {
    const action = {
      type: SET_ALERT,
      payload: {
        message: 'Test message',
        alertType: 'Alert type',
        id: 'test id',
      },
    };
    expect(alertReducer(undefined, action)[0]).toEqual(action.payload);
  });

  test('it should remove alert', () => {
    const state = [
      {
        message: 'Test message',
        alertType: 'Alert type',
        id: 'test id',
      },
      {
        message: 'Test message 2',
        alertType: 'Alert type 2',
        id: 'test id 2',
      },
    ];
    const action = {
      type: REMOVE_ALERT,
      payload: 'test id',
    };
    expect(alertReducer(state, action)).toEqual([
      {
        message: 'Test message 2',
        alertType: 'Alert type 2',
        id: 'test id 2',
      },
    ]);
  });
});
