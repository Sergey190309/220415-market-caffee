import { STRUCTURE_FAIL, STRUCTURE_START, STRUCTURE_SUCCESS } from './types';

export const structureStart = () => {
  return {
    type: STRUCTURE_START,
  };
};

export const structureSuccess = viewStructures => {
  console.log('structureSuccess, action, viewStructures ->', viewStructures);
  return {
    type: STRUCTURE_SUCCESS,
    payload: viewStructures,
  };
};

export const structureFail = () => {
  return {
    type: STRUCTURE_FAIL,
  };
};
