import { STRUCTURE_FAIL, STRUCTURE_START, STRUCTURE_SUCCESS } from '../actions/types';

export const initialStore = {
  loading: null,
};

const structure = (store = initialStore, action) => {
  // console.log(action)
  const { type, payload } = action;
  switch (type) {
    case STRUCTURE_START:
      return {
        ...store,
        loading: true,
      };
    case STRUCTURE_SUCCESS:
      return {
        ...store,
        loading: false,
      };
    case STRUCTURE_FAIL:
      return {
        ...store,
        loading: false,
      };
    default:
      return store;
  }
};

export default structure;
