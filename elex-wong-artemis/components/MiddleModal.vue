<template>
  <transition name="fade">
    <div class="modal-overlay">
      <div class="modal-body p-3" :style="maxHeight">
        <slot />
      </div>
      <div v-if="isCloseButton" class="close">
        <i class="el-icon-circle-close" @click="handleCloseModal"></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MiddleModal",
  props: {
    isCloseButton: {
      type: Boolean,
      default: true,
    },
    maxHeight: String,
  },
  methods: {
    handleCloseModal() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(31, 31, 31, 0.5);
  // background-color: transparent;
  z-index: 9999;

  .modal-body {
    position: relative;
    width: 90vw;
    border-radius: 10px;
    background-color: #ffffff;
    // background: transparent;
    z-index: 9999;
  }

  .close {
    position: relative;
    top: 15px;
    right: 0;
    left: 0;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;
    z-index: 9999;

    i {
      font-size: 30px;
      color: #ffffff;
    }
  }
}

@media only screen and (min-width: 700px) {
  .modal-body {
    position: relative;
    width: 500px !important;
    max-height: 450px !important;
    border-radius: 10px;
    background-color: #ffffff;
    // background: transparent;
    z-index: 9999;
  }
}
</style>
