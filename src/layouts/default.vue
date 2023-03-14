<template lang="pug">
q-layout(view="lHh Lpr lFf")
    lazy-nuxt-page
    q-footer
      q-bar.q-pl-none.bg-primary(dense)
        q-space
        div.q-ml-xs
          span app
          span(v-text="config.packageVersion")
</template>

<script lang="ts">
import { useRuntimeConfig } from '#app'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const runtimeConfig = useRuntimeConfig()

    return {
      config: <any>runtimeConfig.public,
    }
  },
})
</script>
