import { createSlice } from '@reduxjs/toolkit'

import { TECH_TOKEN } from '../constants/localStorageVariables'
import { setAxiosTechToken } from '../../api/apiClient'
// import { startInitWorker } from '../saga/tech'

/**
 * loading: bool - any loading in progress
 * loaded: bool - any loading has been finifshed successfully
 * techLoaded: bool - teck token has been recieved successfully
 * lngsLoaded: bool -
 * i18nInitiated: bool
 * i18nLoaded: bool
 *
 * stored in localStorage:
 * techToken: str
 */
// console.log('slices>tech')

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
    setTestTechState: (state, { payload }) => {
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
      // console.log('tech slicer, startTechIn')
      state.loading = true
      state.loaded = false
      state.techLoaded = false
    },
    techInSuccess: (state, { payload }) => { // tested
      // console.log('tech slicer, techInSuccess, payload ->', payload)
      setAxiosTechToken(payload)
      localStorage.setItem(TECH_TOKEN, payload)
      state.loading = false
      state.loaded = true
      state.techLoaded = true
      state.techToken = payload
    },
    techInFail: state => { // tested
      localStorage.removeItem(TECH_TOKEN)
      state.loaded = false
      state.techLoaded = false
      state.techToken = null
      state.loading = false
    },
    startLngs: state => { // tested
      state.loaded = false
      state.loading = true
      state.lngsLoaded = false
      // console.log('techSlice, startLngs, state.loaded after ->', state.loaded)
    },
    lngsSuccess: state => { // tested
      state.loaded = true
      state.loading = false
      state.lngsLoaded = true
    },
    lngsFail: state => { // tested
      state.loading = false
      state.loaded = false
      state.lngsLoaded = false
    },
    startI18n: state => { // somthing went wrong
      state.loading = true
      state.loaded = false
      state.i18nLoaded = false
      // console.log('techSlice, startI18n, state.loading after ->', state.loading)
    },
    i18nInitiated: state => { // tested
      state.i18nInitiated = true
    },
    i18nSuccess: state => { // tested
      // console.log('techSlice, i18nSuccess, state.loading ->', state.loading)
      state.loading = false
      state.loaded = true
      state.i18nLoaded = true
    },
    i18nFail: state => { // tested
      state.loading = false
      state.loaded = false
      state.i18nLoaded = false
    }

  }
})

export const {
  setTestTechState,
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