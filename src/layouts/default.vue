<template lang='pug'>
v-app
  v-app-bar( :clipped-left="clipped" fixed app)
    span Titre
    v-spacer
    span(
      v-if='$auth.loggedIn'
      v-html='$auth.user.cn'
      )
    v-btn.ml-2(
      text
      v-if='$auth.loggedIn'
      @click='$auth.logout()'
    ) Deconnexion
  v-main.background
    v-container(fluid)
      Nuxt
  v-footer(:absolute="!fixed" app)
    span &copy; {{new Date().getFullYear()}}
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

<style>

</style>
