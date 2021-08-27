import store from '../store'
import { startAlert, removeAlert, initialState, clearAlerts } from './alerts'
describe('alertsSlice testing', () => {
  const mockAlertInfo = {
    message: 'mockMessage',
    alertType: 'info',
    timeout: 3000,
    id: 'mockId'
  }
  let state
  beforeEach(() => {
    state = store.getState().alerts
    expect(state).toEqual(initialState)
  })

  test('startAlert, removeAlert', () => {
    store.dispatch(startAlert(mockAlertInfo))
    state = store.getState().alerts
    expect(state).toEqual({ alerts: [mockAlertInfo] })
    store.dispatch(removeAlert(mockAlertInfo.id))
    state = store.getState().alerts
    expect(state).toEqual(initialState)
    // console.log('state testing, state ->', state);
  })

  test('startAlert, clearAlerts', () => {
    store.dispatch(startAlert(mockAlertInfo))
    state = store.getState().alerts
    expect(state).toEqual({ alerts: [mockAlertInfo] })
    store.dispatch(clearAlerts())
    state = store.getState().alerts
    expect(state).toEqual(initialState)
  });
})
