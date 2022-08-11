export default {
  name: `map-link`,
  props: {
    address: {
      type: Object,
      default() {
        return {
          street: '4255 W. 3rd St',
          city: 'Los Angeles',
          zip: '90020'
        }
      }
    }
  },
  render(h) {
    const { mapLink, address } = this
    const defaultText = `${address.street} ${address.city} ${address.zip}`
    return h(
      'a',
      {
        class: 'map-link link',
        attrs: {
          target: '_blank',
          href: mapLink(address)
        }
      },
      !this.$slots.default ? defaultText : this.$slots.default
    )
  },
  methods: {
    mapLink({ street, city, zip }) {
      const { concatString } = this
      return `https://www.google.com/maps/place/${concatString(
        street
      )}+${concatString(city)}+${concatString(zip)}/`
    },
    concatString(s = '') {
      return s.toString().replace(/\W/g, '+')
    }
  }
}
