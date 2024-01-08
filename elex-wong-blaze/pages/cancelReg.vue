<template>
  <div class="cancelreg">
    <div class="cancelreg-modal-overlay" @click="closeModal('close')">
      <div class="cancelreg-modal web" @click.stop>
        <div class="header">
          <i class="el-icon-close" @click="closeModal('close')"></i>
        </div>
        <div class="body">
          <div class="title">
            {{ $tt("are_you_sure_want_to_cancel") }}
          </div>
          <!-- <div class="text">{{ $tt("rewards_await") }}</div> -->
          <div class="submitBtn" @click="closeModal('continue')">Continue</div>
        </div>
        <div class="footer">
          <div class="text" @click="closeModal('close')">
            <el-link :underline="false" type="info">{{
              $tt("i_want_to_cancel")
            }}</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CancelReg",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    closeModal(action) {
      this.$emit("close-modal", action);
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/cancelreg.scss";
@import "/assets/scss/mobile/cancelreg.scss";
</style>
