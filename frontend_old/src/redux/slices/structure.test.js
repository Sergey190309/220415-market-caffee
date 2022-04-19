import store from '../store'

import {
  initialState,
  structureStart,
  structureSuccess,
  structureFail,
  structureResetChanged,
  setState
} from './structure'

import { structuresArr } from '../../testConstants'

describe('structure state testing', () => {
  let state = store.getState().structure
  beforeEach(() => {
    jest.resetAllMocks()
    store.dispatch(setState(initialState))
    state = store.getState().structure
    expect(state).toEqual(initialState)
  })
  test('structureStart', () => {
    store.dispatch(structureStart())
    state = store.getState().structure
    expect(state).toEqual({ ...initialState, loading: true })
  })
  test('structureSuccess', () => {
    store.dispatch(structureSuccess(structuresArr))
    state = store.getState().structure
    const expState = { loading: false, loaded: true, changed: true }
    structuresArr.forEach(structure => Object.assign(expState, structure))
    expect(state).toEqual(expState)
  })
  test('structureFail', () => {
    store.dispatch(structureSuccess(structuresArr))
    store.dispatch(structureFail())
    state = store.getState().structure
    expect(state).toEqual(initialState)
    // console.log('state testing, structureFail:\n state ->',
    // state)
  })
  test('structureResetChanged', () => {
    store.dispatch(setState({ ...initialState, changed: true }))
    store.dispatch(structureResetChanged())
    state = store.getState().structure
    expect(state.changed).toEqual(false)
    // console.log('state testing,\n state ->', state)
  })
})
