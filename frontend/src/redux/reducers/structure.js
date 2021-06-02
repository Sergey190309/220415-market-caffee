import { STRUCTURE_FAIL, STRUCTURE_START, STRUCTURE_SUCCESS } from '../actions/types';

export const initialStore = {
  loading: null,
  loaded: null,
};

const structure = (store = initialStore, action) => {
  // console.log(action)
  const { type, payload } = action;
  switch (type) {
    case STRUCTURE_START:
      return {
        ...store,
        loading: true,
        loaded: false,
      };
    case STRUCTURE_SUCCESS:
      console.log('STRUCTURE_SUCCESS reducer, payload ->', payload)
      // const info = {k: v for }
      return {
        ...store,
        // ...payload,
        loading: false,
        loaded: true,
      };
    case STRUCTURE_FAIL:
      return {
        ...store,
        loading: false,
        loaded: false,
      };
    default:
      return store;
  }
};

export default structure;
