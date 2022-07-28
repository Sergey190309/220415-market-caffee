import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  /**
   * state structure:
   * alerts: [
   *   {
   *     message: 'mockMessage',
   *     alertType: 'info',
   *     timeout: 3000,
   *     id: 'mockId'
   *   }
   * ]
   * alerts.type are error | warning | info | success
   */
  alerts: []
  // alerts: [{
  //   message: 'mockMessage',
  //   alertType: 'error',
  //   timeout: 3000,
  //   id: 'mockId'
  // }]
}

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    clearAlerts: state => {
      state.alerts = []
    },
    startAlert: (state, { payload }) => {
      // console.log('alertsSlice, startAlert, payload ->', payload)
      state.alerts.push(payload)
    },
    removeAlert: (state, { payload }) => {
      // console.log('alertsSlicer, removeAlert, payload ->', payload);
      state.alerts.forEach((alert, index) => {
        if (alert.id === payload) {
          state.alerts.splice(index, 1)
        }
      })
    }
  }
})

export const { clearAlerts, startAlert, removeAlert } = alertsSlice.actions
export const alertsSelector = state => state.alerts
export default alertsSlice.reducer
