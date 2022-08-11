<template>
  <ParallaxContainer
    tag="section"
    class="press"
    data-id="press"
    :class="{ 'modal-active': isVideoActive }"
    v-if="press"
  >
    <ParallaxElement
      :factor="-0.1"
      tag="header"
      class="press-header main-header"
    >
      <h3 ref="title" class="press-title">{{ press.title }}</h3>
    </ParallaxElement>

    <ParallaxElement class="logos" :factor="-0.1" ref="logos">
      <AppIcon
        type="corner"
        :class="{ [corner]: true }"
        v-for="corner in ['top', 'right', 'bottom', 'left']"
        :key="corner"
      />
      <figure class="logo" v-for="logo in press.logos" :key="logo">
        <img :src="logo" alt="Logo" />
      </figure>
    </ParallaxElement>

    <ParallaxElement tag="ul" :factor="-0.2" class="links" ref="links">
      <li class="link" v-for="link in links" :key="link.url">
        <span class="source">{{ link.source }}</span>
        <h4 class="link-title">
          <a class="link" target="_blank" :href="link.url">{{ link.title }}</a>
        </h4>
        <span class="date">{{ link.date }}</span>
      </li>
    </ParallaxElement>

    <ParallaxElement
      :factor="-0.1"
      tag="header"
      class="press-header video-header"
    >
      <h3 class="press-title">Fire Challenge Winners</h3>
    </ParallaxElement>

    <div class="videos" ref="videos">
      <figure
        class="video-thumb"
        v-for="(video, idx) in videos"
        :data-id="video.id"
        :data-title="video.title"
        @click="onVideoClick"
        :key="video.id"
      >
        <div class="bg"></div>
        <ParallaxContainer class="video-contain">
          <AppIcon type="play" class="play" />
          <span
            :style="{ backgroundColor: `hsla(${5 + idx * 6}, 84%, 65%, 1) ` }"
          >
            <ParallaxElement
              :factor="-0.15"
              tag="img"
              :src="video.img"
              :alt="video.title"
            />
          </span>
        </ParallaxContainer>
      </figure>
    </div>

    <transition @enter="onModalEnter" @leave="onModalLeave">
      <div class="modal" v-if="isVideoActive">
        <figure class="bg" ref="modalBg">
          <div class="bg-pattern" />
        </figure>

        <AppLogo ref="modalLogo" />

        <div class="video-frame" ref="videoFrame">
          <div
            class="close"
            @click="isVideoActive = false"
            title="Close Video"
            ref="modalClose"
            tabindex="0"
          >
            <svg viewBox="0 0 24 24" class="circle">
              <circle r="12" cx="12" cy="12" />
            </svg>
            <AppIcon type="close" />
          </div>
          <iframe
            :src="
              `https://www.youtube.com/embed/${currentYoutubeId}?modestbranding=1&autoplay=1`
            "
            ref="modalIframe"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <h5 class="modal-title" ref="modalTitle">
            {{ currentYoutubeTitle }}
          </h5>
          <ul class="video-playlist" ref="modalPlaylist">
            <li
              v-for="(video, idx) in videos"
              :data-id="video.id"
              :tabindex="idx + 1"
              :key="video.id + 'playlist'"
              class="video-playlist-item"
              @click="updateVideo"
              :class="{ active: currentYoutubeId === video.id }"
            >
              <AppIcon type="play" class="play" />
              <img :src="video.img" :alt="video.title" />
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <ZzamongCloud class="cloud cloud-1" :movement="-10" :factor="-0.35" />
    <ZzamongCloud class="cloud cloud-2" :movement="-30" :factor="-0.65" />
    <ZzamongCloud class="cloud cloud-3" :movement="-30" :factor="-0.55" />
    <ZzamongHaze class="haze left" :movement="-20" :factor="-0.6" />
    <ZzamongHaze class="haze right" :movement="-5" :factor="-0.25" />
  </ParallaxContainer>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue'
import AppLogo from '@/components/AppLogo.vue'
import ParallaxContainer from '@/components/ParallaxContainer'
import ParallaxElement from '@/components/ParallaxElement'
import ZzamongCloud from '@/components/ZzamongCloud'
import ZzamongHaze from '@/components/ZzamongHaze'
import { TimelineMax } from 'gsap'
import scrollObserver, { observer } from '@/mixins/scrollObserver'

