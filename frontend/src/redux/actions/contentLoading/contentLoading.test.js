import { CONTENT_FAIL, CONTENT_START, CONTENT_SUCCESS } from './types';
import { contentFail, contentStart, contentSuccess } from './contentLoading';

describe('contentLoading action testing', () => {
  test('contentStart', () => {
    const expAction = {
      type: CONTENT_START,
    };
    expect(contentStart()).toEqual(expAction);
  });

  test('contentSuccess', () => {
    const mockContentInfo = {
      something: 'something',
    };
    const expAction = {
      type: CONTENT_SUCCESS,
      payload: mockContentInfo,
    };
    expect(contentSuccess(mockContentInfo)).toEqual(expAction);
  });

  test('contentFail', () => {
    const expAction = {
      type: CONTENT_FAIL,
    };
    expect(contentFail()).toEqual(expAction);
  });
});
