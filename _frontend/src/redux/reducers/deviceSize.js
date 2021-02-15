import { SET_DEVICE_SIZE } from "../actions/types";

// Device sizes could be small (width less then 780) - phone; medium (1080) - tablet; big - normal PC

const initialState = {
  deviceSize: 'small'
};

const device = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DEVICE_SIZE:
      return {...state, deviceSize: payload};
    default:
      return state;
  }
};

export default device;
