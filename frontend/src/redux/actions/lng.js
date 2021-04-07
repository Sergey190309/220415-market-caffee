import { LNG_SWITCH } from './types';

export const setLngAction = lng =>{
  return {
    type: LNG_SWITCH,
    payload: lng
  }
}