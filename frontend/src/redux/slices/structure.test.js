import store from '../store';
import {
  initialState,
  structureStart,
  structureSuccess,
  structureFail,
} from './structure';

import { structures } from '../../testConstants';

describe('structure testing', () => {
  test('state testing', () => {
    let state = store.getState().structure;
    expect(state).toEqual(initialState);

    store.dispatch(structureStart());
    state = store.getState().structure;
    expect(state).toEqual({ ...initialState, loading: true });

    store.dispatch(structureSuccess({ payload: structures }));
    state = store.getState().structure;
    console.log('state testing, state ->', state);
    console.log('state testing, structures ->', structures);
  });
});
