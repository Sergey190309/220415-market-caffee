import { createSlice } from '@reduxjs/toolkit'
import { smallDeviceLimit, mediumDeviceLimit } from '../constants/deviceWidthLimits'

export const initialState = {
  /**
   * Device sizes could be small (width less then 780) - phone;
   * medium (1080) - tablet; big - normal PC
   */
  deviceSize: 'small',
  /**
   * Modal opened state which form opened on modal. It could be
   * 'LogIn', 'SignUp', 'ConfirmPassword' or 'Loader'.
   * Empty string means no modal
   */
  // kindOfModal: '',
  /**
   * This is a message that in some cases shown on modal.
   */
  message: '',
  /**
   * That is NavBar visibility
   */
  isNavBarOpened: false, // not use now 2022-Jul-29 06:52
  /**
   * That's indicate possibiblity to edit views content by user.
   */
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
      state.deviceSize = payload < smallDeviceLimit ? 'small' : payload < mediumDeviceLimit ? 'medium' : 'big'
    },
    // openModal: (state, { payload }) => { // tested
    //   state.kindOfModal = payload
    // },
    // closeModal: state => { // tested
    //   state.kindOfModal = ''
    // },
    setMessage: (state, { payload }) => {
      state.message = payload
    },
    setNavBarVisibility: (state, { payload }) => {
      // console.log('deviceSlice>setNavBarVisibility, payload ->', payload)
      state.isNavBarOpened = payload
      // console.log('deviceSlice>setNavBarVisibility, state.isNavBarOpened ->', state.isNavBarOpened)
    },
    setEditable: (state, { payload }) => { // tested
      // console.log('deviceSlice:\n setEditable\n  payload ->', payload)
      state.editable = payload
    }
  }
})

export const {
  setTestState, setDeviceSize,
  // openModal, closeModal,
  setNavBarVisibility,
  setMessage, setEditable
} = deviceSlice.actions
export const deviceSelector = state => state.device

export default deviceSlice.reducer
