import i18next from 'i18next';

import { techAxiosClient as mockAxios } from '../../api/apiClient';
import {
  resolveDataTechInPost as mockResolveDataPost,
  resolveDataTechInGet as mockResolveDataGet
} from '../../testAxiosConstants'
import { initialState, startInitLoading } from './tech'
import store from '../store'

jest.mock('../../api/apiClient');

jest.mock('react-i18next', () => ({
  use: jest.fn(),
  languages: ['en', 'ru'],
  useTranslation: () => ({
    t: key => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));


describe('Tech slice testing', () => {
  beforeAll(() => {
    jest.resetAllMocks();
    // i18next.use.mock.mockReturnValue('i18next.use')
    // jest.mock('react-i18next', () => ({
    //   use: jest.fn(),
    //   languages: ['en', 'ru'],
    //   useTranslation: () => ({
    //     t: key => key,
    //     i18n: {
    //       changeLanguage: jest.fn(),
    //     },
    //   }),
    // }));
    // console.log('tech slice testing, i18next ->', i18next)
  });
  test('state testing', async () => {
    console.log('tech slice testing, i18next.use ->', i18next)
    // console.log('tech slice testing, i18next.use ->', i18next.use())
    mockAxios.post.mockImplementation(() => Promise.resolve( mockResolveDataPost ));
    mockAxios.get.mockImplementation(() => Promise.resolve( mockResolveDataGet ));
    let state = store.getState().tech
    let expState = {...initialState}
    expect(state).toEqual(expState);

    store.dispatch(startInitLoading())
    expState = { ...expState, loading: true, loaded: false }
    expect(state).toEqual(expState);

    console.log('tech slice testing, state ->', state)
  });
});
