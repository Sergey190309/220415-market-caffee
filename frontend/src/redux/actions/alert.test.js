import {setAlertData, alertActions} from './alert'
import { START_ALERT } from '../actions/types';

describe('alert action testing', () => {
  test('setAlertData', () => {
    const mockIncomeData = {
      message: 'message',
      alertType: 'info',
      timeout: 3000
    }
    const result = setAlertData(mockIncomeData)
    const { id, ...otherProps } = result

    expect(otherProps).toEqual(mockIncomeData);
    expect(id).toBeString()
    // expect(id).not.toBeUndefined();
  });

  test('alertActions', () => {
    const mockAlertData = {
      message: 'message',
      alertType: 'info',
      timeout: 3000
    }
    const result = alertActions(mockAlertData)
    const { type, payload } = result
    const { id, ...otherProps } = payload

    expect(type).toEqual(START_ALERT);
    expect(otherProps).toEqual(mockAlertData);
    expect(id).toBeString()
    // expect(id).not.toBeUndefined();
  });


});