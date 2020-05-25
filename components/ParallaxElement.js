export default {
    name: 'parallax-element',
    inject: ['parallaxContainer'],
    props: {
        tag: {
            default: 'div'
        },
        factor: {
            default: -0.25,
            type: Number,
        },
        compensate: {
            type: Boolean,
            default: true
        },
        top: {
            type: [Number, Boolean],
            default: 0
        }
    },
    render(h) {
        const { tag, offset, $slots, parallaxContainer, factor } = this
        const height = this.compensate ? `calc(100% + ${Math.abs(factor * parallaxContainer.height)}px)` : null;
        const top = Math.abs(factor * parallaxContainer.height / 2) + this.top;
        return h(tag, {
            style: {
                height,
                willChange: 'transform',
                transform: `translate3d(0, ${offset}px, 0)`,
                top: typeof this.top === 'number' ? this.factor >= 1 ? `-${top}px` : `${top}px` : false
            }
        }, $slots.default)
    },
    computed: {
        offset() {
            const { height, scrollFactor } = this.parallaxContainer
            // The offset is relative to the height of
            // the element. This means, if the factor is
            // 0.5, the element is moved half its height
            // over the scroll distance of the viewport.
            const offset = scrollFactor * height * this.factor
            return offset
        }
    }
}