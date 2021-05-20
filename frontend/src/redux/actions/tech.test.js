import { v4 } from 'uuid';
import { startLngs, startLoading, startTechIn, techInSuccess } from './tech';
import { START_INIT_LOADING, START_LNGS, START_TECH_IN, TECH_IN_SUCCESS } from '../actions/types';

describe('actions tech tests', () => {

  test('startLoading', () => {
    // const mockSessionId = v4()
    const expResult = {
      type: START_INIT_LOADING,
      // payload: mockSessionId
    }
    expect(startLoading()).toEqual(expResult);
  });

  test('startTechIn', () => {
    const sessionId = v4()
    const expAction = {
      type: START_TECH_IN,
      payload: sessionId
    }
    expect(startTechIn(sessionId)).toEqual(expAction);
  });

  test('techInSuccess', () => {
    const techToken = 'test_tech_token'
    const expAction = {
      type: TECH_IN_SUCCESS,
      payload: techToken
    }
    expect(techInSuccess(techToken)).toEqual(expAction);
  });
  test('startLngs', () => {
    // const mockSessionId = v4()
    const expResult = {
      type: START_LNGS,
      // payload: mockSessionId
    }
    expect(startLngs()).toEqual(expResult);
  });

});
