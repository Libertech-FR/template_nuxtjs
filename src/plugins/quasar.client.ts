import * as components from 'quasar'
import langFr from 'quasar/lang/fr'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(components.Quasar, {
    plugins: {
      Dialog: components.Dialog,
    },
    components,
    lang: langFr,
    config: {
      // dark: 'auto',
    },
  })
})
