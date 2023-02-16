'use strict'

import https from 'https'

// noinspection JSUnusedGlobalSymbols
export default function ({$axios}) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
  $axios.defaults.headers.Accept = 'application/json, text/plain, */*'
  $axios.defaults.headers['Content-Type'] = 'application/json'

  $axios.onResponse(response => {
    console.log(`[${response.status}] ${response.config.url}`)
  })

  $axios.onRequestError(err => {
    console.log('onRequestError', err)
  })

  $axios.onError(err => {
    console.log('onError', err)
  })
}
