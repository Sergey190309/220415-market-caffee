import {
  START_INIT_LOADING,
  INIT_LOADING_SUCCESS,
  TECH_IN_SUCCESS,
  TECH_IN_FAIL,
  LNGS_SUCCESS,
  LNGS_FAIL,
  I18N_SUCCESS,
  I18N_FAIL,
  START_TECH_IN,
  START_LNGS,
  START_I18N,
  I18N_INITIATED,
} from '../constants/types';
import { axiosCommonToken } from '../../api/apiClient';
// import { axiosCommonToken } from '../../api/apiClient';

// ----------------------> DO NOT REMOVE
// loading: bool
// techLoaded: bool
// lngsLoaded: bool
// i18nInitiated: bool
// i18nLoaded: bool
// stored in localStorage:
// techToken: str

export const initialStore = {
  loading: false,
  techLoaded: false,
  lngsLoaded: false,
  i18nInitiated: false,
  i18nLoaded: false,

  techToken: null,
};

const tech = (store = initialStore, action, setToken = axiosCommonToken) => {
  const { type, payload } = action;
  switch (type) {
    case START_INIT_LOADING:
      return {
        ...store,
        loading: true,
      };
    case INIT_LOADING_SUCCESS:
      return {
        ...store,
        loading: false,
        // loaded: true,
      };
    case START_TECH_IN:
      return {
        ...store,
        techLoaded: false,
      };
    case TECH_IN_SUCCESS:
      setToken(payload);
      localStorage.setItem('techToken', payload);
      // fire action to load language list
      return {
        ...store,
        techLoaded: true,
        techToken: payload,
      };
    case TECH_IN_FAIL:
      localStorage.removeItem('techToken');
      // console.log('tech in fail, error ->', payload);
      return {
        ...store,
        techLoaded: false,
        techToken: null,
        loading: false,
      };
    case START_LNGS:
      return {
        ...store,
        lngsLoaded: false,
      };
    case LNGS_SUCCESS:
      return {
        ...store,
        lngsLoaded: true,
      };
    case LNGS_FAIL:
      return {
        ...store,
        lngsLoaded: false,
        loading: false,
      };
    case START_I18N:
      return {
        ...store,
        i18nLoaded: false,
        loading: true,
      };
    case I18N_INITIATED:
      return {
        ...store,
        i18nInitiated: true,
      };
    case I18N_SUCCESS:
      return {
        ...store,
        i18nLoaded: true,
      };
    case I18N_FAIL:
      return {
        ...store,
        i18nLoaded: false,
        loading: false,
      };
    default:
      return store;
  }
};

export default tech;
