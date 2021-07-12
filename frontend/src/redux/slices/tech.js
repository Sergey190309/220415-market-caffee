import { createSlice } from '@reduxjs/toolkit';
import { TECH_TOKEN } from '../constants/localStorageVariables';

import { axiosCommonToken } from '../../api/apiClient';

/**
 * loading: bool
 * techLoaded: bool
 * lngsLoaded: bool
 * i18nInitiated: bool
 * i18nLoaded: bool
 * stored in localStorage:
 * techToken: str
 */

export const initialState = {
  loading: false,
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
    startInitLoading: state => {
      console.log('teckSlice, startInitLoading');
      state = {
        ...state,
        loading: true,
      };
    },
    initLoadingSuccess: state => {
      state = {
        ...state,
        loading: false,
      };
    },
    startTechIn: state => {
      state = {
        ...state,
        techLoaded: false,
      };
    },
    techInSuccess: (state, { payload }) => {
      axiosCommonToken(payload);
      localStorage.setItem(TECH_TOKEN, payload);
      state = {
        ...state,
        techLoaded: true,
        techToken: payload,
      };
    },
    techInFail: state => {
      localStorage.removeItem(TECH_TOKEN);
      state = {
        ...state,
        techLoaded: false,
        techToken: null,
        loading: false,
      };
    },
    startLngs: state => {
      state = {
        ...state,
        lngsLoaded: false,
      };
    },
    lngsSuccess: state => {
      state = {
        ...state,
        lngsLoaded: true,
      };
    },
    lngsFail: state => {
      state = {
        ...state,
        lngsLoaded: false,
        loading: false,
      };
    },
    startI18n: state => {
      state = {
        ...state,
        i18nLoaded: false,
        loading: true,
      };
    },
    i18nInitiated: state => {
      state = {
        ...state,
        i18nInitiated: true,
      };
    },
    i18nSuccess: state => {
      state = {
        ...state,
        i18nLoaded: true,
      };
    },
    i18nFail: state => {
      state = {
        ...state,
        i18nLoaded: false,
        loading: false,
      };
    },
  },
});

export const {
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
