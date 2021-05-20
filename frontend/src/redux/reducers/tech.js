import {
  START_INIT_LOADING,
  FINISH_INIT_LOADING,
  TECH_IN_SUCCESS,
  TECH_IN_FAIL,
  LNGS_SUCCESS,
  LNGS_FAIL,
  I18N_SUCCESS,
  I18N_FAIL,
  START_TECH_IN,
  START_LNGS,
} from '../actions/types';
import { axiosCommonToken } from '../../api/apiClient';

// ----------------------> DO NOT REMOVE
// loading: bool
// techLoaded: bool
// lngsLoaded: bool
// i18nLoaded: bool
// stored in localStorage:
// techToken: str

export const initialStore = {
  loading: false,
  techLoaded: false,
  lngsLoaded: false,
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
    case FINISH_INIT_LOADING:
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
      console.log('tech in fail, error ->', payload);
      return {
        ...store,
        techLoaded: false,
        techToken: null,
      };
    case START_LNGS:
      return {
        ...store,
        lngsLoaded: false,
      };
    case LNGS_SUCCESS:
      // fire action to initiate  i18n

      return {
        ...store,
        lngsLoaded: true,
      };
    case LNGS_FAIL:
      return {
        ...store,
        lngsLoaded: false,
      };
    case I18N_SUCCESS:
      return {
        ...store,
        i18nLoaded: true,
        loading: false,
      };
    case I18N_FAIL:
      return {
        ...store,
        i18nLoaded: false,
      };
    default:
      return store;
  }
};

export default tech;
