export default {
    name: `parallax-container`,
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    },
    render (h) {
        return h(this.tag, { class: 'parallax-container' }, this.$slots.default)
    },
    provide () {
        return {
            parallaxContainer: this.data,
        }
    },
    data () {
        return {
            data: {
                height: 0,
                scrollFactor: 0,
                width: 0,
            }
        }
    },
    mounted () {

        const isPad = navigator.userAgent.match(/iPad/i) != null

        if(isPad) {
            Array.from(document.querySelectorAll('.parallax-element')).forEach(el => {

                if(el.classList.contains('haze') || el.classList.contains('cloud')) return
                el.style.top = 'initial'

            })
        }

        if(window.innerWidth <= 768 || isPad) return

        this.calcParallax()

        // Using a requestAnimationFrame() to update
        const eventHandler = () => requestAnimationFrame(this.calcParallax)
        window.addEventListener('resize', eventHandler)
        window.addEventListener('scroll', eventHandler)

        // Remove the scroll hanlder when the
        // component is destroyed.
        this.$on('hook:destroyed', () => {
            window.removeEventListener('resize', eventHandler)
            window.removeEventListener('scroll', eventHandler)
        })
    },
    methods: {
        calcParallax () {
            const containerRect = this.$el.getBoundingClientRect()

            this.data.height = containerRect.height
            this.data.width = containerRect.width

            const viewportOffsetTop = containerRect.top
            const viewportOffsetBottom = window.innerHeight - viewportOffsetTop

            this.data.scrollFactor = viewportOffsetBottom / (window.innerHeight + this.data.height)
        }
    }
}