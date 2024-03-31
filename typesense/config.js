/*
 *  Our JavaScript client library works on both the server and the browser.
 *  When using the library on the browser, please be sure to use the
 *  search-only API Key rather than the master API key since the latter
 *  has write access to Typesense and you don't want to expose that.
 */
const Typesense = require('typesense')
const client = new Typesense.Client({
    'nodes': [{
      'host': process.env.NEXT_PUBLIC_TYPESENSE_DOMAIN ?? "veganzo-typesense.onrender.com", // For Typesense Cloud use xxx.a1.typesense.net
      'port': '443',      // For Typesense Cloud use 443
      // 'port': '8108',      // For Typesense Cloud use 443
      'protocol': 'https'   // For Typesense Cloud use https
    }],
    'apiKey': process.env.NEXT_PUBLIC_TYPESENSE,
    'connectionTimeoutSeconds': 2
  })

export {client as typesense};