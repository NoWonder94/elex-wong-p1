<template>
  <Header />
  <section>
    <router-view />
  </section>
  <Footer />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Upline } from './utils'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

@Options({
  components: {
    Header,
    Footer,

  },
})
export default class App extends Vue {
  
  mounted() {
    Upline.init();
  }
}
</script>
<style src="@/assets/css/app.css" scoped>
</style>