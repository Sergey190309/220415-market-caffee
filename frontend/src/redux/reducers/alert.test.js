import { REMOVE_ALERT, START_ALERT } from '../actions/types';
import alertReducer from './alert';

describe('alertReducer', () => {
  test('should return initial state haveing invalid action', () => {
    expect(alertReducer(undefined, {})).toEqual([]);
  });

  test('should set alert', () => {
    const mockState = [
      {
        message: 'Test message',
        alertType: 'Alert type',
        id: 'test id',
      }
    ]
    const action = {
      type: START_ALERT,
      payload: {
        message: 'Test message 2',
        alertType: 'Alert type 2',
        id: 'test id 2',
      },
    };
    const expState = [...mockState, action.payload]
    // console.log(expState)
    // console.log(alertReducer(mockState, action))
    expect(alertReducer(mockState, action)).toEqual(expState);
  });

  test('it should remove alert', () => {
    const mockState = [
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
    expect(alertReducer(mockState, action)).toEqual([
      {
        message: 'Test message 2',
        alertType: 'Alert type 2',
        id: 'test id 2',
      },
    ]);
  });
});
