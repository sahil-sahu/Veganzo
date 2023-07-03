'use client'
import './globals.css'
import store from '../redux/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { callordersDB } from 'components/helpers/getOrders'

export default function RootLayout({ children }) {

  useEffect(()=>{
    if(store.getState().orders.orders.length == 0){
      callordersDB();
    }
  }, []);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body><Provider store={store}>{children}</Provider></body>
    </html>
  )
}
