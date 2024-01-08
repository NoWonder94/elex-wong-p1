<template>
  <div class="signout">
    <div class="signout-modal-overlay" @click="closeModal('close')">
      <div class="signout-modal" @click.stop>
        <div class="signout-modal-container">
          <div class="header">
            <i class="el-icon-close" @click="closeModal('close')"></i>
          </div>

          <div class="body">
            <div class="title">{{ $tt("are_you_sure_want_to_logout") }}</div>
            <div class="desc">
              {{ $tt("logout_reminder_1") }}
            </div>
            <div class="signoutBtn" @click="closeModal('logout')">
              {{ $tt("logout") }}
            </div>
          </div>
        </div>
        <div class="modal-image-container">
          <img
            class="modal-image"
            src="~/assets/img/signOutModalImage.svg"
            alt=""
          />
          <h1 class="modal-text">
            {{ $tt("logout_reminder_2") }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignOut",
  data() {
    return {};
  },
  methods: {
    closeModal(action) {
      this.$emit("close-modal", action);
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/signOut.scss";
@import "/assets/scss/mobile/signOut.scss";
</style>
