// import i18next from 'i18next';

import { axiosCommonToken } from '../../api/apiClient';
import {
  initialState,
  setTestState,
  startInitLoading,
  startTechIn,
  techInSuccess,
} from './tech';
import store from '../store';
import { TECH_TOKEN } from '../constants/localStorageVariables';

jest.mock('../../api/apiClient');
jest.mock('../../l10n/i18n');

describe('Tech slice testing', () => {
  let state;
  beforeAll(() => {
    jest.resetAllMocks();
    store.dispatch(setTestState(initialState))
    state = store.getState().tech;
  });
  test('startInitLoading reducer', () => {
    let expState = { ...initialState };
    expect(state).toEqual(expState);

    store.dispatch(startInitLoading());
    state = store.getState().tech;
    expState = { ...expState, loading: true, loaded: false };
    expect(state).toEqual(expState);
    // console.log('tech slice testing, state ->', state);
  });
  test('startTechIn reducer', () => {
    console.log('tech slice testing, state ->', state);

  });
});
    // store.dispatch(setTestState({ techLoaded: true }));
    // store.dispatch(startTechIn('mockV4'));
    // state = store.getState().tech;
    // expect(state).toEqual(expState);

    // const mockPayload = 'mockPayload';
    // store.dispatch(techInSuccess(mockPayload));
    // expect(axiosCommonToken).toHaveBeenCalledTimes(1);
    // expect(axiosCommonToken).toHaveBeenCalledWith(mockPayload);
    // expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(localStorage.setItem).toHaveBeenCalledWith(TECH_TOKEN, mockPayload);
    // state = store.getState().tech;
    // expState = {
    //   ...initialState, techToken: mockPayload, techLoaded: true, loading: true
    // };
    // expect(state).toEqual(expState);

    // console.log('tech slice testing, expState  ->', expState);
