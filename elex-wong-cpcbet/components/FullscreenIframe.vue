<template>
  <div class="fullscreen-iframe">
    <div class="iframe-container">
      <iframe :src="url"></iframe>
      <button @click="close" class="close-button">X</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["url"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.fullscreen-iframe {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3147483639;
}

.iframe-container {
  position: absolute;
  top: 0;
  left: 0;
  /* transform: translate(-50%, -50%); */
  width: 100%;
  height: 100%;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: #fff;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  color: #000;
}
</style>
