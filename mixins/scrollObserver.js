export function observer ({
    target,
    isVisible = () => { },
    hasExited = () => { }
}) {
    let options = {
        rootMargin: '0px',
        threshold: Array.from({ length: 100 }, (_, i) => i / 100)
    }
    let callback = (entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio
            const { top } = entry.intersectionRect
            const shouldPlay = ratio > 0 && top >= 0
            const shouldStop = ratio === 0 && top === 0
            if(shouldPlay) {
                isVisible.call(entry.target, ratio)
            }
            else if(shouldStop) {
                hasExited.call(entry.target)
            }
        })
    }
    let observer = new IntersectionObserver(callback, options)
    observer.observe(target)
}

export default {
    computed: {
        activeId () {
            return this.$store.getters.activeId
        }
    },
    data () {
        return {
            hasAnimatedOnce: false,
            tl: null,
        }
    },
    watch: {
        activeId (val) {
            if(val === 'home') {
                this.hasAnimatedOnce = false
                this.tl.progress(0).pause()
            }
        }
    },
    methods: {
        scrollObserver (element = this.$el) {
            const observer = new IntersectionObserver(this.onObserve, {
                rootMargin: '0px',
                threshold: Array.from({ length: 100 }, (_, i) => i / 100)
            });
            observer.observe(element);
        },
        onObserve (entries, observer) {
            entries.forEach(entry => {
                const ratio = entry.intersectionRatio;
                const { top } = entry.intersectionRect;
                const shouldPlay = ratio > 0 && top >= 0;
                const shouldStop = ratio === 0 && top === 0;
                if(shouldPlay) {
                    this.tl.play();
                }
                else if(shouldStop) {
                    // this.tl.pause(0)
                }
            })
        }
    },
    mounted () {
        this.scrollObserver();
        this.tl = this.animateSection();
    }
}