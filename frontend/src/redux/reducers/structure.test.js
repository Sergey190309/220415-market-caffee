import structure from './structure'
import { STRUCTURE_START } from '../actions/types';

describe('structure reducers testing', () => {
  const testStore = {
    loading: null
  }
  test('Structure start testing', () => {
    const testAction = {
      type: STRUCTURE_START
    }
    const actStore = {...testStore}
    const expStore = { ...actStore, loading: true, loaded: false }

    expect(actStore).not.toEqual(expStore);
    expect(structure(actStore, testAction)).toEqual(expStore);
  });
});