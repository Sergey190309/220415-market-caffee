import { createSlice } from '@reduxjs/toolkit';
// import alerts from '../reducers/alert'

export const initialState = {
  alerts: []
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    startAlert: (state, { payload }) => {
      // console.log('alertsSlicer, startAlert, payload ->', payload);
      state.alerts.push(payload);
    },
    removeAlert: (state, { payload }) => {
      // console.log('alertsSlicer, removeAlert, payload ->', payload);
      state.alerts.forEach((alert, index) => {
        if (alert.id === payload) {
          state.alerts.splice(index, 1);
        }
      });
    },
  },
});

export const { startAlert, removeAlert } = alertsSlice.actions;
export const alertsSelector = state => state.alerts;
export default alertsSlice.reducer;
