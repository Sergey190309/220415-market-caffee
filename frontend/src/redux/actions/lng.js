import { LNG_SWITCH } from '../constants/types';

export const setLngAction = lng =>{
  return {
    type: LNG_SWITCH,
    payload: lng
  }
}