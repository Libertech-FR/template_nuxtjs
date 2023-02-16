<template lang="pug">
div
</template>

<script>
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'

@Component({})
export default class index extends Vue {
  head() {
    return {
      title: 'Accueil',
    }
  }

  // async mounted() {
  //   if(this.$auth.loggedIn){
  //     await this.$router.push('/list')
  //   } else {
  //     await this.$router.push('/login')
  //   }
  // }
}
</script>

<style scoped>

</style>
