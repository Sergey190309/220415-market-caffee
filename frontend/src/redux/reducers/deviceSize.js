import { SET_DEVICE_SIZE, OPEN_MODAL, CLOSE_MODAL } from "../actions/types";

// Device sizes could be small (width less then 780) - phone; medium (1080) - tablet; big - normal PC

const initialState = {
  deviceSize: 'small',
  modalOpened: false
};

const device = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DEVICE_SIZE:
      return {...state, deviceSize: payload};
    case OPEN_MODAL:
      // console.log('reducer, open modal')
      return {...state, modalOpened: true}
    case CLOSE_MODAL:
      // console.log('reducer, close modal')
      return {...state, modalOpened: false}
    default:
      return state;
  }
};

export default device;
