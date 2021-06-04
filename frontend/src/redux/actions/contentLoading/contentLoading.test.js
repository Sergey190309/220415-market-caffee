import { CONTENT_FAIL, CONTENT_START, CONTENT_SUCCESS } from './types';
import { contentFail, contentStart } from './contentLoading';

describe('contentLoading testing', () => {
  test('contentStart', () => {
    const expAction = {
      type: CONTENT_START,
    };
    expect(contentStart()).toEqual(expAction);
  });

  test('contentFail', () => {
    const expAction = {
      type: CONTENT_FAIL,
    };
    expect(contentFail()).toEqual(expAction);
  });
});
