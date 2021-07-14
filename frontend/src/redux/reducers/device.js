import { SET_DEVICE_SIZE, OPEN_MODAL, CLOSE_MODAL } from '../constants/types';

const initialState = {
  // Device sizes could be small (width less then 780) - phone; medium (1080) - tablet; big - normal PC
  deviceSize: 'small',
  // Modal opened state which form opened on modal. It could be 'LogIn', 'SignUp' or 'Loader'. Empty string means no modal
  kindOfModal: '',
};

const device = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // case SET_DEVICE_SIZE:
    //   return { ...state, deviceSize: payload };
    case OPEN_MODAL:
      // console.log('reducer, open modal')
      return { ...state, kindOfModal: payload };
    case CLOSE_MODAL:
      // console.log('reducer, close modal')
      return { ...state, kindOfModal: '' };
    default:
      return state;
  }
};

export default device;
