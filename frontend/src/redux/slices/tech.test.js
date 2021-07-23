// import i18next from 'i18next';

import {
  techAxiosClient as mockAxios,
  axiosCommonToken as mockAxiosCommonToken
} from '../../api/apiClient';
import {
  resolveDataTechInPost as mockResolveDataPost,
  resolveDataTechInGet as mockResolveDataGet
} from '../../testAxiosConstants'
import { initialState, setTestState, startInitLoading, startTechIn, techInSuccess } from './tech'
import store from '../store'

jest.mock('../../api/apiClient', () => ({
  __esModule: true,
  axiosCommonToken: jest.fn()
}));
jest.mock('../../l10n/i18n')

describe('Tech slice testing', () => {
  afterAll(() => {
    jest.resetAllMocks();


  });
  test('state testing', () => {
    mockAxios.post.mockImplementation(() => Promise.resolve( mockResolveDataPost ));
    mockAxios.get.mockImplementation(() => Promise.resolve( mockResolveDataGet ));
    let state = store.getState().tech
    let expState = {...initialState}
    expect(state).toEqual(expState);

    store.dispatch(startInitLoading())
    state = store.getState().tech
    expState = { ...expState, loading: true, loaded: false }
    expect(state).toEqual(expState);

    store.dispatch(setTestState({techLoaded: true}))
    store.dispatch(startTechIn('mockV4'))
    state = store.getState().tech
    expect(state).toEqual(expState);

    const mockPayload='mockPayload'
    store.dispatch(techInSuccess(mockPayload))
    state = store.getState().tech
    expect(mockAxiosCommonToken).toHaveBeenCalledTimes(1);
    expect(mockAxiosCommonToken).toHaveBeenCalledWith(mockPayload);
    expState = { ...expState }

    expect(state).toEqual(expState);


    console.log('tech slice testing, state  ->', state)
  });
});
