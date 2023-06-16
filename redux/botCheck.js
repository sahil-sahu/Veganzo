import { createSlice } from '@reduxjs/toolkit'
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { database } from '../firebase/config';

export const botCheckSlice = createSlice({
  name: 'botCheck',
  initialState: {
    value: true,
  },
  reducers: {
    nope: (state) => {
      state = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { nope } = botCheckSlice.actions

export default botCheckSlice.reducer