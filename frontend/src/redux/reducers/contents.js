import { CONTENTS_FAIL, CONTENTS_START, CONTENT_SUCCESS } from '../actions/types';

export const initialStore = {
  loading: false,
};

const contents = (store = initialStore, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONTENTS_START:
      return {
        ...store,
        loading: true,
      };
    case CONTENT_SUCCESS:
      return {
        ...store,
        loading: false,
      };
    case CONTENTS_FAIL:
      return {
        ...store,
        loading: false,
      };
    default:
      return {
        store,
      };
  }
};

export default contents;
