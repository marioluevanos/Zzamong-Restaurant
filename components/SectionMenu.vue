<template>
  <section class="menu" data-id="menu" v-if="menus">
    <ParallaxContainer class="menu-static-column">
      <ParallaxElement tag="h2" class="menu-title">{{
        menus.title
      }}</ParallaxElement>
      <ParallaxElement class="menu-filters" :cssTop="true" ref="filters">
        <AppIcon
          type="corner"
          :class="{ [corner]: true }"
          v-for="corner in ['top', 'right', 'bottom', 'left']"
          :key="corner"
        />
        <button
          class="menu-filter"
          :class="{ active: currentVisbileClass === slugify(filter.type) }"
          @click="onMenuClick"
          :data-id="filter.id"
          v-for="filter in menus.menu"
          :key="filter.id"
        >
          {{ filter.type }}
        </button>
      </ParallaxElement>
      <figure class="menu-type-image">
        <img
          v-for="type in menuTypeImages"
          :src="type.image"
          :key="type.id"
          :class="{
            active: type.id === activeImageId,
            previous: type.id === previousImageId
          }"
          :alt="type.alt"
        />
      </figure>
      <ZzamongHaze class="haze" :movement="-20" :factor="-0.25" />
    </ParallaxContainer>
    <ul class="menu-types" ref="menuTypes">
      <li
        v-for="menu in menus.menu"
        :key="menu.id"
        :id="menu.id"
        :data-type="slugify(menu.type)"
        :data-id="menu.id"
        :class="{ [slugify(menu.type)]: true }"
        class="menu-type"
      >
        <img
          class="menu-type-preload"
          :src="menu.image"
          :data-image="menu.image"
        />
        <header class="menu-type-header">
          <h4 class="menu-type-title" v-html="menu.type" />
          <p
            class="menu-type-description"
            v-if="menu.description"
            v-html="menu.description"
          />
        </header>
        <ul class="items">
          <li class="item" v-for="item in menu.items" :key="item.id">
            <span class="item-data number" v-html="item.number" />
            <span class="item-data name" v-html="item.name" />
            <span class="item-data price" v-html="'$' + item.price" />
            <p
              class="item-data description"
              v-html="item.description"
              v-if="item.description"
            />
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import { TweenMax, Power4 } from 'gsap'
import ParallaxContainer from '@/components/ParallaxContainer'
import ParallaxElement from '@/components/ParallaxElement'
import ZzamongHaze from '@/components/ZzamongHaze'
import AppIcon from '@/components/AppIcon.vue'
import scrollTo from '@/utils/scrollTo'

export default {
  name: 'section-menu',
  components: {
    AppIcon,
    ParallaxContainer,
    ParallaxElement,
    ZzamongHaze
  },
  data() {
    return {
      currentVisbileClass: '',
      activeImageId: '',
      previousImageId: ''
    }
  },
  watch: {
    menus(data) {
      if (data.menu) {
        this.$nextTick(() => {
          this.observeSections()
          this.setActiveImageId(this.menuTypeImages[0].id)
        })
      }
    }
  },
  computed: {
    menus() {
      return this.$store.getters.menu
    },
    menuTypeImages() {
      return this.menus.menu.map(menu => {
        return {
          id: menu.id,
          image: menu.image,
          alt: menu.type + ' Image',
          active: menu.id === this.activeImageId
        }
      })
    }
  },
  methods: {
    onMenuClick(event) {
      const { id } = event.target.dataset
      this.scrollToMenu(id)
      this.setImageIds(id)
      this.toggleMenuClass(event.target)
    },
    toggleMenuClass(target) {
      Array.from(this.$refs.filters.$el.children).forEach(child =>
        child.classList.remove('active')
      )
      target.classList.add('active')
    },
    setActiveImageId(id) {
      if (this.activeImageId === id) return
      this.activeImageId = id
    },
    setPrevImageId(id) {
      if (this.previousImageId === this.activeImageId) return
      if (this.previousImageId === id) return
      if (this.activeImageId === id) return

      this.previousImageId = this.activeImageId
    },
    setImageIds(id) {
      this.setPrevImageId(id)
      this.setActiveImageId(id)
    },
    onScrollComplete(id) {
      this.setImageIds(id)
    },
    getScrollY() {
      const navigation = document.querySelector('nav.app-navigation')
      const navHeight = !navigation ? 0 : navigation.clientHeight
      const padding = window.innerHeight * 0.05
      return window.innerHeight - navHeight - padding
    },
    scrollToMenu(id) {
      const { onScrollComplete } = this
      const element = document.getElementById(id)
      const y = element.offsetTop + this.getScrollY()

      scrollTo({
        yPos: y,
        duration: 0.6,
        onComplete: onScrollComplete.bind(null, id)
      })
    },
    observeSections() {
      const sections = this.$refs.menuTypes.children
      Array.from(sections).forEach(section => this.observeSection(section))
    },
    observeSection(section) {
      const observer = new IntersectionObserver(this.updateSectionId, {
        root: null,
        rootMargin: '0px',
        threshold: 1
      })
      observer.observe(section)
    },
    updateSectionId(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const { type, id } = entry.target.dataset
          this.currentVisbileClass = type
        }
        const ratio = window.scrollY / this.$refs.menuTypes.clientHeight
        const lowScroll = ratio > 0.8
        const lastElement = !entry.target.nextElementSibling
        const isScrollEnd = lowScroll && lastElement
        this.$el.classList.toggle('is-scrollend', isScrollEnd)
      })
    },
    slugify(s) {
      return s.toLowerCase().replace(/ /g, '-')
    }
  }
}
</script>

