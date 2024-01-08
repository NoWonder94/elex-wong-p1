import colors from 'vuetify/es5/util/colors';
import webpack from 'webpack';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Boss Sci',
    title: 'Boss Sci',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'https://boss-sci.oss-ap-southeast-6.aliyuncs.com/web3.min.js',
        body: true,
      },
      {
        type: 'text/javascript',
        src: 'https://boss-sci.oss-ap-southeast-6.aliyuncs.com/abis.js',
        body: true,
      },
      {
        type: 'text/javascript',
        src: 'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js',
        body: true,
      },
      {
        type: 'text/javascript',
        src: 'https://unpkg.com/dayjs@1.8.20/plugin/customParseFormat.js',
        body: true,
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/bootstrap.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/main.js', mode: 'client' },
    { src: '~/plugins/route.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: ['en', 'cn', 'ft', 'ar', 'de', 'es', 'fr', 'hi', 'id', 'it', 'ja', 'ko', 'la', 'pt', 'ru', 'sr', 'th', 'vi'],
    defaultLocale: 'cn',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./lang/english.js'),
        cn: require('./lang/chinese.js'),
        ft: require('./lang/ft.js'),
        ar: require('./lang/AR.js'),
        de: require('./lang/DE.js'),
        es: require('./lang/ES.js'),
        fr: require('./lang/FR.js'),
        hi: require('./lang/HI.js'),
        id: require('./lang/ID.js'),
        it: require('./lang/IT.js'),
        ja: require('./lang/JA.js'),
        ko: require('./lang/KO.js'),
        la: require('./lang/LA.js'),
        pt: require('./lang/PT.js'),
        ru: require('./lang/RU.js'),
        sr: require('./lang/SR.js'),
        th: require('./lang/TH.js'),
        vi: require('./lang/VI.js'),
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
  }
}
