import { SET_SMALL_DEVICE } from "./types";

const smallDeviceLimit = 800  // That's limit where device deemed small (side bar)

export const setSmallDevice = (width) => (dispatch) => {
  dispatch({
    type: SET_SMALL_DEVICE,
    payload: width < smallDeviceLimit,
  });
};
