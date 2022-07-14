// import store from '../store'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
// import configureStore from 'redux-mock-store'

import reducer from './'
import { TECH_TOKEN } from '../constants/localStorageVariables'
import { setAxiosTechToken } from '../../api/apiClient'
import {
  initialState, setTestTechState,
  startInitLoading, initLoadingSuccess,
  startTechIn, techInSuccess, techInFail,
  startLngs, lngsSuccess, lngsFail,
  startI18n, i18nInitiated, i18nSuccess, i18nFail
} from './tech'

jest.mock('../../api/apiClient')
// jest.mock('./tech')

const sagaMiddleware = createSagaMiddleware()
const middleware = (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
// const store = configureStore({ reducer, middleware, initialState })

describe('Tech slice testing', () => {
  let store
  // let state
  beforeEach(() => {
    jest.resetAllMocks()
    store = configureStore({ reducer, middleware, initialState })

    // store.dispatch(setTestTechState(initialState))
    // state = store.getState().tech
    // expect(state).toEqual(initialState)
  })
  test('startInitLoading', () => {
    const expState = {
      ...initialState, loading: true, loaded: false
    }
    store.dispatch(setTestTechState({ loaded: true }))
    store.dispatch(startInitLoading())
    const state = store.getState().tech
    expect(state).toEqual(expState)

    // console.log('slice, tech.test',
    //   '\n  state -> ', state,
    //   '\n  expState ->', expState)
  })
  test('initLoadingSuccess', () => {
    const expState = {
      ...initialState, loading: false, loaded: true
    }
    store.dispatch(setTestTechState({
      loading: true
    }))
    store.dispatch(initLoadingSuccess())
    const state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('startTechIn', () => {
    const expState = {
      ...initialState,
      loading: true,
      loaded: false,
      techLoaded: false
    }
    store.dispatch(setTestTechState({
      loading: false,
      loaded: true,
      techLoaded: true
    }))
    store.dispatch(startTechIn())
    const state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('techInSuccess', () => {
    const mockPayload = 'mockPayload'
    const expState = {
      ...initialState,
      loading: false,
      loaded: true,
      techLoaded: true,
      techToken: mockPayload
    }
    store.dispatch(setTestTechState({
      loading: true,
      loaded: false,
      techLoaded: false,
      techToken: null
    }))
    store.dispatch(techInSuccess(mockPayload))
    expect(setAxiosTechToken).toHaveBeenCalledTimes(1)
    expect(setAxiosTechToken).toHaveBeenCalledWith(mockPayload)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith(TECH_TOKEN, mockPayload)
    const state = store.getState().tech
    expect(state).toEqual(expState)
    // console.log('tech slice testing, expState ->', expState);
  })
  test('techInFail reducer', () => {
    const mockPayload = 'mockPayload'
    const expState = { ...initialState }
    store.dispatch(
      setTestTechState({
        loaded: true,
        techLoaded: true,
        techToken: mockPayload,
        loading: true
      })
    )
    store.dispatch(techInFail())
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
    expect(localStorage.removeItem).toHaveBeenCalledWith(TECH_TOKEN)
    const state = store.getState().tech
    expect(state).toEqual(expState)
    // console.log('tech slice testing, state ->', state);
    // console.log('tech slice testing, expState ->', expState);
  })
  test('startLngs', () => {
    const expState = {
      ...initialState,
      loaded: false, loading: true,
      lngsLoaded: false
    }
    store.dispatch(
      setTestTechState({
        loaded: true, loading: false,
        lngsLoaded: true
      })
    )
    store.dispatch(startLngs())
    const state = store.getState().tech
    expect(state).toEqual(expState)
    // console.log('tech slice testing, state ->', state);
    // console.log('tech slice testing, expState ->', expState);
  })
  test('lngsSuccess reducer', () => {
    const expState = {
      ...initialState,
      loaded: true, loading: false,
      lngsLoaded: true
    }
    store.dispatch(setTestTechState({
        loaded: false, loading: true,
        lngsLoaded: false,
    }))
    store.dispatch(lngsSuccess())
    const state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('lngsFail', () => {
    const expState = { ...initialState }
    store.dispatch(setTestTechState({
      loading: true,
      loaded: true,
      lngsLoaded: true
    }))
    store.dispatch(lngsFail())
    const state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('startI18n', () => {
    const expState = {
      ...initialState,
      loading: true,
      loaded: false,
      i18nLoaded: false
    }
    store.dispatch(setTestTechState({
      loading: false,
      loaded: true,
      i18nLoaded: true
    }))
    store.dispatch(startI18n())
    const state = store.getState().tech
    expect(state).toEqual(expState)
    // console.log('tech slice testing, state.loading ->', state.loading)
  })
  test('i18nInitiated', () => {
    const expState = { ...initialState, i18nInitiated: true }
    store.dispatch(setTestTechState({
      i18nInitiated: false
    }))
    store.dispatch(i18nInitiated())
    const state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('i18nSuccess', () => {
    const expState = {
      ...initialState,
      loading: false,
      loaded: true,
      i18nLoaded: true
    }
    store.dispatch(
      setTestTechState({
        loading: true,
        loaded: false,
        i18nLoaded: false,
      })
    );
    store.dispatch(i18nSuccess())
    const state = store.getState().tech
    expect(state).toEqual(expState)
  })
  test('i18nFail', () => {
    const expState = {
      ...initialState,
      loading: false,
      loaded: false,
      i18nLoaded: false
    }
    store.dispatch(setTestTechState({
      loading: true,
      loaded: true,
      i18nLoaded: true
    }))
    store.dispatch(i18nFail())
    const state = store.getState().tech
    expect(state).toEqual(expState)
  })
})