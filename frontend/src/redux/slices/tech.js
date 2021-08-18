import { createSlice } from '@reduxjs/toolkit'
import { TECH_TOKEN } from '../constants/localStorageVariables'

import { setAxiosTechToken } from '../../api/apiClient'

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
    },
    initLoadingSuccess: state => {
      state.loading = false
      state.loaded = true
    },
    startTechIn: state => { // tested
      state.techLoaded = false
    },
    techInSuccess: (state, { payload }) => { // tested
      // console.log('tech slicer, techInSuccess, payload ->', payload)
      setAxiosTechToken(payload)
      localStorage.setItem(TECH_TOKEN, payload)
      state.techLoaded = true
      state.techToken = payload
    },
    techInFail: state => { // tested
      localStorage.removeItem(TECH_TOKEN)
      state.techLoaded = false
      state.techToken = null
      state.loading = false
    },
    startLngs: state => { // tested
      state.lngsLoaded = false
    },
    lngsSuccess: state => { // tested
      state.lngsLoaded = true
    },
    lngsFail: state => { // tested
      state.lngsLoaded = false
      state.loading = false
    },
    startI18n: state => { // somthing went wrong
      // console.log('techSlice, startI18n, state before ->', state)
      state.i18nLoaded = false
      state.loading = true
    },
    i18nInitiated: state => { // tested
      state.i18nInitiated = true
    },
    i18nSuccess: state => { // tested
      state.i18nLoaded = true
    },
    i18nFail: state => { // tested
      state.i18nLoaded = false
      state.loading = false
    }
  }
})

export const {
  setTestState,
  startInitLoading,
  initLoadingSuccess,
  startTechIn,
  techInSuccess,
  techInFail,
  startLngs,
  lngsSuccess,
  lngsFail,
  startI18n,
  i18nInitiated,
  i18nSuccess,
  i18nFail
} = techSlice.actions
export const techSelector = state => state.tech
export default techSlice.reducer
