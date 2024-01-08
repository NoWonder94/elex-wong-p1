import colors from 'vuetify/es5/util/colors'
import webpack from 'webpack'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'BoleGaming',
    title: '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'BoleGaming Slots & Fishing - BoleBit - The Games for Next Gen' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-K7RYSQYYMT', defer: true },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K7RYSQYYMT');
          `,
        type: 'text/javascript',
        charset: 'utf-8',
      },
      // {
      //   innerHTML:`(function(w,d,u){
      //     var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
      //     var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
      //     })(window,document,'https://cdn.bitrix24.com/b20910445/crm/site_button/loader_1_opzo7y.js');`,
      //   type:'text/javascript',
      //   charset:'utf-8',
      // },
    ],
    __dangerouslyDisableSanitizers: ['script'],

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/main.js', mode: 'client' },
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
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: ['chi', 'en', 'indo', 'krn', 'jpn', 'thai','pt'],
    defaultLocale: 'chi',
    vueI18n: {
      fallbackLocale: 'chi',
      messages: {
        en: require('./lang/english.js'),
        chi: require('./lang/chinese.js'),
        indo: require('./lang/indo.js'),
        jpn: require('./lang/japanese.js'),
        krn: require('./lang/korean.js'),
        thai: require('./lang/thai.js'),
        pt: require('./lang/pt.js'),
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
      },
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
