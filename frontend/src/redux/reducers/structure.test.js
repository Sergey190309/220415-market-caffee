import structure from './structure';
import { STRUCTURE_FAIL, STRUCTURE_START, STRUCTURE_SUCCESS } from '../actions/types';

import { mockResolveData } from '../../api/calls/getViewsStructure.test';
import { initialStore } from './structure';

describe('structure reducers testing', () => {
  test('Structure start testing', () => {
    const testAction = {
      type: STRUCTURE_START,
    };
    const actStore = { ...initialStore };
    const expStore = { ...actStore, loading: true, loaded: false };

    expect(actStore).not.toEqual(expStore);
    expect(structure(actStore, testAction)).toEqual(expStore);
  });

  test('structure success testing', () => {
    const testAction = {
      type: STRUCTURE_SUCCESS,
      payload: mockResolveData.payload.map(sturcture => {
        return { [sturcture['view_id']]: sturcture['attributes'] };
      }),
    };
    const actStore = { ...initialStore };
    let structures = {};
    testAction.payload.map(structure => {
      structures = { ...structures, ...structure };
      return structure; // Just to avoid error
    });
    const expStore = { ...actStore, loading: false, loaded: true, ...structures };

    expect(actStore).not.toEqual(expStore);
    expect(structure(actStore, testAction)).toEqual(expStore);
  });

  test('Structure fail testing', () => {
    const testAction = {
      type: STRUCTURE_FAIL,
    };
    const actStore = { ...initialStore, loading: true };
    const expStore = { ...actStore, loading: false, loaded: false };

    expect(actStore).not.toEqual(expStore);
    expect(structure(actStore, testAction)).toEqual(expStore);
  });

});
