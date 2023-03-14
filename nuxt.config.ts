import { NuxtConfig } from '@nuxt/types'
import colors from 'vuetify/src/util/colors'

const APP_SERVER_PORT = process.env.APP_SERVER_PORT ? parseInt(process.env.APP_SERVER_PORT) : 3000
const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:4000'
const APP_DAYJS_DEFAULTLOCALE = process.env.APP_DAYJS_DEFAULTLOCALE || 'fr'

export default <NuxtConfig>{
  srcDir: 'src/',
  server: {
    port: APP_SERVER_PORT,
    host: '0.0.0.0',
  },
  ssr: false,

  router: {
    middleware: 'auth',
  },

  /**
   * @see https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-head
   */
  head: {
    titleTemplate: 'Nuxt Template | %s',
    title: 'Nuxt Template',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'Content-Security-Policy', content: 'upgrade-insecure-requests' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  },

  /**
   * @see https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-components
   */
  components: ['~/components/'],

  /**
   * @see https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-css
   */
  css: [],

  /**
   * @see https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-plugins
   */
  plugins: [],

  /**
   * @see https://nuxtjs.org/docs/configuration-glossary/configuration-modules#buildmodules
   */
  buildModules: [
    /**
     * @see https://composition-api.nuxtjs.org/
     */
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],

  /**
   * @see https://nuxtjs.org/docs/configuration-glossary/configuration-modules#modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/dayjs'],

  /**
   * @see
   */
  dayjs: {
    defaultLocale: APP_DAYJS_DEFAULTLOCALE,
    plugin: ['customParseFormat'],
  },

  auth: {
    redirect: {
      callback: '/authorize',
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          maxAge: 60 * 5,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 4,
        },
        user: {
          property: 'user',
        },
        clientId: false,
        grantType: false,
        endpoints: {
          login: {
            url: '/api/auth/ldap',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
          },
          refresh: {
            url: '/api/auth/refresh',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
          },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/check', method: 'get', propertyName: 'user' },
        },
        tokenType: 'Bearer',
        autoRefresh: true,
      },
    },
    plugins: ['~/plugins/axios', '~/plugins/auth'],
    rewriteRedirects: true,
    watchLoggedIn: true,
  },

  /**
   * @see https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  },

  proxy: {
    '/api/': {
      pathRewrite: { '^/api/': '' },
      target: APP_BASE_URL,
      xfwd: true,
      ws: false,
    },
  },

  /**
   * @see https://github.com/nuxt-community/vuetify-module#options
   */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/sass/variables.scss'],
    theme: {
      dark: false,
      themes: {
        options: {
          customProperties: true,
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  /**
   * @see https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-watchers
   */
  watchers: {
    webpack: {
      poll: true,
      aggregateTimeout: 300,
      ignored: /node_modules/,
    },
  },

  /**
   * @see https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build
   */
  build: {
    extend(config: any) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    },
    transpile: ['vue-cli-plugin-vuetify-preset-basil', 'vuetify/lib', '@nuxtjs/dayjs'],
    extractCSS: true,
  },
}
