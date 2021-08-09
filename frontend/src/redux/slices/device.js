import { createSlice } from '@reduxjs/toolkit'

export const smallDeviceLimit = 780 // That's limit where device deemed small (side bar)
export const mediumDeviceLimit = 1080 // That's limit where device deemed small (side bar)

export const initialState = {
  // Device sizes could be small (width less then 780) - phone; medium (1080) - tablet; big - normal PC
  deviceSize: 'small',
  // Modal opened state which form opened on modal. It could be 'LogIn', 'SignUp' or 'Loader'. Empty string means no modal
  kindOfModal: '',
  editable: false
}

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setTestState: (state, { payload }) => {
      /**
       * That's for testing only.
       * It rewrites all state.
       */
      Object.assign(state, payload)
    },
    setDeviceSize: (state, { payload }) => { // tested
      /**
       * Device sizes could be small (width less then 780) - phone;
       * medium (1080) - tablet;
       * big - normal PC
       */
      // console.log('deviceSlice, setDeviceSize, payload ->', payload)
      // state.deviceSize = payload;
      state.deviceSize = payload < smallDeviceLimit ? 'small' : payload < mediumDeviceLimit ? 'medium' : 'big'
    },
    openModal: (state, { payload }) => { // tested
      // console.log('deviceSlice, openModal, payload ->', payload)
      state.kindOfModal = payload
    },
    closeModal: state => { // tested
      state.kindOfModal = ''
    },
    setEditable: (state, { payload }) => { // tested
      state.editable = payload
    }
  }
})

export const { setTestState, setDeviceSize, openModal, closeModal, setEditable } = deviceSlice.actions
export const deviceSelector = state => state.device

export default deviceSlice.reducer
