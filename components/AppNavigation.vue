<template>
    <nav class='app-navigation' :class='{ "active-menu": isMobileMenuActive }'>
        <a class='logo' ref='logo' data-id='home' href='#home' @click='onLinkClick'>
            <AppLogo/>
            <!-- <p ref='loadingText' v-if='!$store.getters.isPageReady'>
                <span v-for='(message, idx) in loadingMessages' v-show='idx === loadingMessageIndex' :key='message'>{{message}}</span>
            </p> -->
        </a>
        <AppIcon type='menu' @click.native='isMobileMenuActive = !isMobileMenuActive'/>
        <div class='app-links' ref='links'>
            <AppIcon 
                type='corner' 
                :class='{[corner]: true}' 
                v-for='corner in ["top", "right", "bottom", "left"]' 
                :key='corner'/>
            <h2 class='app-link-logo'>
                <a data-id='home' href='#home' @click='onLinkClick'>Zzamong</a>
            </h2>
            <a class='app-link'
            :class='{active: link.id === activeId}'
            :data-id='link.id' 
            @click='onLinkClick'
            :href='"#" + link.id'
            v-for='link in pages' 
            v-html='link.text'
            :key='link.id'/>
            <AppIcon type='close' @click.native='isMobileMenuActive = false'/>
        </div>
    </nav>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue'
import AppLogo from '@/components/AppLogo.vue'
import { TweenMax, Power4, TimelineMax } from 'gsap'
import scrollTo from '@/utils/scrollTo';

