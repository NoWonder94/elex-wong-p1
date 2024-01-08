<template>
  <div class="maintainence-components">
    <div class="maintainence-container">
      <div class="maintainence-content">
        {{ hostname }} <br />
        {{ $t("under_maintenance") }}
      </div>
      <div class="maintainence-refresh">
        <el-button
          icon="el-icon-refresh-right"
          class="reload-button"
          @click="reloadHost"
        >
          {{ $t("try_again") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MaintainenceComponents",
  data() {
    return {
      hostname: window.location.hostname,
    };
  },
  methods: {
    reloadHost() {
      window.showMaintaince && window.showMaintaince(false);
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.maintainence-components {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  color: white;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  background: #000;

  .maintainence-container {
    position: absolute;
    width: 50%;
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);

    .maintainence-content {
      font-size: 20px;
      line-height: 2;
    }

    .reload-button {
      margin-top: 20px;
      color: white;
      border: #f12c4c;
      font-weight: 700;
      background: #f12c4c;
    }
  }
}
</style>
