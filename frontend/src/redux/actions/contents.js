import { CONTENTS_START } from './types';

export const contentsStart = viewName => {
  return {
    type: CONTENTS_START,
    payload: viewName
  };
};
