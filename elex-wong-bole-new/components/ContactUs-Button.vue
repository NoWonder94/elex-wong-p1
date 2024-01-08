<template>
  <div class="contactUs-button">
    <div class="contactUs-button-web">
      <div class="contactUs-button-icon">
        <a href="mailto:Info@bolegaming.com" target="_blank"
          ><img src="~/assets/img/mail.png"
        /></a>
      </div>
      <div class="contactUs-button-icon">
        <a href="skype:live:bolegaming?chat" target="_blank"
          ><img src="~/assets/img/skype.png" />
        </a>
      </div>
      <div class="contactUs-button-icon">
        <a href="https://t.me/bolegaming" target="_blank"
          ><img src="~/assets/img/telegram.png" />
        </a>
      </div>
    </div>
    <div class="contactUs-button-mobile">
      <!-- single -->
      <div class="contactUs-button-mobile-tab" @click="handleContactNav">
        <img src="~/assets/img/cs.png" />
      </div>
      <!-- inside list -->
      <transition name="slide">
        <div class="contactUs-button-mobile-nav" v-if="isShowContactNav">
          <div class="contactUs-button-icon">
            <a href="mailto:Info@bolegaming.com" target="_blank"
              ><img src="~/assets/img/mail.png"
            /></a>
          </div>
          <div class="contactUs-button-icon">
            <a href="skype:live:bolegaming?chat" target="_blank"
              ><img src="~/assets/img/skype.png" />
            </a>
          </div>
          <div class="contactUs-button-icon">
            <a href="https://t.me/bolegaming" target="_blank"
              ><img src="~/assets/img/telegram.png" />
            </a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUsButton",
  data() {
    return {
      isShowContactNav: false,
    };
  },

  methods: {
    handleContactNav() {
      this.isShowContactNav = !this.isShowContactNav;
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/contactUs-button.scss";
@import "/assets/scss/mobile/contactUs-button.scss";
</style>
