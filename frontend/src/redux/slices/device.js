import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  // Device sizes could be small (width less then 780) - phone; medium (1080) - tablet; big - normal PC
  deviceSize: 'small',
  // Modal opened state which form opened on modal. It could be 'LogIn', 'SignUp' or 'Loader'. Empty string means no modal
  kindOfModal: '',
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceSize: (state, { payload }) => {
      state.deviceSize = payload;
    },
    openModal: (state, { payload }) => {
      state.kindOfModal = payload;
    },
    closeModal: state => {
      state.kindOfModal = '';
    },
  },
});

export const { setDeviceSize, openModal, closeModal } = deviceSlice.actions
export const deviceSelector = state => state.device

export default deviceSlice.reducer