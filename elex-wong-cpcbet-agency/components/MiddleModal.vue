<template>
  <transition name="fade">
    <div class="modal-overlay">
      <div class="modal">
        <div class="close" @click="handleCloseModal">
          <img class="close-img" src="../assets/img/wrong.svg" />
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MiddleModal",
  transition: "pop",
  methods: {
    handleCloseModal() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/middleModal.scss";
@import "/assets/scss/mobile/middleModal.scss";
</style>
