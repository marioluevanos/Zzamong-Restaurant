<template>
    <ParallaxContainer tag='section' class='hero' data-id='home' style='opacity: 0'>
        <figure class='hero-bg' ref='bg'>
            <ParallaxElement tag='img' :src='hero.image' alt='Background Image' :factor='-0.5'/>
        </figure>
        <ParallaxElement class='hero-content' ref='heroContent' :factor='0'>
            <h1 class='hero-title' v-html='hero.title' ref='title'/>
            <p class='hero-subtext' v-html='hero.subtext' ref='subText'/>
            <div class='hero-cta flex-row' ref='cta'>
                <a class='hero-cta-btn' tabindex='-1' :href='hero.button1URL' target='_blank' rel='noopener'>
                    <AppButton>{{hero.button1Text}}</AppButton>
                </a>
                <AppButton class='hero-cta-btn primary' :onButtonClick='scrollToMenu'>
                    <span v-html='hero.button2Text'/> 
                </AppButton>
            </div>
        </ParallaxElement>
        <AppFooter ref='footer'/>
    </ParallaxContainer>
</template>
<script>

import AppIcon from '@/components/AppIcon.vue'
import AppButton from '@/components/AppButton.vue'
import AppFooter from '@/components/AppFooter.vue'
import MapLink from '@/components/MapLink'
import ParallaxContainer from '@/components/ParallaxContainer'
import ParallaxElement from '@/components/ParallaxElement'
import {TweenMax, Power4} from 'gsap'

export default {
    name: 'section-hero',
    components: {
        AppIcon,
        AppButton,
        AppFooter,
        ParallaxContainer,
        ParallaxElement,
        MapLink
    },
    computed: {
        hero() {
            return this.$store.getters.home;
        }
    },
    methods: {
        animateSection() {
            const title = new SplitText(this.$refs.title, { type: 'chars words' })
            const subText = new SplitText(this.$refs.subText)
            return new TimelineMax()
            .to([this.$el, this.$refs.heroContent.$el], 0.3, { 
                opacity: 1, 
                ease: Power3.easeOut
            }, 0)

            .fromTo(this.$refs.bg, 1, {
                clipPath: 'inset(100% 0 0 0)',
            }, {
                clipPath: 'inset(0% 0 0 0)',
                ease: Sine.easeIn
            }, 0)

            .fromTo(this.$refs.bg.firstElementChild, 1, {
                autoAlpha: 0,
            }, {
                autoAlpha: 1,
                ease: Sine.easeOut
            }, 0)
            .fromTo(this.$refs.bg, 1, {
                scale: 1.4,
            }, {
                scale: 1,
                ease: Sine.easeOut
            }, 0.3)
            .fromTo(this.$refs.bg.firstElementChild, 1, {
                filter: 'blur(10px)',
            }, {
                filter: 'blur(0px)',
                ease: Sine.easeOut
            }, 0.3)

            .add('title', 1)
            .staggerFromTo(title.chars, 0.3, {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
                ease: Power4.easeOut
            }, 0.025, 'title')
            .staggerFromTo(title.chars, 3, {
                x: 30
            }, {
                x: 0,
                ease: Power4.easeOut
            }, 0.025, 'title')

            .staggerFromTo(subText.chars, 0.3, {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
                ease: Power4.easeOut
            }, 0.05, 'title+=0.3')
            .staggerFromTo(subText.chars, 3, {
                x: 30
            }, {
                x: 0,
                ease: Power4.easeOut
            }, 0.05, 'title+=0.3')

            .staggerFromTo(this.$refs.cta.children, 0.6, {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
                ease: Power4.easeOut
            }, 0.1, 'title+=0.8')
            .staggerFromTo(this.$refs.cta.children, 3, {
                x: 30
            }, {
                x: 0,
                ease: Power4.easeOut
            }, 0.1, 'title+=0.8')

            .add('ends', 1.15)
            .fromTo(this.$refs.footer.$el, 2, {
                y: '100%',
            }, {
                y: '0%',
                ease: Power3.easeOut
            }, 'ends')

        },
        scrollToMenu() {
            const menu = document.querySelector('section.menu')
            TweenMax.to(window, 0.6, {
                scrollTo: {
                    y: menu.offsetTop
                },
                ease: Power4.easeInOut
            })
        },
    },
    mounted() {
        this.animateSection();
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

.hero {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    z-index: 2;
    display: flex;
    align-items: center;
    @include bp(mobile) {
        background: $color-offwhite;
    }
}

.hero-bg {
    position: absolute;
    top: 0; 
    right: 0; 
    bottom: w(var(--app-footer-height)); 
    width: 100%;
    left: 0;
    background: $color-brown;
    overflow: hidden;
    z-index: 0;
    &:before {
        content: '';
        @include max-area;
        background-image: linear-gradient(180deg, rgba(86,34,7,0.00) 14%, rgba(43,15,3,0.70) 77%);
        z-index: 1;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    img.parallax-element {
        height: 155%;
    }
}
   
.hero .hero-title {
    width: 70%;
    @include bp(tablet) {
        width: auto;
    }
}

.hero-cta {
    display: flex;
    @include bp(mobile) {
        flex-direction: column;
        width: 100%;
        margin: 15px auto 0;
        button {
            width: 100%;
        }
    }
}

.hero-cta-btn {
    display: inline-block;
}

.hero-cta-btn:not(:last-child) {
    margin-right: vw(40);
    @include bp(mobile) {
        margin-bottom: 15px;
        margin-right: 0;
    }
}

.hero-side-message {
    position: absolute;
    right: 0;
    color: $color-brown;
    @include base-font(medium);
    writing-mode: tb;
    bottom: 0;
    top: 25%;
    text-align: center;
    width: vw(90);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
}

.hero-content {
    position: absolute;
    right: vw(90); 
    left: vw(90);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: vw(30) vw(90);
    color: $color-white;
    align-items: flex-start;

    opacity: 0; // removed with js
    @include bp(mobile) {
        bottom: w(var(--app-footer-height)); 
        left: 0;
        right: 0;
        padding: 30px;
    }
}

.hero-content.parallax-element {
    // top: 80%;
    @include bp(tablet) {
        top: initial;
    }
}

.hero-subtext {
    @include base-font(large);
    font-weight: 700;
    margin: vw(30) 0 vw(35);
    @include bp(tablet) {
        margin: 30px 0 35px;
    }
    @include bp(mobile) {
        margin: 15px 0;
    }
}

.hero .app-footer {
    .app-icon {
        fill: $color-brown;
        &:hover {
            fill: $color-primary;
        }
    }
    @include bp(mobile) {
        left: 0;
        right: 0;
    }
}

</style>
