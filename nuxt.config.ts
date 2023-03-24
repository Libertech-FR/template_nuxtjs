import { quasar } from '@quasar/vite-plugin'
import { defineNuxtConfig, NuxtConfig } from 'nuxt/config'
import pugPlugin from 'vite-plugin-pug'

export default defineNuxtConfig(<NuxtConfig>{
  telemetry: false,
  pages: true,
  srcDir: 'src',
  debug: process.env.NODE_ENV === 'development',

  runtimeConfig: {
    public: {
      packageVersion: process.env.npm_package_version,
    },
  },

  components: {
    global: true,
    dirs: [{ path: '~/components' }],
  },

  css: [
    '@quasar/extras/roboto-font/roboto-font.css',
    '@quasar/extras/material-icons/material-icons.css',
    '@quasar/extras/mdi-v7/mdi-v7.css',
    '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
    '~/assets/styles/quasar.sass',
  ],

  modules: ['@nuxt-alt/auth', '@pinia/nuxt', '@nuxt-alt/http', '@nuxt-alt/proxy'],

  proxy: {
    proxies: {
      '/api': {
        rewrite: (path: string) => path.replace(/^\/api/, ''),
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },

  build: {
    transpile: ['quasar'],
  },

  vite: {
    define: {
      'process.env.DEBUG': !!process.env.DEBUG,
    },
    plugins: [
      pugPlugin({
        pretty: true,
      } as any),
      quasar({
        sassVariables: 'assets/styles/quasar-variables.sass',
        devTreeshaking: true,
      }),
    ],
  },
})
