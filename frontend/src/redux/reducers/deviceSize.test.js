import device from './deviceSize';
import { SET_DEVICE_SIZE, OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

describe('Set device configuration', () => {
  let initState, action_to_medium, action_to_small, action_modal_open, action_modal_close;
  beforeEach(() => {
    initState = {
      deviceSize: 'small',
      modalOpened: '',
    };
    action_to_medium = {
      type: SET_DEVICE_SIZE,
      payload: 'medium',
    };
    action_to_small = {
      type: SET_DEVICE_SIZE,
      payload: 'small',
    };
    action_modal_open = {
      type: OPEN_MODAL,
      payload: 'LogIn',
    };
    action_modal_close = {
      type: CLOSE_MODAL,
    };
  });

  test('it should be initial state without action', () => {
    expect(device(undefined, {})).toEqual(initState);
  });

  describe('Size changing', () => {
    test('change device size to medium then to small', () => {
      expect(device(initState, action_to_medium).deviceSize).toBe('medium');
      expect(device(initState, action_to_small).deviceSize).toBe('small');
    });
  });

  describe('Modal open testing', () => {
    test('Change modal state to open then to close', () => {
      expect(device(initState, action_modal_open).modalOpened).toBeTruthy();
      expect(device(initState, action_modal_close).modalOpened).not.toBeTruthy();
    });
  });
});
