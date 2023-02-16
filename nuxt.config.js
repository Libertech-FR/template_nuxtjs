import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  srcDir: 'src/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    titleTemplate: 'Matériel | %s',
    title: 'app',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dayjs',
  ],

  dayjs: {
    defaultLocale: 'fr',
    plugin: [
      'customParseFormat'
    ]
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  watchers: {
    webpack: {
      poll: true,
      aggregateTimeout: 300,
      ignored: /node_modules/,
    }
  },

  router: {
    middleware: 'auth'
  },

  axios: {
    proxy: true,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  },
  proxy: {
    '/api/': {
      pathRewrite: { '^/api/' : '' },
      target: process.env.APP_BASE_URL || '127.0.0.1',
      xfwd: true,
      ws: false,
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      dark: false,
      themes: {
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vue-cli-plugin-vuetify-preset-basil"],
    extractCSS: true
  },

  auth: {
    // cookie: {
    //   options: {
    //     sameSite: 'none'
    //   }
    // },
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
          login: { url: '/api/auth/ldap', method: 'post', headers: { 'Content-Type': 'application/json' } },
          refresh: { url: '/api/auth/refresh', method: 'post', headers: { 'Content-Type': 'application/json' } },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/check', method: 'get', propertyName: 'user' },
        },
        tokenType: 'Bearer',
        autoRefresh: true,
      },
    },
    plugins: [
      '~/plugins/axios',
      '~/plugins/auth',
    ],
    rewriteRedirects: true,
    watchLoggedIn: true,
  },
}
