import store from '../store'
import { LNG_INFO } from '../constants/localStorageVariables'

import { initialState, lngSwitch } from './lng'
describe('Lenguage switcher testing', () => {
  test('state testing', () => {
    const mockPayload = 'mockLng'
    let state = store.getState().lng
    let expState = { ...initialState }
    expect(state).toEqual(expState)

    store.dispatch(lngSwitch(mockPayload))
    expState = { ...expState, lng: mockPayload }
    state = store.getState().lng
    expect(state).toEqual(expState)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenLastCalledWith(LNG_INFO, JSON.stringify(expState))
    // console.log('lng, state ->', state)
  })
})
