import lngSwitch from './lng'

import {LNG_SWITCH} from '../constants/types'

describe('Language switcher reducer', () => {

  test('change store testing', () => {
    const lngBefore = 'lngBefore'
    const expLng = 'lng_after'
    const action = {
      type: LNG_SWITCH,
      payload: expLng
    }
    const expStore = expLng
    expect(lngSwitch(lngBefore, action)).toBe(expStore);
  });

  test('wrong type', () => {
    const lngBefore = 'lngBefore'
    const expLng = 'lng_after'
    const action = {
      type: 'something',
      payload: expLng
    }
    // const expStore = 'ru'
    expect(lngSwitch(lngBefore, action)).toBe(lngBefore);
  });
});