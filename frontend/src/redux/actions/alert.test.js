import {setAlertData, alertActions} from './alert'
import { REMOVE_ALERT, START_ALERT } from '../actions/types';

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
  });
});