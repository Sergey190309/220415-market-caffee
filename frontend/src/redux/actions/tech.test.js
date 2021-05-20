import { v4 } from 'uuid';
import { startLoading, startTechIn } from './tech';
import { START_INIT_LOADING, START_TECH_IN } from '../actions/types';

describe('action tech test', () => {
  test('startLoading test', () => {
    // const mockSessionId = v4()
    const expResult = {
      type: START_INIT_LOADING,
      // payload: mockSessionId
    }
    expect(startLoading()).toEqual(expResult);
  });
  test('startTechIn testing', () => {
    const sessionId = v4()
    const expAction = {
      type: START_TECH_IN,
      payload: sessionId
    }
    expect(startTechIn(sessionId)).toEqual(expAction);
  });
});
