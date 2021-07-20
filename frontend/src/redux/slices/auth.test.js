import store from '../store'
import { initialState, signUpStart,  } from './auth'

describe('Auth slicer testing', () => {
  test('state testing', () => {
    let state = store.getState().auth
    let expState = {...initialState}
    expect(state).toEqual(expState);

    // store.dispatch(signUpStart())
    // console.log('authSlice testing, state ->', state)

  });
});