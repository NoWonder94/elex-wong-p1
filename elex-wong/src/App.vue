<template>
  <div id="app">
    <router-view/>
    <Footer />
  </div>
</template>
<script>
import Footer from './components/footer.vue'

export default {
  name: 'App',
  components:{
    Footer,
  }
}
</script>
<style>
#app {
  /* font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; */
  font-family: "Helvetica Neue",Helvetica, Arial, sans-serif;
  font-weight:300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
*{
  margin:0;
  padding:0;
}
</style>