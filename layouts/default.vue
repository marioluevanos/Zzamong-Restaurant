<template>
  <main class="default">
    <AppNavigation />
    <nuxt class="page" />
  </main>
</template>

<script>
import AppNavigation from '@/components/AppNavigation.vue'
export default {
  name: 'layout-default',
  components: {
    AppNavigation
  }
}
</script>
