import { createSlice } from '@reduxjs/toolkit';
import { TECH_TOKEN } from '../constants/localStorageVariables';

import { axiosCommonToken } from '../../api/apiClient';

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
  techToken: null,
};

const techSlice = createSlice({
  name: 'tech',
  initialState,
  reducers: {
    setTestState: (state, { payload }) => {
      // state = {...state, ...payload}
      Object.assign(state, payload)
    },
    startInitLoading: state => {
      // console.log('techSlice, startInitLoading');
      state.loading = true;
      state.loaded = false;
    },
    initLoadingSuccess: state => {
      state.loading = false;
      state.loaded = true;
    },
    startTechIn: state => {
      state.techLoaded = false;
    },
    techInSuccess: (state, { payload }) => {
      // console.log('tech slicer, techInSuccess, payload ->', payload);
      axiosCommonToken(payload);
      localStorage.setItem(TECH_TOKEN, payload);
      state.techLoaded = true
      state.techToken= payload
    },
    techInFail: state => {
      localStorage.removeItem(TECH_TOKEN);
      state.techLoaded = false
      state.techToken = null
      state.loading = false
    },
    startLngs: state => {
      state.lngsLoaded = false
    },
    lngsSuccess: state => {
      state.lngsLoaded = true
    },
    lngsFail: state => {
      state.lngsLoaded = false
      state.loading = false
    },
    startI18n: state => {
      state.i18nLoaded = false
      state.loading = true
    },
    i18nInitiated: state => {
      state.i18nInitiated = true
    },
    i18nSuccess: state => {
      state.i18nLoaded =true
    },
    i18nFail: state => {
      state.i18nLoaded = false
      state.loading = false
    },
  },
});

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
  i18nFail,
} = techSlice.actions;
export const techSelector = state => state.tech;
export default techSlice.reducer;