export default {
  name: 'section-press',
  components: {
    AppIcon,
    AppLogo,
    ParallaxContainer,
    ParallaxElement,
    ZzamongHaze,
    ZzamongCloud
  },
  data() {
    return {
      currentYoutubeId: null,
      isVideoActive: false,
      currentYoutubeTitle: ''
    }
  },
  computed: {
    press() {
      return this.$store.getters.press
    },
    links() {
      return Array.from(this.press.links).reverse()
    },
    videos() {
      return Array.from(this.press.youtube).slice(0, 6)
    }
  },
  watch: {
    isVideoActive(val) {
      if (val) {
        this.modalSetUp()
      } else {
        this.modalDestroy()
      }
    },
    press(data) {
      if (data) {
        this.observeVideos()
        document.addEventListener('keydown', this.closeModal)
      }
    }
  },
  mixins: [scrollObserver],
  methods: {
    modalSetUp() {
      setTimeout(() => {
        const bgOptions = {
          movement: -30,
          target: this.$refs.modalBg.firstElementChild
        }
        document.addEventListener(
          'mousemove',
          this.mouseParallax.bind(null, bgOptions)
        )
      }, 1000)

      document.body.style.overflow = 'hidden'
    },
    modalDestroy() {
      document.removeEventListener('mousemove', this.mouseParallax)
      document.body.style = null
    },
    mouseParallax({ movement, target }, { clientX, clientY }) {
      if (target) {
        const x =
          ((clientX - window.innerWidth / 2) / window.innerWidth) * movement
        const y =
          ((clientY - window.innerHeight / 2) / window.innerHeight) * movement
        TweenMax.to(target, 1, { x, y, ease: Sine.easeOut })
      }
    },
    onModalEnter(el, done) {
      const {
        modalBg,
        modalLogo,
        modalIframe,
        modalClose,
        modalTitle,
        modalPlaylist
      } = this.$refs

      const bgPattern = modalBg.firstElementChild
      const logo = modalLogo.$el

      new TimelineMax({ onComplete: done })

        .set(
          [bgPattern, logo, modalIframe, modalClose, modalTitle, modalPlaylist],
          { opacity: 0 }
        )

        .add('bg', 0)
        .fromTo(
          modalBg,
          0.3,
          {
            autoAlpha: 0,
            ease: Sine.easeIn
          },
          {
            autoAlpha: 1,
            ease: Sine.easeOut
          },
          'bg'
        )
        .fromTo(
          modalBg,
          1,
          {
            backgroundColor: '#d42127',
            rotationY: '-15deg',
            rotationX: '-50deg',
            y: '30vh',
            z: '-840px'
          },
          {
            backgroundColor: '#2B0F03',
            rotationY: '0deg',
            rotationX: '0deg',
            y: '0vh',
            z: '0px',
            ease: Sine.easeOut
          },
          'bg'
        )
        .to(
          bgPattern,
          1,
          {
            opacity: 0.03,
            ease: Sine.easeOut
          },
          'bg'
        )

        .add('iframe', 0.5)
        .fromTo(
          modalIframe,
          0.75,
          {
            rotationY: '-15deg',
            rotationX: '-50deg',
            y: '140px',
            z: '-240px'
          },
          {
            rotationY: '0deg',
            rotationX: '0deg',
            y: '0px',
            z: '0px',
            opacity: 1,
            ease: Sine.easeOut
          },
          'iframe'
        )

        .add('ui', 1.75)
        .staggerFromTo(
          [logo, modalClose, modalTitle, modalPlaylist],
          1,
          {
            y: 50
          },
          {
            autoAlpha: 1,
            y: 0,
            ease: Back.easeOut.config(1)
          },
          0.1,
          'ui'
        )
        .from(
          modalClose,
          1,
          {
            rotation: 720,
            ease: Back.easeOut.config(2)
          },
          'ui'
        )
        .staggerFromTo(
          modalPlaylist.children,
          1,
          {
            x: 25,
            autoAlpha: 0
          },
          {
            autoAlpha: 1,
            x: 10,
            ease: Back.easeOut.config(1)
          },
          0.1,
          'ui+=1'
        )
    },
    onModalLeave(el, done) {
      new TimelineMax({ onComplete: done }).to(el, 0.3, {
        autoAlpha: 0,
        ease: Sine.easeIn
      })
    },
    updateVideo(event) {
      this.currentYoutubeId = event.target.dataset.id
      this.currentYoutubeTitle = event.target.dataset.title
    },
    onVideoClick(event) {
      this.updateVideo(event)
      this.isVideoActive = !this.isVideoActive
    },
    closeModal(event) {
      if (event.keyCode === 27) this.isVideoActive = false
    },
    animateSection() {
      const title = new SplitText(this.$refs.title)
      const logos = Array.from(this.$refs.logos.$el.children).filter(el =>
        el.classList.contains('logo')
      )
      const links = Array.from(this.$refs.links.$el.children)

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
            1,
            {
              y: 50
            },
            {
              y: 0,
              ease: Power3.easeOut
            },
            0.025,
            'title'
          )

          // Logos
          .add('logos', 0.3)
          .fromTo(
            this.$refs.logos.$el,
            0.6,
            {
              autoAlpha: 0
            },
            {
              autoAlpha: 1,
              ease: Sine.easeOut
            },
            'logos'
          )

          .staggerFromTo(
            logos,
            0.3,
            {
              autoAlpha: 0
            },
            {
              autoAlpha: 1,
              ease: Sine.easeOut
            },
            0.15,
            'logos+=0.3'
          )
          .staggerFromTo(
            logos,
            2,
            {
              y: 30
            },
            {
              y: 0,
              ease: Power3.easeOut
            },
            0.15,
            'logos+=0.3'
          )

          // Links
          .add('links', 0.7)
          .staggerFromTo(
            links,
            0.3,
            {
              autoAlpha: 0
            },
            {
              autoAlpha: 1,
              ease: Sine.easeOut
            },
            0.15,
            'links'
          )
          .staggerFromTo(
            links,
            1.5,
            {
              y: 15
            },
            {
              y: 1,
              ease: Power3.easeOut
            },
            0.15,
            'links'
          )
      )
    },
    observeVideos() {
      const { videos } = this.$refs
      Array.from(videos.children).forEach(video => {
        observer({
          target: video,
          isVisible(ratio) {
            if (ratio > 0.9) {
              this.classList.add('is-visible')
            }
          },
          hasExited() {
            this.classList.remove('is-visible')
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/vars';
@import '../styles/mixins';

section.press {
  position: relative;
  background: $color-midwhite;
  margin-top: vw(-90);
  z-index: 1;
  &.modal-active {
    z-index: initial;
  }
  @include bp(tablet) {
    margin-top: 0;
  }

  @include bp(mobile) {
    padding-top: 60px;
  }
}

.press-title {
  color: $color-brown;
  position: relative;
  z-index: 1;
  text-align: center;
}

.press-header {
  position: relative;
  padding-top: vw(180);
  padding-right: vw(225);
  padding-left: vw(225);
  z-index: 1;

  @include bp(tablet) {
    padding: 60px 15px;
  }
}

.logos {
  padding: vw(40) vw(40);
  margin: 0 vw(225);
  background: rgba($color-white, 0.5);
  z-index: 3;
  display: flex;
  justify-content: center;
  @include bp(tablet) {
    margin: 0 60px;
    padding: 30px 0;
  }
  @include bp(mobile) {
    margin: 0 15px;
  }
}

.logos .app-icon.corner {
  stroke: $color-offwhite;
}

.logo {
  width: auto;
  height: vw(24);
  position: relative;

  $logo-space: 180;

  @include bp(tablet) {
    height: 16px;
  }

  @include bp(mobile) {
    height: 12px;
  }

  &:not(:last-child) {
    margin-right: vw($logo-space);
    &::before {
      content: '';
      position: absolute;
      right: vw(-$logo-space/2);
      bottom: 0;
      top: 0;
      border-right: 2px solid $color-midwhite;
    }
  }
  img {
    mix-blend-mode: luminosity;
    display: block;
    object-fit: contain;
    width: auto;
    height: 100%;
  }
}

.links {
  position: relative;
  top: 15vh;
  z-index: 1;
  @include bp(tablet) {
    top: initial;
    padding: 15px 60px;
  }
  @include bp(mobile) {
    padding: 15px 30px;
  }
}

li.link {
  display: grid;
  grid-template-columns: vw(220) auto;
  padding: vw(20) vw(225);
  @include bp(tablet) {
    display: block;
    padding: 15px 0;
  }
}

.link-title {
  font-weight: 700;
  margin-bottom: vw(5);
  @include bp(tablet) {
    margin: 5px 0;
  }
}

.source {
  position: relative;
  color: $color-brown;
  @include bp(tablet) {
    color: rgba($color-primary, 30%);
  }
}

.date {
  grid-column: 2/3;
  grid-row: 2/3;
  opacity: 0.5;
  @include base-font(small);
}

.cloud-1 {
  position: absolute;
  right: 25%;
  width: vw(450);
  height: vw(150);
  object-fit: contain;
  z-index: 0;
  top: 23vh;

  @include bp(tablet) {
    top: 20px;
  }
}

.cloud-2 {
  position: absolute;
  left: 25%;
  width: vw(450 * 0.8);
  height: vw(150 * 0.8);
  object-fit: contain;
  z-index: 1;
  top: 35vh;

  @include bp(tablet) {
    top: 80px;
    left: 20%;
  }
}

.cloud-3 {
  position: absolute;
  left: 5%;
  width: vw(450 * 1.25);
  height: vw(150 * 1.25);
  object-fit: contain;
  z-index: 0;
  bottom: -15vh;
  opacity: 0.5;
  @include bp(tablet) {
    bottom: 55vh;
    display: none;
  }
}

.video-header {
  @include bp(tablet) {
    padding: 15px 60px;
  }
  @include bp(mobile) {
    padding: 15px 30px;
  }
}

.video-header .press-title {
  position: relative;
  text-align: left;
}

$v-vgap: 30;

.videos {
  display: flex;
  flex-direction: column;
  padding: 0 vw(215);
  grid-gap: vw($v-vgap) vw(30);
  position: relative;
  z-index: 2;
  @include bp(tablet) {
    top: initial;
    padding: 15px 60px 30px;
    grid-template-columns: repeat(2, 1fr);
  }
  @include bp(mobile) {
    padding: 15px 30px 30px;
  }
}

figure.video-thumb {
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 2px;
  cursor: pointer;
  width: vw(620);
  height: vw(348);
  margin-bottom: vw(120);
  &:nth-of-type(even) {
    align-self: flex-end;
  }
  span {
    position: relative;
    width: 100%;
    display: block;
    pointer-events: none;
    transform: scale(1.25);
    z-index: 2;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      opacity: 1;
      transition: opacity 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
  }
  * {
    pointer-events: none;
  }
}

.video-thumb .bg {
  @include max-area;
  background: linear-gradient(45deg, $color-orange, $color-gold);
  transition: transform 0.3s ease-in-out;
}

.video-thumb:nth-child(even) .bg {
  transform: translate3d(-30px, 30px, 0);
}

.video-thumb:nth-child(odd) .bg {
  transform: translate3d(30px, 30px, 0);
}

figure.video-thumb:hover,
figure.video-thumb.is-visible {
  &:nth-child(even) {
    .bg {
      transform: translate3d(-10px, 10px, 0);
    }
  }
  &:nth-child(odd) {
    .bg {
      transform: translate3d(10px, 10px, 0);
    }
  }
}

.video-contain {
  width: inherit;
  height: inherit;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @include bp(tablet) {
    height: 170px;
  }
  @include bp(mobile) {
    height: 90px;
  }
  img.parallax-element {
    top: vw(45);
    position: relative;
  }
}

.app-icon.play {
  position: absolute;
  z-index: 3;
  fill: $color-midwhite;
  transition: all 0.15s ease-in-out;
  opacity: 1;
  transform: scale(1.5);
}

$w: 820;

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 11;
  perspective: 900px;
}

.modal .app-logo {
  display: flex;
  position: absolute;
  top: vw(60);
  left: vw(60);
  width: auto;
  height: vw(45);
  align-items: center;
  user-select: none;
  color: $color-white;
  @include fluid-type(18px, 32px);

  @include bp(mobile) {
    height: 32px;
    font-size: 24px;
  }
}

.video-frame {
  perspective: 900px;
  position: relative;
  width: vw($w);
  height: vw($w / 1.777);
  margin: 0 auto 0;
  display: block;
  transform-style: preserve-3d;
  z-index: 2;
  iframe {
    background: darken($color-brown, 5%);
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0;
    display: block;
  }

  @include bp(mobile) {
    width: 100%;
    min-height: 210px;
    height: auto;
  }
}

.video-playlist {
  position: absolute;
  top: 0;
  right: vw(-120);
  width: vw(120);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translate3d(0px, 0px, 0px) rotateY(-75deg);

  @include bp(mobile) {
    left: 0;
    right: 0;
    height: auto;
    bottom: 0;
    top: initial;
    transform: translate3d(0px, calc(100% + 30px), 0px) rotateY(0deg)
      rotateX(0deg) !important;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    width: 90% !important;
    margin: auto;
  }
}

.video-playlist-item {
  position: relative;
  width: inherit;
  height: vw(65);
  margin-bottom: vw(5);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-primary;
  cursor: pointer;
  @include bp(mobile) {
    height: 56px;
  }

  * {
    pointer-events: none;
  }

  .app-icon.play {
    transform: scale(1);
    fill: white;
    opacity: 0;
    transition: all 0.15s ease-in-out;
  }
}

.video-playlist-item img {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  opacity: 0.9;
  transition: all 0.15s ease-in-out;
}

@media (hover: hover) {
  .video-playlist-item:hover {
    .app-icon.play {
      opacity: 1;
    }
    img {
      opacity: 0.3;
    }
  }
}

.video-playlist-item.active {
  &::before {
    content: '';
    @include max-area;
    border: 3px solid $color-white;
  }
  .app-icon.play {
    opacity: 1;
  }
  img {
    opacity: 0.3;
  }
}

.modal .bg {
  background: $color-brown;
  @include max-area;
  z-index: 0;
  overflow: hidden;
  .bg-pattern {
    --overflow: -10vw;
    position: absolute;
    top: var(--overflow);
    right: var(--overflow);
    bottom: var(--overflow);
    left: var(--overflow);
    background: url('../assets/images/pattern-clouds.gif') 50% 50%/50% auto
      repeat;
    mix-blend-mode: color-dodge;
    opacity: 0.03;
  }
}

div.close {
  position: absolute;
  left: 0;
  right: 0;
  top: -10vh;
  display: flex;
  width: vw(48);
  height: vw(48);
  margin: auto;
  align-items: center;
  justify-content: center;
  border: 3px solid lighten($color-brown, 10%);
  border-radius: 50%;
  cursor: pointer;
  outline: none;

  @include bp(mobile) {
    width: 48px;
    height: 48px;
    top: -20vh;
  }

  &:focus {
    border: 2px solid lighten($color-primary, 0%);
  }

  svg.circle {
    overflow: visible;
    position: absolute;
    fill: none;
    stroke: $color-gold;
    stroke-width: 2;
    width: inherit;
    height: inherit;
    transform: scale(1);
    stroke-dashoffset: 160;
    stroke-dasharray: 160;
    stroke-linecap: round;
    transition: all 0.3s ease-in-out;
  }

  @media (hover: hover) {
    &:hover svg.circle {
      stroke: $color-primary;
      stroke-dashoffset: 0;
      stroke-dasharray: 160;
    }
  }
}

.app-icon.close {
  position: absolute;
  cursor: pointer;
  width: vw(24);
  height: auto;
  fill: $color-primary;
  @include bp(mobile) {
    width: 24px;
  }
}

.modal-title {
  margin: vw(30) auto 0;
  width: vw($w);
  color: $color-offwhite;
  line-height: 1.5;
  position: relative;
  z-index: 2;
  display: none;
}

.press .haze {
  position: absolute;
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: $color-white;
}

.press .haze.left {
  left: -10%;
  width: vw(250);
  top: 50%;
  opacity: 0.5;
  z-index: 0;
  @include bp(tablet) {
    left: 12%;
    top: 28%;
  }
}

.press .haze.right {
  top: 50%;
  right: 5%;
  width: vw(450);
  z-index: 1;
  opacity: 0.5;
  z-index: 0;
}
</style>
