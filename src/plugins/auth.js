'use strict'

// noinspection JSUnusedGlobalSymbols
export default function ({$auth}) {
  $auth.onError((error, name, endpoint) => {
    console.log('onError', error, name, endpoint)
  })
  $auth.onRedirect((to, from) => {
    console.log('onRedirect', to, from)
  })
}
