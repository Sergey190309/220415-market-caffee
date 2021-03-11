import { SET_DEVICE_SIZE, OPEN_MODAL, CLOSE_MODAL } from './types';

// Device sizes could be small (width less then 780) - phone; medium (1080) - tablet; big - normal PC

const smallDeviceLimit = 780; // That's limit where device deemed small (side bar)
const mediumDeviceLimit = 1080; // That's limit where device deemed small (side bar)

export const setDeviceSize = width => dispatch => {
  // console.log('actions setDeviceSize width', width)
  const deviceSize =
    width < smallDeviceLimit ? 'small' : width < mediumDeviceLimit ? 'medium' : 'big';
  // console.log('SetSize')
  return dispatch({
    type: SET_DEVICE_SIZE,
    payload: deviceSize,
  });
};

export const setModalOpened = kindOfModal => dispatch => {
  // console.log('action, open')
  return dispatch({
    type: OPEN_MODAL,
    payload: kindOfModal,
  });
};

export const setModalClosed = () => dispatch => {
  // console.log('action, close')
  return dispatch({
    type: CLOSE_MODAL,
  });
};
