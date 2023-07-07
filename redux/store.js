import { configureStore } from '@reduxjs/toolkit'
import authCheckReducer from './fireAuth';
import cartReducer from './cart';
import locationDBReducer from './locationDB';

//Persistent store
// import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';

// const reducers = combineReducers({
//   authCheck: authCheckReducer,
//   cart: cartReducer,
//   locationDB: locationDBReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['authCheck', 'locationDB'],
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: {
    authCheck: authCheckReducer,
    cart: cartReducer,
    locationDB: locationDBReducer,
  },
})