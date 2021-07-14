import { techAxiosClient as mockAxios } from '../../api/apiClient';
import store from '../store';
import { initialState, startInitLoading } from './tech';
describe('Tech slice testing', () => {
  const mockPayload = {};
  const mockTechInResolve = 'mockTechToken';
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('startInitLoading', async () => {
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ data: mockTechInResolve })
    );
    let state = store.getState().tech;
    store.dispatch(startInitLoading());
    // state = store.getState().tech;
    // expect(state.loading).toBeTruthy();
    console.log('startInitLoading, state ->', state);
  });
});
