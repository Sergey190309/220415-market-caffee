import { SET_DEVICE_SIZE, OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const initialState = {
  // Device sizes could be small (width less then 780) - phone; medium (1080) - tablet; big - normal PC
  deviceSize: 'small',
  // Modal opened state which form opened on modal. It could be 'LogIn', 'SignUp' or 'Loader. Empty string means no modal
  modalOpened: '',
};

const device = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DEVICE_SIZE:
      return { ...state, deviceSize: payload };
    case OPEN_MODAL:
      // console.log('reducer, open modal')
      return { ...state, modalOpened: payload };
    case CLOSE_MODAL:
      // console.log('reducer, close modal')
      return { ...state, modalOpened: '' };
    default:
      return state;
  }
};

export default device;
