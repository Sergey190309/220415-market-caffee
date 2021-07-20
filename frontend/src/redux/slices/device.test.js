import store from '../store';
import { initialState, setDeviceSize, openModal, closeModal } from './device';

describe('device testing', () => {
  const mockDeviceSize = 'big'
  const mockKindOfModal = 'kindOfModal'
  test('state testing', () => {
    let state = store.getState().device;
    let expState = {...initialState}
    expect(state).toEqual(expState);

    store.dispatch(setDeviceSize(mockDeviceSize));
    state = store.getState().device;
    expState = {...expState, deviceSize: mockDeviceSize};
    expect(state).toEqual(expState);

    store.dispatch(openModal(mockKindOfModal));
    state = store.getState().device;
    expState = {...expState, kindOfModal: mockKindOfModal}
    expect(state).toEqual(expState);

    store.dispatch(closeModal());
    state = store.getState().device;
    expState = {...expState, kindOfModal: ''}
    expect(state).toEqual(expState);

    // console.log('device, state ->', state);
  });
});
