<template>
  <LayoutHome />
</template>
<script>
import LayoutHome from '@/components/LayoutHome.vue'

export default {
  name: 'layout-error',
  props: {
    error: Object
  },
  components: {
    LayoutHome
  },
  mounted() {
    document.body.classList.add('page-error')
  }
}
</script>

<style lang="scss">
@import '../styles/vars';
@import '../styles/mixins';

.page-error {
  color: darken($color-red, 15%);

  .app-navigation a.app-link[data-id='menu'],
  .app-button.hero-cta-btn.primary {
    display: none;
  }

  img.parallax-element {
    transform: none !important;
    clip-path: none !important;
  }
}
</style>
