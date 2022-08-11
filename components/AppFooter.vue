<template>
  <footer class="app-footer" v-if="location">
    <address class="address">
      <MapLink class="link" :address="location.address"></MapLink>
      <a class="link" :href="`tel:${location.phone}`" target="_blank">{{
        formatPhoneNumber(location.phone)
      }}</a>
    </address>
    <div class="social">
      <a
        :href="link.href"
        class="icon-link"
        target="_blank"
        v-for="link in social"
        :key="link.href"
      >
        <AppIcon :type="link.type" />
      </a>
    </div>
  </footer>
</template>
<script>
import AppIcon from '@/components/AppIcon.vue'
import MapLink from '@/components/MapLink'
import formatPhoneNumber from '@/mixins/formatPhoneNumber'
export default {
  name: 'app-footer',
  components: {
    AppIcon,
    MapLink
  },
  data() {
    return {
      social: [
        {
          href: 'https://www.facebook.com/ZzamongRestaurant',
          type: 'facebook'
        },
        {
          href: 'https://www.instagram.com/zzamongrestaurant',
          type: 'instagram'
        },
        {
          href: 'https://twitter.com/zzamongla',
          type: 'twitter'
        }
      ]
    }
  },
  computed: {
    location() {
      return (
        this.$store.getters.location || {
          address: {
            state: 'CA',
            zip: 90004,
            street: '4255 W. 3rd Street',
            city: 'Los Angeles'
          },
          phone: 2137392747
        }
      )
    }
  },
  methods: {
    formatPhoneNumber
  }
}
</script>

<style lang="scss">
@import '../styles/vars';
@import '../styles/mixins';

.app-footer {
  position: absolute;
  height: w(var(--app-footer-height));
  bottom: 0;
  left: vw(180);
  right: vw(180);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  @include bp(mobile) {
    flex-direction: column;
    left: initial;
    right: initial;
  }
  a {
    font-style: normal;
    text-decoration: none;
    margin-right: vw(45);
  }
}

.address,
.social {
  display: flex;
}

.social {
  @include bp(mobile) {
    padding: 15px;
    width: 65%;
    display: flex;
    justify-content: space-between;
  }
}
.address {
  @include bp(tablet) {
    flex-direction: column;
  }
  @include bp(mobile) {
    @include base-font(small);
    padding: 15px 15px 0;
    flex-direction: column;
    text-align: center;
  }
}

.app-footer .app-icon {
  transition: transform 0.15s ease-in;
}

.app-footer .app-icon {
  fill: $color-offwhite;
  transition: all 0.3s ease-in-out;
}

.app-footer .app-icon:hover {
  fill: $color-primary;
}

.app-footer .app-icon:hover {
  transform: scale(1.3);
  transition: transform 0.15s ease-out;
}

.app-footer a:focus .app-icon {
  transform: scale(1.3);
  fill: $color-primary;
  transition: transform 0.15s ease-out;
}

.app-footer .social .app-icon {
  margin-left: vw(45);
}
</style>
