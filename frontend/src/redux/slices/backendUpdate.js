import { createSlice } from '@reduxjs/toolkit'
import { STRUCTURE_ADD, STRUCTURE_REMOVE, CONTENT_UPDATE } from '../constants/types'

/**
 * Slice for back end updating.
 * It's not critical to have simultaneously exchange with
 * back end, so standard saga seems preferable.
 */

export const initialState = {
  // update: []
  values: {
    identity: '',
    view_id: '',
    content: {},
    index: -1
  },
  kind: '',
  loading: false,
  loaded: false // used to set save to backend inactive
}
/**
 * Above used to configure values for specific update.
 * See constants/types.js
 * 210909: STRUCTURE_ADD, STRUCTURE_REMOVE, CONTENT_UPDATE
 */

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
      state.kind = ''
      state.loading = false
      state.loaded = false
    },
    backendAddElementStart: (state, { payload }) => {
      if (typeof payload !== 'undefined') {
        // console.log('slice, backendUpdate:\n',
        //   ' backendAddElementStart\n  payload ->', payload)
        state.values = payload
      }
      state.kind = STRUCTURE_ADD
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
      if (typeof payload !== 'undefined') {
        // console.log('slice, backendUpdate:\n',
        //   ' backendRemoveElementStart\n  payload ->', payload)
        state.values = payload
      }
      state.kind = STRUCTURE_REMOVE
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
    backendTxtUpdateReady: (state, { payload }) => {
      if (typeof payload !== 'undefined') {
        state.values.identity = payload.identity
        state.values.view_id = payload.view_id
        state.values.content = payload.content
        state.kind = CONTENT_UPDATE
      }
    },
    backendTxtUpdateStart: (state) => {
      // console.log('slice, backendUpdate:\n',
      //   ' backendTxtUpdateStart\n',
      //   '  payload ->', payload)
      state.loading = true
      state.loaded = false
    },
    backendTxtUpdateSuccess: state => {
      // console.log('slice, backendUpdate:',
      //   '\n backendTxtUpdateSuccess',
      //   '\n  initialState ->', initialState)
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
  backendTxtUpdateReady, backendTxtUpdateStart, backendTxtUpdateSuccess, backendTxtUpdateFail,
  backendUpdateFail,
  resetBackendUpdate
} = backendUpdateSlice.actions
export const backendUpdateSelector = state => state.backendUpdate
export default backendUpdateSlice.reducer
