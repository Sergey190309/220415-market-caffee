import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import reducer from './'
import alerts, { initialState, clearAlerts, startAlert, removeAlert } from './alerts'

const sagaMiddleware = createSagaMiddleware()
const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

describe('alertsSlice testing', () => {
  const mockAlertInfo00 = {
    message: 'mockMessage',
    alertType: 'info',
    timeout: 3000,
    id: 'mockId00'
  }
  const mockAlertInfo01 = {
    message: 'mockMessage',
    alertType: 'info',
    timeout: 3000,
    id: 'mockId01'
  }
  let store
  let state
  beforeEach(() => {
    jest.resetAllMocks()
    store = configureStore({ reducer, middleware, initialState })
  })
  test('startAlert, clearAlert', () => {
    store.dispatch(startAlert(mockAlertInfo00))
    store.dispatch(startAlert(mockAlertInfo01))
    state = store.getState().alerts
    expect(state).toEqual({ alerts: [mockAlertInfo00, mockAlertInfo01] });
    store.dispatch(clearAlerts())
    state = store.getState().alerts
    expect(state).toEqual(initialState);
    // console.log('state ->', state)
  })
  test('startAlert, removeAlert', () => {
    store.dispatch(startAlert(mockAlertInfo00))
    store.dispatch(startAlert(mockAlertInfo01))
    state = store.getState().alerts
    expect(state).toEqual({ alerts: [mockAlertInfo00, mockAlertInfo01] });
    store.dispatch(removeAlert(mockAlertInfo00.id))
    state = store.getState().alerts
    expect(state).toEqual({alerts:[mockAlertInfo01]});
    // console.log('state ->', state)
  })
})