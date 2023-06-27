import { createSlice } from '@reduxjs/toolkit'

export const locationDBSlice = createSlice({
  name: 'locationDB',
  initialState: {
    vegetables: null,
    fruits: null,
    beverages: null,
  },
  reducers: {
    load: (state, action) => {
      state.vegetables = action.payload.vegetables;
      state.fruits = action.payload.fruits;
      state.beverages = action.payload.beverages;
    },
  },
})

// Action creators are generated for each case reducer function
export const { load } = locationDBSlice.actions

export default locationDBSlice.reducer