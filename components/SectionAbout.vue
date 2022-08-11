<template>
  <ParallaxContainer tag="section" class="about" data-id="about">
    <ZzamongCloud class="cloud" :movement="-20" :factor="-0.6" />

    <ParallaxElement tag="figure" :factor="-0.1" class="about-bg">
      <AppIcon
        type="corner"
        :class="{ [corner]: true }"
        v-for="corner in ['top', 'right', 'bottom', 'left']"
        :key="corner"
      />
    </ParallaxElement>

    <ParallaxElement
      :factor="-0.15"
      ref="title"
      tag="h2"
      v-html="about.title"
      class="about-title"
    />

    <article class="about-article">
      <ZzamongHaze class="haze left" :movement="-30" :factor="-1" />
      <ZzamongHaze class="haze right" :movement="-20" :factor="-0.25" />
      <ParallaxElement
        :factor="-0.15"
        class="about-content"
        ref="aboutContent"
        v-html="toHTMLParagraphs(about.content)"
      />
    </article>

    <aside class="about-aside">
      <ParallaxElement
        tag="svg"
        :factor="-0.2"
        viewBox="0 0 225 170"
        class="logo-type"
      >
        <g ref="logoTypeGroup">
          <path
            id="logo-type-bg"
            d="M6.3,58.6C14.1,70.4,28.5,77,28.5,77c14.4,5.9-20.6,13.4-9,33.1c11.9,20.6,35.6,5.6,35.6,5.6
                    c11.2,17.2,18.7,14.7,18.7,14.7c17.5-0.9,19-16.8,19-16.8l5.6-2.5c10,17.5,24.3,11.5,24.3,11.5c5.6,11.9,15,11.9,15,11.9
                    c-0.3,25.9,8.1,30.9,8.1,30.9s21.8,15,39-8.4c17.2-23.4-1.9-33.1-1.9-33.1c8.4-4.7,13.7-7.8,16.2-17.5c2.5-9.7-12.5-15.3-12.5-15.3
                    c3.7-9,5-15.6,5-15.6c27.5,0,20.6-25.6,20.6-25.6c7.5-10,11.2-23.1,11.2-23.1c7.8-32.4-16.2-25.9-31.8-26.5s-22.2,0-36.5,2.2
                    c0,0-14,2.2-20,9.7c-6.2,7.5-0.9,14.7-6.6,19.7c-5.6,5.3-4.7,2.5-8.1,7.5c0,0-26.5-32.1-49.3-12.2c0,0-28.1-25.9-49.9-14.7
                    C-0.2,23.3-5.8,40.5,6.3,58.6z"
          />
          <path
            id="logo-type-first"
            d="M154.5,78.9c-2.8-5.3-10.6,3.7-10.6,3.7c2.8-8.4,4.1-24.3,4.4-24.6c0.6-4.1,1.9-22.5-10.3-23.1
                    c-13.7-0.6-14,18.7-14,18.7c-27.8-46.5-53-22.2-53-22.2C36.6-1,15.4,19,15.4,19c-33.1,27.8,12.5,52.4,15.9,54.3
                    c3.7,1.9,10.9,7.2-1.9,16.2s-3.4,22.5,5.9,25.3c9.4,2.8,20.9-5.9,20.9-5.9s5.9,16.5,20.3,15.3c14.4-0.9,11.9-15,11.9-15l14-7.5
                    c0,3.7-0.3,14,13.1,15.9s13.1-12.5,13.7-12.5c5.6,0.3,6.9,1.6,16.5-6.2C155.2,91.3,157.3,84.2,154.5,78.9z M80.9,88.8
                    c-5.6,7.8-7.8,7.2-9.4,6.9c-1.6-0.3-1.9-0.9-0.9-2.8c1.2-2.5,7.2-7.8,8.4-16.5c0,0,0.6-2.8,2.2-0.6C83.1,78.5,86.8,81,80.9,88.8z
                    M123.9,90.4l-5.6-2.5c5.3-5.3,4.4-13.4,4.4-13.4l2.2,0.3L123.9,90.4z"
          />
          <ellipse
            class="glare"
            transform="matrix(2.559788e-02 -0.9997 0.9997 2.559788e-02 -18.0094 53.7953)"
            cx="18.6"
            cy="36.1"
            rx="4.7"
            ry="3.7"
          />
          <ellipse
            class="glare"
            transform="matrix(2.629638e-02 -0.9997 0.9997 2.629638e-02 28.3259 124.684)"
            cx="78.2"
            cy="47.8"
            rx="4.7"
            ry="4.1"
          />
          <path
            class="glare"
            d="M22.2,27.4c0,0,5-8.7,14-2.8c8.7,5.6,9,8.7,9,8.7s0.9,5-4.4,4.1s-8.4-7.8-12.8-5.6
                    C24.1,33.6,20.4,31.7,22.2,27.4z"
          />
          <path
            class="glare"
            d="M82.1,38.9c0,0,4.7-8.7,14-3.4c9,5.3,9,8.4,9,8.4s1.2,5-4.1,4.4c-5.3-0.9-8.7-7.5-12.8-5.3
                    S80.3,43.6,82.1,38.9z"
          />
          <path
            class="glare"
            d="M82.5,28c0,0,9.4-5,23.1,7.2c0,0-6.9,1.2-11.2-2.2C89.6,29.2,86.5,28.6,82.5,28z"
          />
          <path
            id="logo-type-last"
            class="st3"
            d="M218.2,22.1c0.6-17.2-13.4-17.2-22.8-14.4C186,10.5,157,4,143.6,14.6c0,0-11.2,7.5-5.3,18.4
                    c5.9,10.9,11.2,9.4,12.2,15.6c0.9,6.2,6.6,8.1,7.2,13.1c0.6,4.4,11.5,4.4,11.5,4.4c-10.6,9.7-11.9,20.3-11.9,27.1
                    c0,6.9-0.6,8.1-4.1,8.4c0,0-19.7,0-23.4,9c-3.7,9,1.9,13.7,1.9,13.7c8.1,8.7,25.9-1.9,25.9-1.9c-22.8,15.9-13.4,39-0.3,40.2
                    s24-5.9,26.8-19c2.5-13.1-12.5-16.2-12.5-16.2c1.6-1.9,5.6-8.1,11.5-11.9c5.9-3.7,10.3-5.9,9-12.5c-1.2-6.6-21.2-4.7-21.2-4.7
                    c20-14,10.6-33.4,12.2-33.1c1.9,0.6,7.8,0.9,13.1,1.2c5.3,0.6,7.2-4.4,9.7-8.4c2.8-4.1-3.7-10-3.7-10S217.6,39.2,218.2,22.1z
                    M163.6,145.9c-1.2,0-2.5-1.2-2.5-2.5c0-1.2,1.2-2.5,2.5-2.5s2.5,1.2,2.5,2.5C166.1,144.7,164.8,145.9,163.6,145.9z M187.6,37.7
                    c-0.3,3.1-10.6,11.2-13.1,9c-2.5-2.2-10.9-11.2-5.6-11.5c0,0,13.4-2.5,17.8-1.6C186.7,33.6,187.9,34.6,187.6,37.7z"
          />
          <ellipse
            class="glare"
            transform="matrix(2.599702e-02 -0.9997 0.9997 2.599702e-02 112.4343 185.3525)"
            cx="151.3"
            cy="35"
            rx="3.7"
            ry="3.4"
          />
          <path
            class="glare"
            d="M146.1,25.2c0,0,0-8.7,9.4-10c10-0.9,11.5,1.2,11.5,1.2s4.1,3.4-0.6,5.9
                    c-4.7,2.5-11.9-1.6-13.7,2.5C150.5,28.9,146.7,29.9,146.1,25.2z"
          />
        </g>
      </ParallaxElement>
      <ParallaxElement :factor="-0.1" ref="aboutAside">
        <figure>
          <img :src="about.aside" alt="About Us" />
          {about.aside}
        </figure>
      </ParallaxElement>
    </aside>
  </ParallaxContainer>
