<template>
  <transition name="slideUp">
    <div class="actionModal">
      <div
        :class="
          isTransparentBg
            ? 'actionModal-empty-space-tranparent'
            : 'actionModal-empty-space'
        "
        @click="handleCloseModal"
      ></div>
      <div class="actionModal-container">
        <!-- add on action -->
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ActionModal",
  transition: "slideUp",
  props: {
    isTransparentBg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleCloseModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/actionModal.scss";
@import "/assets/scss/mobile/actionModal.scss";
</style>
