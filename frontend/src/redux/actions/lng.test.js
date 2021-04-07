import { LNG_SWITCH } from './types';
import { setLngAction } from './lng';

describe('Language switcher action', () => {
  test('just function test', () => {
    const mockLng = 'ch';
    const expAction = {
      type: LNG_SWITCH,
      payload: mockLng,
    };
    expect(setLngAction(mockLng)).toEqual(expAction);
  });
});
