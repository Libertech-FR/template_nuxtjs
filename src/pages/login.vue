<template lang="pug">
v-card.elevation-12.mx-auto(min-width="400" max-width="1200" :style="{ opacity: 0.95 }")
  v-toolbar(dark color="primary")
    v-toolbar-title Connexion
  v-card-text
    v-form(@keyup.enter.native="login")
      v-text-field(label="Nom d'utilisateur" :value="payload.username" @change="payload.username = $event")
      v-text-field(label="Mot de passe" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" :value="payload.password" @change="payload.password = $event")
    v-card-actions
      v-spacer
      v-btn(color="primary" @click="login")
        | Se connecter
</template>

<script>
import { defineComponent, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  setup() {
    useMeta({
      title: 'Connexion',
      layout: 'default',
      auth: false,
    })
    return {
      name: 'LoginPage',
      payload: {
        username: '',
        password: '',
      },
      showPassword: false,
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', { data: this.payload })
        await this.$router.push('/')
      } catch (e) {
        await this.$dialog.message.error('Une erreur est survenue lors de la connexion, veuillez réessayer')
        console.error(e.message)
      }
    },

    async mounted() {
      if (this.$auth.loggedIn) {
        await this.$router.push('/')
      }
    },
  },
})
</script>
