import { configureStore } from '@reduxjs/toolkit'
import botCheckReducer from './botCheck';
export default configureStore({
  reducer: {
    botCheck: botCheckReducer,
  },
})