const gloablConfig = require('./global.config')
const devMode = process.env.NODE_ENV !== 'production'
const baseURL = devMode
  ? 'http://localhost:5001/zzamong-restaurant/us-central1/api/'
  : 'https://us-central1-zzamong-restaurant.cloudfunctions.net/api/'
const {
  title,
  description,
  keyWords,
  themeColor,
  wwwUrl,
  ogImage
} = gloablConfig

export default {
  mode: 'universal',
  server: {
    port: 6969 // default: 3000
  },
  /*
   ** Headers of the page
   */
  head: {
    title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { name: 'keywords', content: keyWords.join(', ').toLowerCase() },

      { property: 'fb:app_id', content: '497834560883545' },
      { property: 'og:site_name', content: title },
      { property: 'og:image', content: ogImage, hid: 'og:image' },
      { property: 'og:image:width', content: '1440' },
      { property: 'og:image:height', content: '900' },
      { property: 'og:title', content: title, hid: 'og:title' },
      {
        property: 'og:description',
        content: description,
        hid: 'og:description'
      },
      { property: 'og:url', content: wwwUrl, hid: 'og:url' },
      { property: 'og:type', content: 'website' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: '/scripts/DrawSVGPlugin.js' },
      { src: '/scripts/SplitText.js' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: themeColor
  },
  /*
   ** Global CSS
   */
  css: ['~/styles/index.scss'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL
  }
}
