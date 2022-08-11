<template>
  <article class="layout-home">
    <!-- AppNavigation controls the loading mechanism: found in layouts/default -->
    <SectionHero />
    <SectionMenu />
    <SectionLocation />
    <SectionAbout />
    <SectionPress />
    <SectionFooter />
  </article>
</template>
<script>
import SectionAbout from '@/components/SectionAbout.vue'
import SectionHero from '@/components/SectionHero.vue'
import SectionMenu from '@/components/SectionMenu.vue'
import SectionLocation from '@/components/SectionLocation.vue'
import SectionPress from '@/components/SectionPress.vue'
import SectionFooter from '@/components/SectionFooter.vue'

export default {
  name: 'layout-home',
  components: {
    SectionAbout,
    SectionHero,
    SectionMenu,
    SectionLocation,
    SectionPress,
    SectionFooter
  },
  async created() {
    const response = await this.$axios.get('pages', {
      params: { items: false }
    })
    const { data } = response
    // This set the isPageReady prop
    this.$store.commit('SET_PAGES', data)
  }
}
</script>

<style lang="scss">
@import '../styles/vars';
@import '../styles/mixins';

:root {
  --app-footer-height: 100;
  @include bp(tablet) {
    --app-footer-height: 260;
  }
  @include bp(mobile) {
    --app-footer-height: 460;
  }
}

.layout-home {
  background: $color-midwhite;
  @include bp(mobile) {
    overflow: hidden;
  }
}

@media screen and(max-width: 1024px) and (orientation: landscape) {
  .layout-home {
    overflow: hidden;
  }
  .press .cloud {
    display: none;
  }
}
</style>