<style lang="scss">
@import '../styles/vars';
@import '../styles/mixins';

section.menu {
  position: relative;
  display: flex;

  @include bp(tablet) {
    flex-direction: column;
    overflow: hidden;
  }
  @include bp(mobile) {
    padding-top: 60px;
    padding-bottom: 0;
  }
}

img.menu-type-preload {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  pointer-events: none;
}

.menu-title {
  position: absolute;
  left: 0;
  top: 25%;
  color: $color-brown;
  writing-mode: tb;
  width: vw(90);
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  @include base-font(h4);

  @include bp(tablet) {
    top: 0;
    height: 40vh;
    width: 90px;
  }

  @include bp(mobile) {
    position: relative;
    height: auto;
    width: auto;
    writing-mode: initial;
    padding: 15px 0;
    top: 0;
  }
}

.menu-static-column {
  position: -webkit-sticky;
  position: sticky;
  top: vw(0);
  height: 100vh;
  width: vw(720);
  display: flex;
  align-items: center;

  @include bp(tablet) {
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 40vh;
  }
}

ul.menu-types {
  width: vw(360);
  padding: vw(80 + 60) vw(115) 25vh vw(115);
  box-sizing: content-box;
  position: relative;

  @include bp(tablet) {
    width: auto;
    padding: 30px 90px;
  }

  @include bp(mobile) {
    width: auto;
    padding: 15px;
  }
}

li.menu-type {
  width: 100%;
  margin: 0 0 vw(60);
  text-align: center;
  @include bp(tablet) {
    margin-bottom: 15px;
  }
}

@keyframes exit-img {
  0% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

.menu-type-image {
  width: auto;
  background: $color-brown;
  position: absolute;
  top: 0;
  left: vw(90);
  right: vw(90);
  bottom: vw(100);
  z-index: 1;
  overflow: hidden;

  @include bp(tablet) {
    left: initial;
    right: initial;
    bottom: initial;
    height: 40vh;
    position: relative;
    margin: 0;
    width: calc(100% - 90px);
    align-self: flex-end;
  }

  @include bp(mobile) {
    left: initial;
    right: initial;
    bottom: initial;
    height: 40vh;
    position: relative;
    margin: 0 auto 0;
    width: 95%;
  }
  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: 50% 100%;
    clip-path: inset(0 0 100% 0);
    transform: scale(1.15);
    transition: transform 0s ease-in 0.6s, clip-path 0s ease-in 0.6s;
  }
  img.previous {
    animation: exit-img 0.6s ease-out;
  }
  img.active {
    clip-path: inset(0 0 0 0);
    transform: scale(1.05);
    transition: transform 0.6s ease-out 0s, clip-path 0.6s ease-out 0s;
    z-index: 10;
  }
}

.menu-type-header {
  position: relative;
  margin: vw(30) 0;
}

.menu-type-title {
  font-family: $font-regular;
  font-weight: 700;
  margin-bottom: vw(15);
}

.menu-type-description {
  opacity: 0.65;
  margin-bottom: vw(15);
  @include base-font();
}

.menu-filters {
  background: $color-offwhite;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: vw(80);
  right: 0;
  align-items: flex-start;
  padding: vw(36);
  z-index: 2;

  @include bp(tablet) {
    display: none;
  }

  .menu-filter {
    background: none;
    padding: vw(4) vw(10);
    border: none;
    font-weight: 700;
    color: $color-brown;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    width: 100%;
    &.active {
      color: $color-primary;
    }
    &:focus {
      color: $color-primary;
      outline-style: solid;
      outline-color: rgba($color-white, 0.65);
      outline-width: 3px;
      outline-style: dashed;
    }
  }
  .app-icon {
    width: 24px;
    height: 24px;
  }
  .app-icon {
    stroke: $color-brown;
  }
}

.menu .item {
  display: grid;
  grid-template-columns: minmax(15px, 0.125fr) 1fr auto;
  padding: vw(8) 0;
  position: relative;
}

.menu .item-data {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
}

.menu .number {
  justify-content: flex-start;
  padding-right: vw(8);
}

.menu .number,
.menu .price {
  color: desaturate(lighten($color-primary, 5%), 30%);
  font-size: 0.75em;
}

.menu .name {
  @include base-font(medium);
}

.menu .description {
  font-size: 0.85em;
  grid-column: 2/3;
  opacity: 0.65;
}

.menu .haze {
  position: absolute;
  fill: $color-white;
  top: 60%;
  right: -10%;
  width: 40vw;
  z-index: 0;
  opacity: 0.5;
}
</style>
