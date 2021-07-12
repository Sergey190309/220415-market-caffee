import store from '../store'
import { initialState, startInitLoading } from './tech'
describe('Tech slice testing', () => {
  const mockPayload = {}
  // let state
  beforeEach(() => {
    // state = store.getState().tech
    // expect(state).toEqual(initialState);
  })
  test('startInitLoading', () => {
    let state = store.getState().tech
    store.dispatch(startInitLoading())
    state = store.getState().tech
    // expect(state.loading).toBeTruthy();
    console.log('startInitLoading, state ->', state)
  });
});