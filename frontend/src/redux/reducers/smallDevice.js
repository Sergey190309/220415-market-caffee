import { SET_SMALL_DEVICE } from "../actions/types";


const initialState = {
  smallDevice: true
};

const device = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SMALL_DEVICE:
      return {...state, smallDevice: payload};
    default:
      return state;
  }
};

export default device;
