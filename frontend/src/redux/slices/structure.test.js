import store from '../store';
import {
  initialState,
  structureStart,
  structureSuccess,
  structureFail,
} from './structure';

import { structuresArr } from '../../testConstants';

describe('structure testing', () => {
  test('state testing', () => {
    let state = store.getState().structure;
    expect(state).toEqual(initialState);

    store.dispatch(structureStart());
    state = store.getState().structure;
    expect(state).toEqual({ ...initialState, loading: true });

    store.dispatch(structureSuccess(structuresArr));
    state = store.getState().structure;
    let expState = { loading: false, loaded: true };
    structuresArr.forEach(structure => Object.assign(expState, structure));
    expect(state).toEqual(expState);

    store.dispatch(structureFail());
    state = store.getState().structure;
    expect(state).toEqual(initialState);

    // console.log('state testing, state ->', state);

  });
});
