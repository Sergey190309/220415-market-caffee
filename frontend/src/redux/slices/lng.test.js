import store from '../store';

import { initialState, lngSwitch } from './lng'
describe('Lenguage switcher testing', () => {
  test('state testing', () => {
    const mockPayload = 'mockLng'
    let state = store.getState().lng
    let expState = { ...initialState }
    expect(state).toEqual(expState);

    store.dispatch(lngSwitch(mockPayload))
    expState =
    console.log('lng, state ->', state);

  });
});