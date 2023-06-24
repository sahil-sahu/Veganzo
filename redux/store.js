import { configureStore } from '@reduxjs/toolkit'
import authCheckReducer from './fireAuth';
import cartReducer from './cart';

//Persistent store
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  authCheck: authCheckReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['authCheck'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});