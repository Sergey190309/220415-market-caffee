import store from '../store'
import {
  backendUpdateFail,
  backendAddElementStart, backendAddElementSuccess, backendAddElementFail,
  backendRemoveElementStart, backendRemoveElementSuccess, backendRemoveElementFail,
  backendTxtUpdateStart, backendTxtUpdateSuccess, backendTxtUpdateFail,
  initialState,
  resetBackendUpdate, setTestState
} from './backendUpdate'
// import { putTextContent } from '../../api/calls/content'

jest.mock('../../api/calls/content')
describe('backendTxtUpdate slice testing', () => {
  const mockContentsPayload = {
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
  test('backendUpdateFail testing', () => {
    store.dispatch(setTestState({ ...mockContentsPayload, loading: true }))
    store.dispatch(backendUpdateFail())
    state = store.getState().backendUpdate
    const expState = {
      ...mockContentsPayload,
      index: -1,
      loading: false,
      loaded: false
    }
    expect(state).toEqual(expState)
    // console.log('slices, backendUpdate.test, state ->', state)
  })
  test('resetBackendUpdate testing', () => {
    store.dispatch(setTestState({ ...mockContentsPayload, loading: true }))
    store.dispatch(setTestState({ loaded: true }))
    store.dispatch(resetBackendUpdate())
    state = store.getState().backendUpdate
    const expState = {
      ...initialState,
      loaded: false
    }
    expect(state).toEqual(expState)
    // console.log('slices, backendUpdate.test, state ->', state)
  })
  describe('backendAddElement', () => {
    const mockElementPayload = {
      identity: 'mockIdentity',
      view_id: 'mockViewId',
      index: 12
    }
    test('backendAddElementStart testing', () => {
      const mockIndex = Math.floor(Math.random() * 10)
      const activeMockPayload = { ...mockElementPayload, content: {}, index: mockIndex }
      store.dispatch(backendAddElementStart(activeMockPayload))
      state = store.getState().backendUpdate
      const expState = {
        ...activeMockPayload,
        loading: true,
        loaded: false
      }
      expect(state).toEqual(expState)
    })
    test('backendAddElementSuccess testing', () => {
      store.dispatch(setTestState({ ...mockElementPayload, loading: true }))
      store.dispatch(backendAddElementSuccess())
      state = store.getState().backendUpdate
      const expState = {
        ...initialState,
        loaded: true
      }
      expect(state).toEqual(expState)
    })
    test('backendAddElementFail testing', () => {
      store.dispatch(setTestState({ ...mockElementPayload, loading: true }))
      store.dispatch(backendAddElementFail())
      state = store.getState().backendUpdate
      const expState = {
        ...mockElementPayload,
        content: {},
        loading: false,
        loaded: false
      }
      expect(state).toEqual(expState)
      // console.log('slices, backendUpdate.test, state ->', state)
    })
  })
  describe('backendRemoveElement', () => {
    const mockElementPayload = {
      identity: 'mockIdentity',
      view_id: 'mockViewId',
      index: 12
    }
    test('backendRemoveElementStart testing', () => {
      const mockIndex = Math.floor(Math.random() * 10)
      const activeMockPayload = { ...mockElementPayload, content: {}, index: mockIndex }
      store.dispatch(backendRemoveElementStart(activeMockPayload))
      state = store.getState().backendUpdate
      const expState = {
        ...activeMockPayload,
        loading: true,
        loaded: false
      }
      expect(state).toEqual(expState)
    })
    test('backendRemoveElementSuccess testing', () => {
      store.dispatch(setTestState({ ...mockElementPayload, loading: true }))
      store.dispatch(backendRemoveElementSuccess())
      state = store.getState().backendUpdate
      const expState = {
        ...initialState,
        loaded: true
      }
      expect(state).toEqual(expState)
    })
    test('backendRemoveElementFail testing', () => {
      store.dispatch(setTestState({ ...mockElementPayload, loading: true }))
      store.dispatch(backendRemoveElementFail())
      state = store.getState().backendUpdate
      const expState = {
        ...mockElementPayload,
        content: {},
        loading: false,
        loaded: false
      }
      expect(state).toEqual(expState)
      // console.log('slices, backendUpdate.test, state ->', state)
    })
  })
  describe('backendTxtUpdate', () => {
    const mockTxtContentsPayload = {
      identity: 'mockIdentity',
      view_id: 'mockViewId',
      content: {
        title: 'mockTitnle',
        content: ['mockContent']
      }
    }
    test('backendTxtUpdateStart testing', () => {
      store.dispatch(backendTxtUpdateStart(mockTxtContentsPayload))
      state = store.getState().backendUpdate
      const expState = {
        ...mockTxtContentsPayload,
        index: -1,
        loading: true,
        loaded: false
      }
      expect(state).toEqual(expState)
    })

    test('backendTxtUpdateSuccess testing', () => {
      store.dispatch(setTestState({ ...mockTxtContentsPayload, loading: true }))
      store.dispatch(backendTxtUpdateSuccess())
      state = store.getState().backendUpdate
      const expState = {
        ...initialState,
        loaded: true
      }
      expect(state).toEqual(expState)
    })

    test('backendTxtUpdateFail testing', () => {
      store.dispatch(setTestState({ ...mockTxtContentsPayload, loading: true }))
      store.dispatch(backendTxtUpdateFail())
      state = store.getState().backendUpdate
      const expState = {
        ...mockTxtContentsPayload,
        index: -1,
        loading: false,
        loaded: false
      }
      expect(state).toEqual(expState)
      // console.log('slices, backendUpdate.test, state ->', state)
    })
  })
})
