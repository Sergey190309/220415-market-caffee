import { initial } from 'lodash';
import store from '../store';
import { initialState, setTestState, setDeviceSize, openModal, closeModal, setEditable } from './device';

describe('device slice testing', () => {
  const mockDeviceSize = 'big'
  const mockKindOfModal = 'kindOfModal'
  let state
  beforeEach(() => {
    jest.resetAllMocks()
    store.dispatch(setTestState(initialState))
    state = store.getState().device
    expect(state).toEqual(initialState);
  })

  test('setDeviceSize', () => {
    store.dispatch(setDeviceSize(780))
    state = store.getState().device
    expect(state).toBe('medium');
  });

    // store.dispatch(setDeviceSize(mockDeviceSize));
    // state = store.getState().device;
    // expState = {...expState, deviceSize: mockDeviceSize};
    // expect(state).toEqual(expState);

    // store.dispatch(openModal(mockKindOfModal));
    // state = store.getState().device;
    // expState = {...expState, kindOfModal: mockKindOfModal}
    // expect(state).toEqual(expState);

    // store.dispatch(closeModal());
    // state = store.getState().device;
    // expState = {...expState, kindOfModal: ''}
    // expect(state).toEqual(expState);

    // console.log('device, state ->', state);
});
