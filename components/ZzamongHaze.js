import ParallaxElement from '@/components/ParallaxElement'
import { TweenMax } from 'gsap'

export default {
    name: 'zzamong-haze',
    components: {
        ParallaxElement
    },
    props: {
        factor: {
            type: Number,
            default: 0
        },
        colorFront: {
            type: String,
            default: '#EEE7D6'
        },
        colorBack: {
            type: String,
            default: '#FEFBF1'
        },
        movement: {
            type: Number,
            default: -100
        }
    },
    methods: {
        onMouseMove (event) {
            this.mouseParallax(event, this.$refs.svg, this.movement)
        },
        /**
         * @param {Object} event - Event object
         * @param {HTMLElement} target
         * @param {Number} movement
         * @param {Boolean} x - If "x" movement should be applied
         * @param {Boolean} y - If "y" movement should be applied
         */
        mouseParallax (event, target, movement, x = true, y = true) {
            const _x = event.clientX
            const _y = event.clientY
            if(target) {
                const xMove = x ? (_x - window.innerWidth / 2) / window.innerWidth * movement : 0
                const yMove = y ? (_y - window.innerHeight / 2) / window.innerHeight * movement : 0
                TweenMax.to(target, 0.6, {
                    x: xMove,
                    y: yMove,
                    ease: Sine.easeOut
                })
            }
        },
    },
    render (h) {
        const d = `M9.3,93.8h103c0,0,9.3,0,9.3,9.3c0,9.3-9.3,9.3-9.3,9.3H18.7c0,0-9.3,0-9.3,9.3
        c0,9.3,9.3,9.3,9.3,9.3h56.2c0,0,9.3,0,9.3,9.3c0,9.3-9.3,9.3-9.3,9.3H28.1c0,0-9.1,0.3-9.1,9.6c0,9.3,9.1,9.3,9.1,9.3h56.1
        c0,0,9.3,0,9.3,9.3c0,9.3-9.3,9.3-9.3,9.3h-9.3c0,0-9.3,0-9.3,9.3c0,9.3,9.3,9.3,9.3,9.3h65.6c0,0,9.3,0,9.3-9.3
        c0-9.3-9.3-9.3-9.3-9.3h-18.8c0,0-9.3,0-9.3-9.3c0-9.3,9.3-9.3,9.3-9.3h74.9c0,0,9.5,0,9.5-9.5c0-9.5-9.5-9.5-9.5-9.5h-74.9
        c0,0-9.3,0-9.3-9.3c0-9.3,9.3-9.3,9.3-9.3h93.7c0,0,8.9,0,9.3-9.3c0.4-9.3-9.3-9.3-9.3-9.3h-65.6c0,0-9.3,2-9.3-9.3
        c0-11.3,9.3-9.3,9.3-9.3h65.6c0,0,9.7-0.4,9.7-9.7c0-9.3-9.7-9.3-9.7-9.3H84.2c0,0-9.3,0-9.3-9.3c0-9.3,9.3-9.3,9.3-9.3H206
        c0,0,9.3,0,9.3-9.3c0-9.3-9.3-9.3-9.3-9.3H103c0,0-9.5,2-9.5-9.3c0-11.3,9.5-9.3,9.5-9.3h65.6c0,0,9.3-0.3,9.3-9.6
        c0-9.3-9.3-8.6-9.3-8.6L65.6,0c0,0-9.5,0-9.5,9.5s9.5,9.5,9.5,9.5s9.3,0,9.3,9.3c0,9.3-9.3,9.3-9.3,9.3H28.1c0,0-9.2,0-9.3,9.3
        c-0.1,9.3,9.3,9.3,9.3,9.3h18.7c0,0,9.3,0,9.3,9.3c0,9.3-9.3,9.3-9.3,9.3H9.3c0,0-9.3-0.3-9.3,9.3C0,93.8,9.3,93.8,9.3,93.8`

        const path = h('path', { attrs: { d } })

        const svg = h('svg', {
            attrs: { viewBox: '0 0 225 206' },
            ref: 'svg'
        }, [path])

        const { factor } = this

        return h(ParallaxElement, { class: 'zzamong-haze', props: { 
            factor,
            compensate: false,
            top: false
        } }, [svg])
    },
    mounted () {
        document.addEventListener('mousemove', this.onMouseMove, false)
    }
}