export default {
    name: 'app-navigation',
    components: {
        AppIcon,
        AppLogo
    },
    computed: {
        activeId() {
            return this.$store.getters.activeId
        }
    },
    data() {
        return {
            isMobileMenuActive: false,
            loadingMessages: [
                'Preparing the menu...',
                'Heating the pans...',
                'Getting the noodles...'
            ],
            loadingMessageIndex: 0
        }
    },
    props: {
        pages: {
            type: Array,
            default() {
                return [
                    { id: 'menu', text: 'Menu' },
                    { id: 'location', text: 'Location' },
                    { id: 'about', text: 'About Us' },
                    { id: 'press', text: 'Press' }
                ]
            }
        }
    },
    methods: {
        onLinkClick(event) {
            event.preventDefault()
            this.scrollToSection(event.target.dataset.id)
            this.isMobileMenuActive = false
        },
        scrollToSection(id = 'home') {
            const onComplete = () => this.$store.commit('SET_SECTION_ID', id);
            const targetSection = document.querySelector(`section[data-id='${id}']`);
            const y = !targetSection ? 0 : targetSection.offsetTop;
            
            scrollTo({
                yPos: y,
                duration: 0.6,
                onComplete
            });
        },
        observeSections() {
            const sections = document.querySelectorAll('section[data-id]')
            Array.from(sections).forEach(section => this.observeSection(section))
        },
        observeSection(section) {
            const observer = new IntersectionObserver(this.onObserve, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            })
            observer.observe(section)
        },
        onObserve(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const {id} = entry.target.dataset
                    this.$store.commit('SET_SECTION_ID', id)
                }
            })
        },
        initScrollSection() {
            this.scrollToSection(this.activeId)
        },
        // loadingAnimation() {

        //     const {$store, $el, $refs} = this;
        //     const {logo, links} = $refs;
        //     const cook = logo.querySelector('.logo-cook');
        //     const letters = logo.querySelector('.logo-lettering');
        //     const type = logo.querySelector('.app-logo-type');
        //     const logoType = new SplitText(type);
        //     const loadingMessages = Array.from(this.$refs.loadingText.children).map(message => new SplitText(message));
        //     const masterTL = new TimelineMax();
        //     const loadingTextTL = new TimelineMax({  repeat: -1 });
        //     const changeLayoutTL = new TimelineMax({ paused: true });
        //     const navLinks = document.querySelectorAll('.app-link');
        //     const navHeight = $el.clientHeight;

        //     const logoTL = new TimelineMax()
        //     .fromTo(cook, 0.6, {
        //         autoAlpha: 0
        //     }, {
        //         autoAlpha: 1,
        //         ease: Power4.easeOut
        //     }, 0)
        //     .fromTo(cook, 1.15, {
        //         x: -window.innerWidth * 0.25
        //     }, {
        //         x: 0,
        //         ease: Back.easeOut.config(0.55)
        //     }, 0)
        //     .fromTo(letters, 0.6, {
        //         autoAlpha: 0
        //     }, {
        //         autoAlpha: 1,
        //         ease: Sine.easeOut
        //     }, 0)
        //     .fromTo(letters, 1.15, {
        //         scale: 3,
        //         transformOrigin: '50% 50%'
        //     }, {
        //         scale: 1,
        //         ease: Bounce.easeOut
        //     }, 0)

        //     .add('logoType', 0.5)
        //     .staggerFromTo(logoType.chars, 0.6, {
        //         autoAlpha: 0,
        //     }, {
        //         autoAlpha: 1,
        //         ease: Power4.easeOut
        //     }, 0.05, 'logoType')

        //     .staggerFromTo(logoType.chars, 1.15, {
        //         x: 20,
        //     }, {
        //         x: 0,
        //         ease: Power4.easeOut
        //     }, 0.05, 'logoType')

        //     // Loading Text Timeline
        //     loadingTextTL.add('loadingText', 0.65);

        //     loadingMessages.forEach(message => {
        //         loadingTextTL
        //         .staggerFromTo(message.chars, 0.6, {
        //             autoAlpha: 0,
        //         }, {
        //             autoAlpha: 1,
        //             ease: Power4.easeOut
        //         }, 0.035, 'loadingText')
        //         .staggerFromTo(message.chars, 1.15, {
        //             x: 20,
        //         }, {
        //             x: 0,
        //             ease: Power4.easeOut
        //         }, 0.035, 'loadingText')
        //         .staggerTo(message.chars, 0.3, {
        //             autoAlpha: 0,
        //             ease: Power4.easeIn
        //         }, 0.025, 'loadingText+=1.15')
        //     });
            
        //     // Here because it never really ends until this animation
        //     loadingTextTL.to(this, 0, {
        //         onComplete: this.onLoadingPageComplete.bind(null, { changeLayoutTL, loadingTextTL }) 
        //     });

        //     // Change Layout Timeline

        //     changeLayoutTL.to(logo, 0.6, { 
        //         autoAlpha: 0,
        //         ease: Power4.easeOut
        //     }, 0)
        //     .to(logo, 0.6, { 
        //         y: '-25%',
        //         ease: Power4.easeIn
        //     }, 0)
            
        //     .to($el, 1, {
        //         height: navHeight,
        //         ease: Power4.easeInOut,
        //         onComplete() {
        //             $el.style = null
        //             $el.classList.remove('is-loading')
        //         }
        //     }, 0.3)
        //     .to(logo, 1, {
        //         autoAlpha: 1,
        //         y: '0%',
        //         ease: Power4.easeOut,
        //         onComplete() {
        //             const article = document.querySelector('article.index')
        //             TweenMax.to(article, 1, {
        //                 backgroundColor: '#eee7d6'
        //             })
        //         }
        //     }, 2.15)
        //     .staggerFromTo(navLinks, 1, {
        //         autoAlpha: 0,
        //         y: '100%'
        //     }, {
        //         autoAlpha: 1,
        //         y: '0%',
        //         ease: Power4.easeOut
        //     }, 0.1, 2.15);

        //     masterTL
        //     .add(logoTL)
        //     .add(loadingTextTL, 0.5)

        //     return masterTL
        // },
        onLoadingPageComplete({loadingTextTL, changeLayoutTL}) {
            // This check if the loading has completed, 
            // if not then it keeps repeating, loading id one on the index
            if (this.$store.state.pages) {
                changeLayoutTL.play()
                loadingTextTL.pause()
            }
            this.nextLoadingMessage()
        },
        nextLoadingMessage() {
            this.loadingMessageIndex = this.loadingMessageIndex === this.loadingMessages.length - 1 ? 0 : this.loadingMessageIndex + 1
        }
    },
    mounted() {
        // this.loadingAnimation()
        require('gsap/ScrollToPlugin');
        this.$nextTick(() => this.observeSections());
        setTimeout(() => this.initScrollSection(), 500);
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

:root {
    --nav-height: 80;
    @include bp(tablet) {
        --nav-height: 100;
    }
    @include bp(mobile) {
        --nav-height: 60;
    }
}

.app-navigation {
    color: inherit;
    display: flex;
    align-items: center;
    padding: 0 vw(30);
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: vw(var(--gutter));
    right: vw(var(--gutter));
    background: $color-white;
    height: vw(var(--nav-height));
    z-index: 10;
    max-width: 100vw;
    box-shadow: 0 1px 2px rgba(black, 0.15);
    transition: height 1s ease-in-out;
    @include bp(mobile) {
        left: 0; right: 0;
    }

    .app-icon.menu {
        stroke: $color-brown;
        stroke-width: 2;
        position: relative;
        z-index: 1;
        margin-right: 15px;
        cursor: pointer;
        display: none;
        transition: all 0.6s linear;

        @include bp(mobile) {
            display: block;
        }
    }
}

.app-navigation .logo {
    display: flex;
    width: auto;
    height: vw(45);
    align-items: center;
    user-select: none;
    color: $color-brown;
    @include fluid-type(18px, 32px);
    transition: color 0.15s ease-in-out;
    
    &:focus {
        color: $color-primary;
    }
    @include bp(tablet) {
        width: auto;
        height: 45px;
    }

    @include bp(mobile) {
        width: auto;
        height: 35px;
        .app-logo-type {
            font-size: 24px;
        }
    }
}    

.app-navigation .app-links {
    height: 100%;
    display: flex;
    align-items: center;

    
    @include bp(mobile) {
        top: 0; left: 0;
        width: 100vw;
        height: 100vh;
        position: fixed;
        background: $color-red;
        flex-direction: column;
        color: $color-white;
        align-items: center;
        justify-content: center;
        transform: translate3d(100%, 0, 0);
        transition: transform 0.3s ease-in;
        z-index: 9001;
        
        &::before {
            content: '';
            @include max-area;
            background: url('../assets/images/pattern-clouds.gif') 50% 50%/50% auto repeat;
            mix-blend-mode: overlay;
            opacity: 0.1;
            z-index: -1;
            pointer-events: none;
        }
    }

    .app-icon {
        display: none;
        stroke: $color-brown;
        @include bp(mobile) {
            display: block;
        }
    }

    .app-link-logo {
        text-align: center;
        font-family: $font-headline;
        font-weight: normal;
        color: $color-white;
        display: none;
        @include bp(mobile) {
            display: block;
        }
    }

    .app-icon.close {
        fill: $color-gold;
        stroke: $color-gold;
        margin: 30px 0;
        display: none;
        border-radius: 50%;
        border: 2px solid rgba($color-gold, 0.3);
        transform: scale(1.5);

        g {
            transform-origin: center;
            transform: scale(0.5);
        }
        @include bp(mobile) {
            display: block;
        }
    }
}

.app-navigation.active-menu .app-links {
    transform: translate3d(0%, 0, 0);
    transition: transform 0.3s ease-out;
}

.app-navigation a.app-link {
    display: flex;
    align-items: center;
    height: inherit;
    text-transform: capitalize;
    margin-right: vw(60);
    position: relative;
    z-index: 1;
    transition: color 0.15s ease-in-out;
    &::before {
        content: '';
        position: absolute;
        top: 25%; 
        bottom: 25%; 
        left: -30%;
        right: -30%; 
        border-radius: 6px;
        background: $color-midwhite;
        opacity: 0;
        border: 1px solid $color-midwhite;
        transition: opacity 0.15s ease-in-out;
        z-index: -1;
        @include bp(mobile) {
            top: 0;
            bottom: 0;
            background: $color-brown;
            border: none;
        }
    }

    @media (hover: hover) {
        &:hover {
            color: $color-primary;
        }
    }
    
    @include bp(mobile) {
        height: auto;
        display: inline-block;
        @include base-font(h3);
        color: $color-white; 
        margin: 15px 0;
    }
}

.app-navigation a.app-link.active::before {
    opacity: 1;
}

.app-navigation a.app-link:focus::before {
    opacity: 0.5;
}

// The Loading state of the nav, it set to look like a loader, while the 
// HTTP request goes out and fetched data

.app-navigation.is-loading {
    height: calc(100vh - #{vw(100)});
    justify-content: center;

    .app-icon.menu {
        opacity: 0;
        display: none;
    }
    
    .app-links {
        display: none;
    }

    a.logo {
        pointer-events: none;
        cursor: default;
        display: flex;
        flex-direction: column;
        height: auto;
    }

    .app-logo {
        @include base-font(h2);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        .app-logo-img {
            height: vw(120);
            width: 100%;
            object-fit: contain;
            margin-bottom: vw(5);
            @include bp(tablet) {
                margin-bottom: 15px;
            }
            @include bp(mobile) {
                margin-bottom: 10px;
            }
        }
    }
}

</style>
