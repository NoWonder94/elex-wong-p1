// import colors from 'vuetify/es5/util/colors';
import webpack from 'webpack';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // titleTemplate: '%s - ' + "Bet.app",
    // title: "Bet.app",
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
      { hid: 'icon', rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      // {
      //   src: 'https://static.zdassets.com/ekr/snippet.js?key=86ef15e9-1912-4005-80c2-e0ba2af19c68',
      //   id: 'ze-snippet',
      //   body: true,
      // },
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
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/main.js', mode: 'client' },
    { src: '~/plugins/route.js', mode: 'client' },
    { src: '~/plugins/filters.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    'nuxt-route-meta',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US'
      },
      {
        code: 'pt',
        name: 'Portuguese',
        iso: 'pt-BR'
      },
      {
        code: 'es',
        name: 'Spanish',
        iso: 'es-PY'
      }
    ],
    defaultLocale: 'pt',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        pt: require('./lang/portuguese.js'),
        en: require('./lang/english.js'),
        es: require('./lang/spanish.js'),
      }
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3
    //     }
    //   }
    // }
    defaultAssets: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    },
  },
}
