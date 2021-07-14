import { OPEN_MODAL, CLOSE_MODAL } from '../constants/types';

// Device sizes could be small (width less then 780) - phone; medium (1080) - tablet; big - normal PC

export const smallDeviceLimit = 780; // That's limit where device deemed small (side bar)
export const mediumDeviceLimit = 1080; // That's limit where device deemed small (side bar)

// export const setDeviceSize = width =>  {
//   // console.log('actions setDeviceSize width', width)
//   const deviceSize =
//     width < smallDeviceLimit ? 'small' : width < mediumDeviceLimit ? 'medium' : 'big';
//   // console.log('SetSize')
//   return ({
//     type: SET_DEVICE_SIZE,
//     payload: deviceSize,
//   });
// };

export const setModalOpened = kindOfModal => {
  // console.log('action, open', kindOfModal)
  return ({
    type: OPEN_MODAL,
    payload: kindOfModal,
  });
};

export const setModalClosed = () => {
  // console.log('action, close')
  return ({
    type: CLOSE_MODAL,
  });
};
