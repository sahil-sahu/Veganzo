import '../styles/globals.css'
import store from '../redux/store'
import { Provider } from 'react-redux'

// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
import { useEffect } from 'react';
import { callLocoDB } from '../components/locationFetcher';
import { gpsLoader, cartLoader } from '../redux/cart';

// let persistor = persistStore(store);

export default function App({ Component, pageProps }) {

  useEffect(()=>{
    let cart = localStorage.getItem('cart');
    let location = localStorage.getItem('location');
    if (cart){
      store.dispatch(cartLoader(cart));
    }
    if (location){
      store.dispatch(gpsLoader(location));
    }
    if (!store.getState().locationDB.vegetables && (store.getState().cart?.location.set ?? null)) {
      callLocoDB(store.getState().cart.location.lng, store.getState().cart.location.lat);
    }
  },[])

  return <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
              <Component {...pageProps} />
            {/* </PersistGate> */}
          </Provider>
}
