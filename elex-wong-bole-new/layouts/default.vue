<template>
  <div class="default">
    <Header v-if="!this.$route.path.includes('/boleBitNew')" />
    <section>
      <Nuxt />
    </section>
    <ContactUsButton />
    <Footer v-if="!this.$route.path.includes('/boleBitNew')" />
  </div>
</template>
<script>
import ContactUsButton from "../components/ContactUs-Button.vue";
export default {
  name: "Default",
  components: { ContactUsButton },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/web/default.scss";
@import "/assets/scss/mobile/default.scss";
</style>
