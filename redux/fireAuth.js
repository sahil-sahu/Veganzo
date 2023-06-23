import { createSlice } from '@reduxjs/toolkit'

export const authCheckSlice = createSlice({
  name: 'authCheck',
  initialState: {
    auth: false,
    name: '',
    email: '',
    phone: '',
    id: '',
    address: [],
  },
  reducers: {
    load: (state, action) => {
      state.auth = action.payload.auth
      state.name = action.payload.name
      state.email = action.payload.email
      state.phone = action.payload.phone
      state.id = action.payload.id
    },
    loadAddress:(state, action) => {
      state.address = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { load, loadAddress } = authCheckSlice.actions

export default authCheckSlice.reducer