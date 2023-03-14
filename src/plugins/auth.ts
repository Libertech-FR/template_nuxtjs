import { Plugin, Context } from '@nuxt/types'

export default <Plugin> function ({ $auth }: Context) {
  $auth.onError((error: any, name: any, endpoint: any) => {
    console.log('onError', error, name, endpoint)
  })

  $auth.onRedirect((to: string, from: string): string => {
    console.log('onRedirect', to, from)
    return to
  })
}
