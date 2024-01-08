<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-content-item">
        <nuxt-link to="/"><b>Bit555.io </b></nuxt-link>
        © 2022
      </div>
      <div class="footer-content-item">
        <div
          class="footer-content-link"
          @click="openLink('https://bit555.io/i-58tcc4cf-n/')"
        >
          Bit555
        </div>
      </div>
      <div class="footer-content-item">
        <div
          class="footer-content-link"
          @click="openLink('https://ghost.org/')"
        >
          {{ $t("footer.powerby") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  methods: {
    openLink(link) {
      if (link != "") {
        window.open(link);
      }
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/footer.scss";
@import "/assets/scss/mobile/footer.scss";
</style>
