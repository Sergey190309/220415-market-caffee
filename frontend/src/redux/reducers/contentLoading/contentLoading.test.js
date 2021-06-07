import pick from 'lodash/pick'
import { CONTENT_START, CONTENT_SUCCESS } from '../../actions/contentLoading/types';
import content, { initialStore } from './contentLoading';
import { mockResolveData } from '../../../api/calls/getViewContent.test';

describe('contentLoading reducer testing', () => {
  test('Content start', () => {
    const testAction = {
      type: CONTENT_START,
    };
    const actStore = { ...initialStore };
    const expStore = { ...actStore, loading: true };

    expect(actStore).not.toEqual(expStore);
    expect(content(actStore, testAction)).toEqual(expStore);
  });

  test('content success testing', () => {
    const payload = pick(mockResolveData.payload, 'title', 'content')
    const testAction = {
      type: CONTENT_SUCCESS,
      payload: payload,
    };
    const actStore = { ...initialStore };

    console.log('content success testing, payload ->', payload);
    // console.log('content success testing, actStore ->', actStore)
    // expect(actStore).not.toEqual(expStore);
    // expect(structure(actStore, testAction)).toEqual(expStore);
  });
});
