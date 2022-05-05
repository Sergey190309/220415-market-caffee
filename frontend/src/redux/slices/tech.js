import { createSlice } from '@reduxjs/toolkit'

/**
 * loading: bool
 * loaded: bool
 * techLoaded: bool
 * lngsLoaded: bool
 * i18nInitiated: bool
 * i18nLoaded: bool
 *
 * stored in localStorage:
 * techToken: str
 */

export const initialState = {
  loading: false,
  loaded: false,
  techLoaded: false,
  lngsLoaded: false,
  i18nInitiated: false,
  i18nLoaded: false,
  techToken: null
}

const techSlice = createSlice({
  name: 'tech',
  initialState,
  reducers: {
    setTestState: (state, { payload }) => {
      /**
       * That's for testing only.
       * It rewrites all state.
       */
      Object.assign(state, payload)
    },
    startInitLoading: state => { // tested
      // console.log('techSlice, startInitLoading');
      state.loading = true
      state.loaded = false
    }
  }
})

export const {
  setTestState,
  startInitLoading
} = techSlice.actions

export const techSelector = state => state.tech

export default techSlice.reducer