// import { initial } from 'lodash'
import store from '../store'
import { initialState, setTestState, setDeviceSize, openModal, closeModal, setEditable } from './device'

describe('device slice testing', () => {
  // const mockDeviceSize = 'big'
  // const mockKindOfModal = 'kindOfModal'
  let state
  beforeEach(() => {
    jest.resetAllMocks()
    store.dispatch(setTestState(initialState))
    state = store.getState().device
    expect(state).toEqual(initialState)
  })

  test('setDeviceSize', () => {
    store.dispatch(setDeviceSize(780))
    state = store.getState().device
    expect(state.deviceSize).toBe('medium')

    store.dispatch(setDeviceSize(1080))
    state = store.getState().device
    expect(state.deviceSize).toBe('big')

    store.dispatch(setDeviceSize(779))
    state = store.getState().device
    expect(state.deviceSize).toBe('small')
  })

  test('openModal, closeModal', () => {
    const mockKindOfModal = 'somthing'
    store.dispatch(openModal(mockKindOfModal))
    state = store.getState().device
    expect(state.kindOfModal).toBe(mockKindOfModal)

    store.dispatch(closeModal())
    state = store.getState().device
    expect(state.kindOfModal).toBe('')
  })

  test('setEditable', () => {
    store.dispatch(setEditable(true))
    state = store.getState().device
    expect(state.editable).toBe(true)

    store.dispatch(setEditable(false))
    state = store.getState().device
    expect(state.editable).toBe(false)
  })
})
