import store from '../store'
import { STRUCTURE_ADD, STRUCTURE_REMOVE, CONTENT_UPDATE } from '../constants/types'
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
    values: {
      identity: 'mockIdentity',
      view_id: 'mockViewId',
      content: {
        title: 'mockTitle',
        content: ['mockContent']
      }
    },
    kind: 'content'
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
      kind: '',
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
      values: {
        identity: 'mockIdentity',
        view_id: 'mockViewId',
        index: Math.floor(Math.random() * 10)
      }
    }
    test('backendAddElementStart testing', () => {
      const activeMockPayload = { ...mockElementPayload }
      store.dispatch(backendAddElementStart(activeMockPayload))
      state = store.getState().backendUpdate
      const expState = {
        ...activeMockPayload,
        kind: STRUCTURE_ADD,
        loading: true,
        loaded: false
      }
      expect(state).toEqual(expState)
    })
    test('backendAddElementSuccess testing', () => {
      store.dispatch(setTestState({
        ...mockElementPayload,
        kind: STRUCTURE_ADD,
        loading: true
      }))
      store.dispatch(backendAddElementSuccess())
      state = store.getState().backendUpdate
      const expState = {
        ...initialState,
        loaded: true
      }
      expect(state).toEqual(expState)
      // console.log('slices, backendUpdate.test:',
      //   '\n state ->', state)
    })
    test('backendAddElementFail testing', () => {
      store.dispatch(setTestState({
        ...mockElementPayload,
        kind: STRUCTURE_ADD,
        loading: true
      }))
      store.dispatch(backendAddElementFail())
      // state = 'store.getState().backendUpdate'
      const state = store.getState().backendUpdate
      // state = store.getState().backendUpdate
      const expState = {
        ...mockElementPayload,
        kind: STRUCTURE_ADD,
        loading: false,
        loaded: false
      }
      expect(state).toEqual(expState)
      // console.log('slices, backendUpdate.test:',
      //   '\n state ->', state)
    })
  })
  describe('backendRemoveElement', () => {
    const mockElementPayload = {
      values: {
        identity: 'mockIdentity',
        view_id: 'mockViewId',
        index: Math.floor(Math.random() * 10)
      }
    }
    test('backendRemoveElementStart testing', () => {
      const activeMockPayload = { ...mockElementPayload }
      store.dispatch(backendRemoveElementStart(activeMockPayload))
      state = store.getState().backendUpdate
      const expState = {
        ...activeMockPayload,
        kind: STRUCTURE_REMOVE,
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
      store.dispatch(setTestState({
        ...mockElementPayload,
        kind: STRUCTURE_REMOVE,
        loading: true
      }))
      store.dispatch(backendRemoveElementFail())
      state = store.getState().backendUpdate
      const expState = {
        ...mockElementPayload,
        kind: STRUCTURE_REMOVE,
        loading: false,
        loaded: false
      }
      expect(state).toEqual(expState)
    })
  })
  describe('backendTxtUpdate', () => {
    const mockTxtContentsPayload = {
      values: {
        identity: 'mockIdentity',
        view_id: 'mockViewId',
        content: {
          title: 'mockTitnle',
          content: ['mockContent']
        }
      }
    }
    test('backendTxtUpdateStart testing', () => {
      store.dispatch(backendTxtUpdateStart(mockTxtContentsPayload))
      state = store.getState().backendUpdate
      const expState = {
        ...mockTxtContentsPayload,
        loading: true,
        loaded: false
      }
      expect(state).toEqual(expState)
      // console.log('slices, backendUpdate.test:',
      //   '\n state ->', state)
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
      store.dispatch(setTestState({
        ...mockTxtContentsPayload,
        kind: CONTENT_UPDATE,
        loading: true
      }))
      store.dispatch(backendTxtUpdateFail())
      state = store.getState().backendUpdate
      const expState = {
        ...mockTxtContentsPayload,
        kind: CONTENT_UPDATE,
        loading: false,
        loaded: false
      }
      expect(state).toEqual(expState)
      // console.log('slices, backendUpdate.test, state ->', state)
    })
  })
})
