import { v4 } from 'uuid';
import {
  startLoading,
  loadingSuccess,
  startTechIn,
  techInSuccess,
  techInFail,
  startLngs,
  lngsSuccess,
  lngsFail,
  startI18n,
  i18nSuccess,
  i18nFail,
  i18nInitiated,
} from './tech';
import {
  START_INIT_LOADING,
  INIT_LOADING_SUCCESS,
  START_TECH_IN,
  TECH_IN_SUCCESS,
  TECH_IN_FAIL,
  START_LNGS,
  I18N_SUCCESS,
  I18N_FAIL,
  START_I18N,
  LNGS_FAIL,
  LNGS_SUCCESS,
  I18N_INITIATED,
} from '../constants/types';

describe('actions tech tests', () => {
  test('startLoading', () => {
    // const mockSessionId = v4()
    const expResult = {
      type: START_INIT_LOADING,
      // payload: mockSessionId
    };
    expect(startLoading()).toEqual(expResult);
  });

  test('loadingSuccess', () => {
    // const mockSessionId = v4()
    const expResult = {
      type: INIT_LOADING_SUCCESS,
      // payload: mockSessionId
    };
    expect(loadingSuccess()).toEqual(expResult);
  });

  test('startTechIn', () => {
    const sessionId = v4();
    const expAction = {
      type: START_TECH_IN,
      payload: sessionId,
    };
    expect(startTechIn(sessionId)).toEqual(expAction);
  });

  test('techInSuccess', () => {
    const techToken = 'test_tech_token';
    const expAction = {
      type: TECH_IN_SUCCESS,
      payload: techToken,
    };
    expect(techInSuccess(techToken)).toEqual(expAction);
  });

  test('techInFail', () => {
    const error = 'test_error';
    const expAction = {
      type: TECH_IN_FAIL,
      payload: error,
    };
    expect(techInFail(error)).toEqual(expAction);
  });

  test('startLngs', () => {
    // const mockSessionId = v4()
    const expResult = {
      type: START_LNGS,
      // payload: mockSessionId
    };
    expect(startLngs()).toEqual(expResult);
  });

  test('lngsSuccess', () => {
    // const lngs = ['en', 'ru', 'cn'];
    const expAction = {
      type: LNGS_SUCCESS,
      // payload: lngs,
    };
    expect(lngsSuccess()).toEqual(expAction);
  });

  test('lngsFail', () => {
    const error = 'test_error';
    const expAction = {
      type: LNGS_FAIL,
      payload: error,
    };
    expect(lngsFail(error)).toEqual(expAction);
  });

  test('starti18N', () => {
    const lngs = ['en', 'ru', 'cn'];
    const expAction = {
      type: START_I18N,
      payload: lngs
    };
    expect(startI18n(lngs)).toEqual(expAction);
  });

  test('i18nInitiated', () => {
    const expAction = {
      type: I18N_INITIATED,
    }
    expect(i18nInitiated()).toEqual(expAction);
  });

  test('i18nSuccess', () => {
    // const lngs = ['en', 'ru', 'cn']
    const expAction = {
      type: I18N_SUCCESS,
      // payload: lngs
    };
    expect(i18nSuccess()).toEqual(expAction);
  });

  test('i18nFail', () => {
    const error = 'test_error';
    const expAction = {
      type: I18N_FAIL,
      payload: error,
    };
    expect(i18nFail(error)).toEqual(expAction);
  });
});
