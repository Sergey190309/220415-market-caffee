import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  loaded: false,
  changed: false
}

const structureSlice = createSlice({
  /**
   * All reducers are propely tested.
   */
  name: 'structure',
  initialState,
  reducers: {
    setState: (state, { payload }) => {
      Object.keys(state).forEach(key => {
        delete state[key]
      })
      // console.log('slice, structure, setState:',
      //   '\n initialState ->', initialState,
      //   '\n payload ->', payload
      // )
      Object.assign(state, { ...payload })
    },
    structureStart: state => {
      state.loading = true
      state.loaded = false
    },
    structureSuccess: (state, { payload }) => {
      let structures = {}
      payload.forEach(structure => {
        structures = { ...structures, ...structure }
      })
      Object.assign(state, structures, { loaded: true, loading: false, changed: true })
    },
    structureFail: state => {
      Object.keys(state).forEach(key => {
        delete state[key]
      })
      Object.assign(state, initialState)
      // console.log('structureSlice, structureFail, state ->', state)
    },
    structureResetChanged: state => {
      state.changed = false
    }
  }
})

export const {
  setState, structureStart, structureSuccess,
  structureFail, structureResetChanged
} = structureSlice.actions
export const structureSelector = state => state.structure
export default structureSlice.reducer
