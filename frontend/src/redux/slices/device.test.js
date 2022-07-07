import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import reducer, {
  setDeviceSize,
  // openModal, closeModal,
  setMessage, setNavBarVisibility, setEditable
} from './'

import { initialState, setTestState } from './device'

const sagaMiddleware = createSagaMiddleware()
const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

describe('Device slises', () => {
  let store
  beforeEach(() => {
    jest.resetAllMocks()
    store = configureStore({ reducer, middleware, initialState })
  })
  test('setDeviceSize', () => {
    let expState = { ...initialState, deviceSize: 'medium' }
    store.dispatch(setDeviceSize(1000))
    let state = store.getState().device
    expect(state).toEqual(expState)

    expState = { ...initialState, deviceSize: 'big' }
    store.dispatch(setDeviceSize(1800))
    state = store.getState().device
    expect(state).toEqual(expState)

    expState = { ...initialState, deviceSize: 'small' }
    store.dispatch(setDeviceSize(700))
    state = store.getState().device
    expect(state).toEqual(expState)
  })
  // test('openModal, closeModal', () => {
  //   let expState = {
  //     ...initialState, kindOfModal: 'mockKindOfModal'
  //   }
  //   store.dispatch(openModal('mockKindOfModal'))
  //   let state = store.getState().device
  //   expect(state).toEqual(expState)

  //   expState = { ...initialState }
  //   store.dispatch(closeModal())
  //   state = store.getState().device
  //   expect(state).toEqual(expState)
  // })
  test('setMessage', () => {
    let expState = {
      ...initialState, message: 'mockMessage'
    }
    store.dispatch(setMessage('mockMessage'))
    let state = store.getState().device
    expect(state).toEqual(expState)

    expState = { ...initialState }
    store.dispatch(setMessage(''))
    state = store.getState().device
    expect(state).toEqual(expState)
  })
  test('setNavBarVisibility', () => {
    let expState = {
      ...initialState, isNavBarOpened: true
    }
    store.dispatch(setNavBarVisibility(true))
    let state = store.getState().device
    expect(state).toEqual(expState)

    expState = { ...initialState, isNavBarOpened: false }
    store.dispatch(setNavBarVisibility(false))
    state = store.getState().device
    expect(state).toEqual(expState)
  })
  test('setEditable', () => {
    let expState = {
      ...initialState, editable: true
    }
    store.dispatch(setEditable(true))
    let state = store.getState().device
    expect(state).toEqual(expState)

    expState = { ...initialState, editable: false }
    store.dispatch(setEditable(false))
    state = store.getState().device
    expect(state).toEqual(expState)
  })
})