import { techAxiosClient as mockAxios } from '../../api/apiClient';
import {
  resolveDataTechInPost as mockResolveDataPost,
  resolveDataTechInGet as mockResolveDataGet
} from '../../testAxiosConstants'
import { initialState, startInitLoading } from './tech'
import store from '../store'

jest.mock('../../api/apiClient');

describe('Tech slice testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });
  test('state testing', async () => {
    mockAxios.post.mockImplementation(() => Promise.resolve( mockResolveDataPost ));
    mockAxios.get.mockImplementation(() => Promise.resolve( mockResolveDataGet ));
    let state = store.getState().tech
    let expState = {...initialState}
    expect(state).toEqual(expState);

    store.dispatch(startInitLoading())
    expState = { ...expState, loading: true, loaded: false }
    expect(state).toEqual(expState);

    console.log('tech slice testing, state   ->', state)
  });
});