</template>

<script>
import AppIcon from '@/components/AppIcon'
import ParallaxContainer from '@/components/ParallaxContainer'
import ParallaxElement from '@/components/ParallaxElement'
import ZzamongHaze from '@/components/ZzamongHaze'
import ZzamongCloud from '@/components/ZzamongCloud'
import scrollObserver from '@/mixins/scrollObserver'

export default {
  name: 'section-about',
  components: {
    ParallaxContainer,
    ParallaxElement,
    ZzamongHaze,
    ZzamongCloud,
    AppIcon
  },
  mixins: [scrollObserver],
  computed: {
    about() {
      return this.$store.getters.about
    }
  },
  methods: {
    toHTMLParagraphs(text) {
      return text
        .split('\n')
        .filter(Boolean)
        .map(p => `<p>${p}</p>`)
        .join('')
    },
    animateSection() {
      const title = new SplitText(this.$refs.title.$el)
      const paragraphs = this.$refs.aboutContent.$el.children

      return (
        new TimelineMax({ paused: true })

          //title
          .add('title', 0)
          .staggerFromTo(
            title.chars,
            0.3,
            {
              autoAlpha: 0
            },
            {
              autoAlpha: 1,
              ease: Power3.easeOut
            },
            0.025,
            'title'
          )
          .staggerFromTo(
            title.chars,
            2,
            {
              x: 15
            },
            {
              x: 0,
              ease: Power3.easeOut
            },
            0.025,
            'title'
          )

          .staggerFromTo(
            paragraphs,
            0.3,
            {
              autoAlpha: 0
            },
            {
              autoAlpha: 1,
              ease: Power3.easeOut
            },
            0.1,
            'title+=0.3'
          )
          .staggerFromTo(
            paragraphs,
            2,
            {
              y: 100
            },
            {
              y: 0,
              ease: Power3.easeOut
            },
            0.1,
            'title+=0.3'
          )

          .fromTo(
            this.$refs.aboutAside.$el,
            0.3,
            {
              autoAlpha: 0
            },
            {
              autoAlpha: 1,
              ease: Power3.easeOut
            },
            'title+=0.6'
          )

          .fromTo(
            this.$refs.logoTypeGroup,
            0.6,
            {
              autoAlpha: 0
            },
            {
              autoAlpha: 1,
              ease: Sine.easeOut
            },
            'title+=0.8'
          )
          .fromTo(
            this.$refs.logoTypeGroup.parentElement,
            2,
            {
              filter: 'blur(6px)'
            },
            {
              filter: 'blur(0px)',
              ease: Bounce.easeOut
            },
            'title+=0.8'
          )
          .fromTo(
            this.$refs.logoTypeGroup,
            2,
            {
              scale: 3,
              transformOrigin: '50% 50%'
            },
            {
              scale: 1,
              ease: Bounce.easeOut
            },
            'title+=0.8'
          )
      )
    }
  }
}
</script>

