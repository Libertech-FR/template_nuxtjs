<template lang="pug">
client-only
    q-linear-progress.q-custom.q-custom-loading(
      color="white"
      :animation-speed="turtle"
      :value="percentage"
      v-show="percentage > 0"
    )
    nuxt-layout
</template>
<script lang="ts">
import { useRouter } from '#app'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  async setup() {
    if (process.server) return

    const router = useRouter()
    let turtle = ref(200)
    let percentage = ref(1)

    setTimeout(() => {
      percentage.value = 0
    }, 200 * 2)

    router.beforeEach(() => {
      percentage.value += 0.2
    })
    router.afterEach(() => {
      setTimeout(() => {
        percentage.value = 1
        setTimeout(() => {
          percentage.value = 0
        }, 200)
      }, 200)
    })
    return {
      turtle,
      percentage,
    }
  },
})
</script>
