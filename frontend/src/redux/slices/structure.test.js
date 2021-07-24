import store from '../store';
import {
  initialState,
  structureStart,
  structureSuccess,
  structureFail,
  setState,
} from './structure';

import { structuresArr, structuresObj } from '../../testConstants';

describe('structure state testing', () => {
  let state = store.getState().structure;
  beforeEach(() => {
    jest.resetAllMocks();
    state = store.getState().structure;
    expect(state).toEqual(initialState);
  });
  afterEach(() => {
    store.dispatch(setState({ ...initialState }));
  });
  test('structureStart', () => {
    store.dispatch(structureStart());
    state = store.getState().structure;
    expect(state).toEqual({ ...initialState, loading: true });
  });
  test('structureSuccess', () => {
    store.dispatch(structureSuccess(structuresArr));
    state = store.getState().structure;
    let expState = { loading: false, loaded: true };
    structuresArr.forEach(structure => Object.assign(expState, structure));
    expect(state).toEqual(expState);
  });
  test('structureFail', () => {
    store.dispatch(structureFail());
    state = store.getState().structure;
    // expect(state).toEqual(initialState);
    console.log('state testing, state ->', state);
  });
});
