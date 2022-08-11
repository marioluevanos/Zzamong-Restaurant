export default {
  name: 'parallax-element',
  inject: ['parallaxContainer'],
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    factor: {
      type: Number,
      default: -0.5
    },
    cssTop: {
      type: Boolean,
      default: false
    }
  },
  render(createElement) {
    if (this.parallaxContainer.error)
      return createElement(tag, { class: 'parallax-element' }, $slots.default)
    const { tag, offset, $slots, navHeight } = this

    // if mobile, no parallax effect
    const yPos = process.client ? (window.innerWidth <= 768 ? 0 : offset) : 0

    const transformStyle = { transform: `translate3d(0, ${yPos}px, 0)` }

    const parentHeight = this.parallaxContainer.height / 2
    const top = navHeight() + parentHeight * Math.abs(this.factor)
    const style = !this.cssTop
      ? transformStyle
      : Object.assign(transformStyle, { top: `${top}px` })

    return createElement(
      tag,
      { class: 'parallax-element', style },
      $slots.default
    )
  },
  computed: {
    offset() {
      const { height, scrollFactor } = this.parallaxContainer
      // The offset is relative to the height of
      // the element. This means, if the factor is
      // 0.5, the element is moved half its height
      // over the scroll distance of the viewport.
      return scrollFactor * height * this.factor
    }
  },
  methods: {
    navHeight() {
      if (process.client) {
        return document.querySelector('.app-navigation').clientHeight
      } else return 0
    }
  }
}
