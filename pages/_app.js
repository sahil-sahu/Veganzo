import '../styles/globals.css'
import store from '../redux/store'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { useEffect } from 'react';
import { callLocoDB } from '../components/locationFetcher';

let persistor = persistStore(store);

export default function App({ Component, pageProps }) {

  useEffect(()=>{
    if (!store.getState().locationDB.vegetables && (store.getState().cart?.location.set ?? null)) {
      callLocoDB(store.getState().cart.location.lng, store.getState().cart.location.lat);
    }
  },[])

  return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
}