<style lang="scss">
@import '../styles/vars';
@import '../styles/mixins';

section.about {
  position: relative;
  display: grid;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: vw(210);
  padding-left: vw(225);
  padding-right: vw(180);

  @include bp(tablet) {
    overflow: hidden;
    padding: 90px;
    display: block;
  }
  @include bp(mobile) {
    padding: 90px 30px 30px;
  }
}

.about-bg {
  position: absolute;
  top: vw(90);
  bottom: 0;
  left: vw(90);
  right: vw(90);

  --bg-icon-space: 4vw;
  --bg-icon-size: 4vw;

  @include bp(tablet) {
    --bg-icon-space: 0vw;
    --bg-icon-size: 48px;
  }

  @include bp(mobile) {
    --bg-icon-space: 0px;
    --bg-icon-size: 24px;
  }

  .app-icon {
    width: var(--bg-icon-size);
    height: var(--bg-icon-size);
    opacity: 1;
    stroke: $color-white;

    @include bp(tablet) {
    }

    &.top {
      top: var(--bg-icon-space);
      left: var(--bg-icon-space);
    }
    &.right {
      top: var(--bg-icon-space);
      right: var(--bg-icon-space);
    }
    &.bottom {
      bottom: var(--bg-icon-space);
      right: var(--bg-icon-space);
    }
    &.left {
      bottom: var(--bg-icon-space);
      left: var(--bg-icon-space);
    }
  }
  .app-icon .stroke {
    stroke: $color-white;
  }
}

.about-title {
  grid-column: 1/3;
  margin-bottom: vw(60);
  position: relative;
  z-index: 1;
  @include bp(tablet) {
    margin-bottom: 30px;
  }
}

.about-article {
  width: vw(420);
  @include bp(tablet) {
    width: auto;
  }
}

.about-content {
  position: relative;
  img {
    width: vw(450);
    margin-left: vw(-45);
    margin-bottom: vw(60);
    display: block;
  }
  p {
    margin-bottom: vw(20);
    @include bp(tablet) {
      margin-bottom: 20px;
    }
  }
}

.about-aside {
  display: block;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: vw(495);
  @include bp(tablet) {
    width: auto;
    top: initial;
    margin-top: 60px;
  }
  figure {
    width: 100%;
    height: vw(764);
    overflow: hidden;
    @include bp(tablet) {
      height: auto;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: 50% 0;
    }
  }
}

.about-aside .logo-type {
  width: vw(225);
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  top: -5%;
  overflow: visible;
  @include bp(tablet) {
    width: 33vw;
  }
}

#logo-type-bg {
  fill: $color-brown;
}

#logo-type-first {
  fill: $color-orange;
}

#logo-type-last {
  fill: $color-gold;
}

.glare {
  fill: white;
}

.about .haze {
  position: absolute;
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: $color-white;
}

.about .haze.left {
  left: 5%;
  width: vw(250);
  top: 80%;
  opacity: 0.6;
}

.about .haze.right {
  top: 50%;
  right: -15%;
  width: vw(450);
  z-index: 1;
}

.about .cloud {
  --cloud-size: 450;
  position: absolute;
  right: 10%;
  top: 0%;
  width: calc(var(--cloud-size) / 1440 * 100vw);
  height: auto;
  object-fit: contain;
  z-index: 1;

  @include bp(tablet) {
    --cloud-size: 520;
    right: 20%;
    top: 2%;
  }
  @include bp(mobile) {
    --cloud-size: 920;
  }
  svg {
    width: 100%;
    height: auto;
  }
  .front {
    fill: $color-white;
  }
  .back {
    fill: $color-midwhite;
  }
}
</style>
