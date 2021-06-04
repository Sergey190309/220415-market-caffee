import { CONTENT_FAIL, CONTENT_START, CONTENT_SUCCESS } from '../../actions/contentLoading/types';

export const initialStore = {
  loading: false,
  loaded: false,
};

const content = (store = initialStore, action) => {
  const { type, payload } = action
  switch (type) {
    case CONTENT_START:
      return {
        ...store,
        loading: true
      }
    case CONTENT_SUCCESS:
      return {
        ...store,
        loading: false,
        loaded: true
      }
    case CONTENT_FAIL:
      return {
        ...store,
        loading: false
      }
    default:
      return store;
  }
};

export default content;
