<template>    
    <section class='footer' data-id='social'>
        <figure class='bg'>
            <div class='bg-pattern'/>
        </figure>
        <InstaPolaroids @atEnd='animateIcons'/>
        <AppFooter ref='footer'/>
    </section>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
import InstaPolaroids from '@/components/InstaPolaroids.vue'
import {TweenMax} from 'gsap'

export default {
    name: 'section-footer',
    components: {
        AppFooter,
        InstaPolaroids
    },
    methods: {
        animateIcons() {
            const icons = Array.from(this.$refs.footer.$el.querySelectorAll('.icon-link'))    
            const {$el} = this

            icons.forEach((icon, idx) => {
                
                $el.classList.add('animating')
                
                TweenMax.fromTo(icon, 0.3, {
                    y: '0%',
                    ease: Circ.easeInOut
                }, {
                    y: '-120%',
                    delay: idx * 0.05,
                    ease: Power4.easeInOut,
                    onComplete() {
                        TweenMax.to(icon, 1, {
                            y: '0%',
                            ease: Sine.easeInOut
                        })
                        
                        $el.classList.remove('animating')
                    }
                })
            })
        }
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

section.footer {
    position: relative;
    background: $color-offwhite;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: vw(100);
    padding-bottom: w(var(--app-footer-height));
    min-height: 80vh;
    @include bp(tablet) {
        min-height: 100vh;
    }
    @include bp(mobile) {
        padding-top: 60px;
    }
}

.footer .app-footer {
    z-index: 2;
    color: $color-offwhite;
}

.footer.animating .app-icon {
    animation: zcolor-change-2 0.3s ease-out;
}

.footer .bg {
    background: $color-brown;
    @include max-area;
    z-index: 0;
    overflow: hidden;
    .bg-pattern {
        @include max-area;
        background: url('../assets/images/pattern-clouds.gif') 50% 50%/50% auto repeat;
        mix-blend-mode: color-dodge;
        opacity: 0.03;
    }

    .bg-pattern.parallax-element {
        bottom: -50%;
    }
}


</style>