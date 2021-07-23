// import i18next from 'i18next';

import { axiosCommonToken as mockAxiosCommonToken } from '../../api/apiClient';
import {
  resolveDataTechInPost as mockResolveDataPost,
  resolveDataTechInGet as mockResolveDataGet,
} from '../../testAxiosConstants';
import {
  initialState,
  setTestState,
  startInitLoading,
  startTechIn,
  techInSuccess,
} from './tech';
import store from '../store';
import { TECH_TOKEN } from '../constants/localStorageVariables';

jest.mock('../../api/apiClient')
// jest.mock('../../api/apiClient', () => ({
//   __esModule: true,
//   axiosCommonToken: jest.fn(),
//   techAxiosClient: {
//     post: () => Promise.resolve(mockResolveDataPost),
//     get: () => Promise.resolve(mockResolveDataGet),
//     defaults: {
//       headers: {
//         common: ['Authorization']
//       },
//     },
//   },
// }));

jest.mock('../../l10n/i18n');

describe('Tech slice testing', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('state testing', () => {
    let state = store.getState().tech;
    let expState = { ...initialState };
    expect(state).toEqual(expState);

    store.dispatch(startInitLoading());
    state = store.getState().tech;
    expState = { ...expState, loading: true, loaded: false };
    expect(state).toEqual(expState);

    store.dispatch(setTestState({ techLoaded: true }));
    store.dispatch(startTechIn('mockV4'));
    state = store.getState().tech;
    expect(state).toEqual(expState);

    const mockPayload = 'mockPayload';
    store.dispatch(techInSuccess(mockPayload));
    expect(mockAxiosCommonToken).toHaveBeenCalledTimes(1);
    expect(mockAxiosCommonToken).toHaveBeenCalledWith(mockPayload);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(TECH_TOKEN, mockPayload);
    state = store.getState().tech;
    expState = {
      ...initialState, techToken: mockPayload, techLoaded: true, loading: true
    };
    expect(state).toEqual(expState);

    console.log('tech slice testing, state  ->', state);
    // console.log('tech slice testing, expState  ->', expState);
  });
});
