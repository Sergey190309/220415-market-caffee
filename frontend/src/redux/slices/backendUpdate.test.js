import store from '../store'
import { backendUpdateFail, backendUpdateStart, backendUpdateSuccess, initialState, setTestState } from './backendUpdate'
// import { putTextContent } from '../../api/calls/content'

jest.mock('../../api/calls/content')
describe('backendUpdate slice testing', () => {
  const mockPayload = {
    identity: 'mockIdentity',
    view_id: 'mockViewId',
    content: {
      title: 'mockTitnle',
      content: ['mockContent']
    }
  }
  let state
  beforeEach(() => {
    jest.resetAllMocks()
    store.dispatch(setTestState(initialState))
    state = store.getState().backendUpdate
    expect(state).toEqual(initialState)
  })

  test('backendUpdateStart testing', () => {
    store.dispatch(backendUpdateStart(mockPayload))
    state = store.getState().backendUpdate
    const expState = {
      ...mockPayload,
      loading: true
    }
    expect(state).toEqual(expState)
  })

  test('backendUpdateSuccess testing', () => {
    store.dispatch(setTestState({ ...mockPayload, loading: true }))
    store.dispatch(backendUpdateSuccess())
    state = store.getState().backendUpdate
    const expState = { ...initialState }
    expect(state).toEqual(expState)
  })

  test('backendUpdateFail testing', () => {
    store.dispatch(setTestState({ ...mockPayload, loading: true }))
    store.dispatch(backendUpdateFail())
    state = store.getState().backendUpdate
    const expState = {
      ...mockPayload,
      loading: false
    }
    expect(state).toEqual(expState)
    // console.log('slices, backendUpdate.test, state ->', state)
  })
})
