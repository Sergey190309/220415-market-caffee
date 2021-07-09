import store from '../store'
import { startAlert, removeAlert, initialState } from './alerts'
describe('alertsSlice testing', () => {
  const mockAlertInfo = {
    message: 'mockMessage',
    alertType: 'info',
    timeout: 3000,
    id: 'mockId'
  }
  test('state testing', () => {
    let state = store.getState().alerts
    expect(state).toEqual(initialState);
    console.log('state testing, state ->', state)
    store.dispatch(startAlert(mockAlertInfo))
    state = store.getState().alerts
    expect(store).toEqual({alerts: mockAlertInfo});
    console.log('state testing, state ->', state)
  });
});