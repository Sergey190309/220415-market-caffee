import { SET_DEVICE_SIZE, OPEN_MODAL, CLOSE_MODAL } from './types';
import {
  setDeviceSize,
  setModalOpened,
  setModalClosed,
  smallDeviceLimit,
  mediumDeviceLimit,
} from './device';

describe('device action testing', () => {
  test('setDeviceSize', () => {
    const expAction = {
      type: SET_DEVICE_SIZE,
    };
    expect(setDeviceSize(smallDeviceLimit - 1)).toEqual({
      ...expAction,
      payload: 'small',
    });
    expect(setDeviceSize(mediumDeviceLimit - 1)).toEqual({
      ...expAction,
      payload: 'medium',
    });
    expect(setDeviceSize(mediumDeviceLimit)).toEqual({
      ...expAction, payload: 'big'
    });
  });

  test('setModalOpened', () => {
    const kindOfModal = 'something'
    const expAction = {
      type: OPEN_MODAL,
      payload: kindOfModal
    };
    expect(setModalOpened(kindOfModal)).toEqual(expAction);
  });

  test('setModalClosed', () => {
    const expAction = {
      type: CLOSE_MODAL,
    };
    expect(setModalClosed()).toEqual(expAction);
  });
});
