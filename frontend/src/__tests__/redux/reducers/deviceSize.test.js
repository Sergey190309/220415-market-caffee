import device from '../../../redux/reducers/deviceSize';
import { SET_DEVICE_SIZE } from '../../../redux/actions/types';

describe('Set device size', () => {
  let initState;
  let action;
  beforeEach(() => {
    initState = {
      deviceSize: 'small',
    };
    action = {
      type: SET_DEVICE_SIZE,
      payload: 'medium',
    };
  });

  it('should set initial state', () => {
    expect(device(undefined, {})).toEqual(initState);
  });

  it('should change device size to medium', () => {
    expect(device(initState, action).deviceSize).toBe('medium');
  });
});
