import { SET_DEVICE_SIZE } from "./types";

// Device sizes could be small (width less then 780) - phone; medium (1080) - tablet; big - normal PC

const smallDeviceLimit = 780; // That's limit where device deemed small (side bar)
const mediumDeviceLimit = 1080; // That's limit where device deemed small (side bar)

export const setDeviceSize = (width) => (dispatch) => {
  // console.log('actions setDeviceSize width', width)
  const deviceSize =
    (width < smallDeviceLimit? 'small': (
      width < mediumDeviceLimit? 'medium': 'big'
    ))
  // let deviceSize = "";
  // switch (width) {
  //   case (width < smallDeviceLimit):
  //     deviceSize = "small";
  //     break;
  //   case (width < mediumDeviceLimit):
  //     deviceSize = "medium";
  //     break;
  //   default:
  //     deviceSize = 'big';
  // console.log('actions setDeviceSize deviceSize', deviceSize)
  return dispatch({
    type: SET_DEVICE_SIZE,
    payload: deviceSize,
  });
};
