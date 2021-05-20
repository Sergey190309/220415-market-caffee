import {
  START_LOADING,
  FINISH_LOADING,
  TECH_IN_SUCCESS,
  TECH_IN_FAIL,
  LNGS_IN_SUCCESS,
  LNGS_IN_FAIL,
  I18N_SUCCESS,
  I18N_FAIL,
} from '../actions/types';
import { axiosCommonToken } from '../../api/apiClient';

// ----------------------> DO NOT REMOVE
// loading: bool
// tech_loaded: bool
// lngs_loaded: bool
// i18n_loaded: bool
// stored in localStorage:
// tech_token: str

export const initialStore = {
  loading: false,
  tech_loaded: false,
  lngs_loaded: false,
  i18n_loaded: false,

  tech_token: null,
};

const tech = (store = initialStore, action, setToken = axiosCommonToken) => {
  const { type, payload } = action;
  switch (type) {
    case START_LOADING:
      return {
        ...store,
        loading: true,
      };
    case FINISH_LOADING:
      return {
        ...store,
        loading: false,
        // loaded: true,
      };
    case TECH_IN_SUCCESS:
      setToken(payload);
      localStorage.setItem('tech_token', payload);
      // fire action to load language list
      return {
        ...store,
        tech_loaded: true,
        tech_token: payload,
      };
    case TECH_IN_FAIL:
      localStorage.removeItem('tech_token');
      return {
        ...store,
        tech_loaded: false,
        tech_token: null,
      };
    case LNGS_IN_SUCCESS:
      // fire action to initiate  i18n

      return {
        ...store,
        lngs_loaded: true,
      };
    case LNGS_IN_FAIL:
      return {
        ...store,
        lngs_loaded: false,
      };
    case I18N_SUCCESS:
      return {
        ...store,
        i18n_loaded: true,
        loading: false,
      };
    case I18N_FAIL:
      return {
        ...store,
        i18n_loaded: false,
      };
    default:
      return store;
  }
};

export default tech;
