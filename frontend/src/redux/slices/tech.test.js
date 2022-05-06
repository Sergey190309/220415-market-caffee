import store from '../store'
import {TECH_TOKEN} from '../constants/localStorageVariables'
import { setAxiosTechToken } from '../../api/apiClient'
import {
  initialState, setTestState,
  startInitLoading, initLoadingSuccess,
  startTechIn, techInSuccess,
  techInFail,
  startLngs, lngsSuccess, lngsFail,
  startI18n, i18nInitiated, i18nSuccess, i18nFail
} from './tech'

jest.mock('../../api/apiClient')

describe('Tech slice testing', () => {
  let state
  beforeEach(() => {
    jest.resetAllMocks()
    store.dispatch(setTestState(initialState))
    state = store.getState().tech
    expect(state).toEqual(initialState)
  })
  test('startInitLoading', () => {
    const expState = { ...initialState, loading: true, loaded: false }
    store.dispatch(startInitLoading())
    state = store.getState().tech
    expect(state).toEqual(expState)
    // console.log('slice, tech.test',
    //   '\n  state -> ', state,
    //   '\n  expState ->', expState)
  })
  test('initLoadingSuccess', () => {
    const expState = { ...initialState, loading: false, loaded: true }
    store.dispatch(initLoadingSuccess())
    state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('startTechIn', () => {
    const expState = { ...initialState, techLoaded: false }
    store.dispatch(setTestState({ techLoaded: true }))
    store.dispatch(startTechIn())
    state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('techInSuccess', () => {
    const mockPayload = 'mockPayload'
    const expState = { ...initialState, techLoaded: true, techToken: mockPayload }
    store.dispatch(setTestState({ techLoaded: false }))
    // console.log('tech slice testing, mockPayload ->', mockPayload)
    store.dispatch(techInSuccess(mockPayload))
    expect(setAxiosTechToken).toHaveBeenCalledTimes(1)
    expect(setAxiosTechToken).toHaveBeenCalledWith(mockPayload)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith(TECH_TOKEN, mockPayload)
    state = store.getState().tech
    expect(state).toEqual(expState)
    // console.log('tech slice testing, expState ->', expState);
  })
  test('techInFail reducer', () => {
    const mockPayload = 'mockPayload'
    const expState = { ...initialState }
    store.dispatch(
      setTestState({
        techLoaded: true,
        techToken: mockPayload,
        loading: true
      })
    )
    store.dispatch(techInFail())
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
    expect(localStorage.removeItem).toHaveBeenCalledWith(TECH_TOKEN)
    state = store.getState().tech
    expect(state).toEqual(expState)
    // console.log('tech slice testing, state ->', state);
    // console.log('tech slice testing, expState ->', expState);
  })
  test('startLngs', () => {
    const expState = { ...initialState }
    store.dispatch(
      setTestState({
        lngsLoaded: true
      })
    )
    store.dispatch(startLngs())
    state = store.getState().tech
    expect(state).toEqual(expState)
    // console.log('tech slice testing, state ->', state);
    // console.log('tech slice testing, expState ->', expState);
  })
  test('lngsSuccess reducer', () => {
    const expState = { ...initialState, lngsLoaded: true }
    // store.dispatch(
    //   setTestState({
    //     lngsLoaded: true,
    //   })
    // );
    store.dispatch(lngsSuccess())
    state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('lngsFail', () => {
    const expState = { ...initialState }
    store.dispatch(
      setTestState({
        lngsLoaded: true,
        loading: true
      })
    )
    store.dispatch(lngsFail())
    state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('startI18n', () => {
    const expState = { ...initialState, loading: true }
    state = store.getState().tech
    // console.log('tech slice testing, state before before ->', state);
    store.dispatch(
      setTestState({
        i18nLoaded: true
      })
    )
    state = store.getState().tech
    // console.log('tech slice testing, state before ->', state);
    store.dispatch(startI18n())
    state = store.getState().tech
    expect(state).toEqual(expState);
    // console.log('tech slice testing, expState ->', expState);
    // console.log('tech slice testing, state ->', state);
  })
  test('i18nInitiated', () => {
    const expState = { ...initialState, i18nInitiated: true }
    state = store.getState().tech
    // store.dispatch(
    //   setTestState({
    //     i18nLoaded: true,
    //   })
    // );
    // state = store.getState().tech;
    // console.log('tech slice testing, state before ->', state);
    store.dispatch(i18nInitiated())
    state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('i18nSuccess', () => {
    const expState = { ...initialState, i18nLoaded: true }
    state = store.getState().tech
    // store.dispatch(
    //   setTestState({
    //     i18nLoaded: true,
    //   })
    // );
    // state = store.getState().tech;
    // console.log('tech slice testing, state before ->', state);
    store.dispatch(i18nSuccess())
    state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('i18nFail', () => {
    const expState = { ...initialState }
    // state = store.getState().tech;
    store.dispatch(
      setTestState({
        i18nLoaded: true,
        loading: true
      })
    )
    // state = store.getState().tech;
    // console.log('tech slice testing, state before ->', state);
    store.dispatch(i18nFail())
    state = store.getState().tech
    expect(state).toEqual(expState)
    // console.log('tech slice testing, expState ->', expState);
    // console.log('tech slice testing, state ->', state);
  })
})