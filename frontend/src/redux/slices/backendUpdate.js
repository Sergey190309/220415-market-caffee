import { createSlice } from '@reduxjs/toolkit'

/**
 * Slice for back end updating.
 * It's not critical to have simultaneously exchange with
 * back end, so standard saga seems preferable.
 */

export const initialState = {
  identity: '',
  view_id: '',
  content: {},
  index: -1,
  loading: false,
  loaded: false // used to set save to backend inactive
}

const backendUpdateSlice = createSlice({
  name: 'backendUpdate',
  initialState,
  reducers: {
    setTestState: (state, { payload }) => {
    /**
     * That's for testing only.
     * It rewrites all state.
     */
      Object.assign(state, payload)
    },
    resetBackendUpdate: state => {
      Object.assign(state, initialState)
      state.loaded = false
    },
    backendUpdateFail: state => {
      state.loading = false
      state.loaded = false
    },
    backendAddElementStart: (state, { payload }) => {
      // console.log('slice, backendUpdate, start, payload ->', payload)
      state.identity = payload.identity
      state.view_id = payload.view_id
      // state.content = { ...payload.content }
      state.index = payload.index
      state.loading = true
      state.loaded = false
    },
    backendAddElementSuccess: state => {
      Object.assign(state, { ...initialState, loaded: true })
    },
    backendAddElementFail: state => {
      state.loading = false
      state.loaded = false
    },
    backendRemoveElementStart: (state, { payload }) => {
      // console.log('slice, backendUpdate, start, payload ->', payload)
      state.identity = payload.identity
      state.view_id = payload.view_id
      // state.content = { ...payload.content }
      state.index = payload.index
      state.loading = true
      state.loaded = false
    },
    backendRemoveElementSuccess: state => {
      Object.assign(state, { ...initialState, loaded: true })
    },
    backendRemoveElementFail: state => {
      state.loading = false
      state.loaded = false
    },
    backendTxtUpdateStart: (state, { payload }) => {
      // console.log('slice, backendUpdate, start, payload ->', payload)
      state.identity = payload.identity
      state.view_id = payload.view_id
      state.content = { ...payload.content }
      // state.index = payload.index
      state.loading = true
      state.loaded = false
    },
    backendTxtUpdateSuccess: state => {
      // console.log('slice, backendUpdate, success, payload ->', payload)
      Object.assign(state, { ...initialState, loaded: true })
    },
    backendTxtUpdateFail: state => {
      state.loading = false
      state.loaded = false
    }
  }
})

export const {
  setTestState,
  backendAddElementStart, backendAddElementSuccess, backendAddElementFail,
  backendRemoveElementStart, backendRemoveElementSuccess, backendRemoveElementFail,
  backendTxtUpdateStart, backendTxtUpdateSuccess, backendTxtUpdateFail,
  backendUpdateFail,
  resetBackendUpdate
} = backendUpdateSlice.actions
export const backendUpdateSelector = state => state.backendUpdate
export default backendUpdateSlice.reducer
