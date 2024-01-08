<template>
  <div class="modal-overlay">
      <div class="modal">
        <div class="close" @click="handleCloseModal">
          <i class="el-icon-close"></i>
        </div>
        <slot />
      </div>
  </div>
</template>

<script>
  export default {
    name: "MiddleModal",
    methods: {
      handleCloseModal() {
        this.$emit("close");
      },
    },
  }
</script>

<style lang="scss" >
  @import "/assets/scss/pc/middleModal.scss";
</style>
