'use client'
import './globals.css'
import store from '../redux/store'
import { Provider } from 'react-redux'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <script id="search-js" defer="" src="https://api.mapbox.com/search-js/v1.0.0-beta.16/web.js"></script>
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css"></link>
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.js"></script>
      <head />
      <body><Provider store={store}>{children}</Provider></body>
    </html>
  )
}
