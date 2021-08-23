import { createSlice } from '@reduxjs/toolkit'

/**
 * Slice contains info for intern auxiliary actions
 * such as:
 * 1. Saving something to back end after password confirmation.
 */

export const initialState = {
  savingItemsIdentity: {
    identity: '',
    view_id: '',
    content: ''
    // locale_id: ''
  }
}

const auxSlice = createSlice({
  name: 'aux',
  initialState,
  reducers: {
    setTestState: (state, { payload }) => {
      /**
       * That's for testing only.
       * It rewrites all state.
       */
      Object.assign(state, payload)
    }

  }
})

export const {
  setTestState
} = auxSlice.actions
export const auxSelector = state => state.aux
export default auxSlice.reducer
