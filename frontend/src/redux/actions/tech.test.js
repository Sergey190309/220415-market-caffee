import { v4 } from 'uuid';
import { startLoading } from './tech';
import { START_LOADING } from '../actions/types';

describe('action tech test', () => {
  test('startLoading test', () => {
    const mockSessionId = v4()
    const expResult = {
      type: START_LOADING,
      payload: mockSessionId
    }
    expect(startLoading(mockSessionId)).toEqual(expResult);
  });
});