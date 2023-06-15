import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from './inventory'

export default configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
})