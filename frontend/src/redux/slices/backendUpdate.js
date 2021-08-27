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
    backendUpdateStart: (state, { payload }) => {
      // console.log('slice, backendUpdate, start, payload ->', payload)
      state.identity = payload.identity
      state.view_id = payload.view_id
      state.content = { ...payload.content }
      state.loading = true
      state.loaded = false
    },
    backendUpdateSuccess: state => {
      // console.log('slice, backendUpdate, success, payload ->', payload)
      state.identity = ''
      state.view_id = ''
      state.content = {}
      state.loading = false
      state.loaded = true
    },
    backendUpdateFail: state => {
      state.loading = false
      state.loaded = false
    },
    resetBackendUpdate: state => {
      Object.assign(state, initialState)
      state.loaded = false
    }
  }
})

export const {
  setTestState,
  backendUpdateStart,
  backendUpdateSuccess,
  backendUpdateFail,
  resetBackendUpdate
} = backendUpdateSlice.actions
export const backendUpdateSelector = state => state.backendUpdate
export default backendUpdateSlice.reducer
