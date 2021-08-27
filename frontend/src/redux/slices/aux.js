import { createSlice } from '@reduxjs/toolkit'

/**
 * Slice contains info for intern auxiliary actions
 * such as:
 * 1. Saving something to back end after password confirmation.
<<<<<<< HEAD
=======
 * I've postponed this course I decided to create other slice
 * to update back end witn new infor for admin.
>>>>>>> dev210823
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
