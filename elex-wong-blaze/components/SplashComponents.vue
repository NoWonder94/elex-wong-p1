<template>
  <div class="splashComponents">
    <!-- <div class="splash-body">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div> -->

    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "splashComponents",
  data() {
    return {
      pageTitle: window.location.hostname,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base.scss";
.splashComponents {
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

  /* animation 1 */
  // .splash-body {
  //   position: relative;
  //   margin: 0 auto;
  //   width: 50%;
  //   height: 100%;
  //   display: flex;
  //   overflow: hidden;
  //   align-items: center;
  //   padding: 40px;

  //   span {
  //     position: absolute;
  //     left: 0;
  //     width: 15px;
  //     height: 15px;
  //     background-color: white;
  //     filter: drop-shadow(0 0 10px white);
  //     border-radius: 50%;
  //     animation: notleft 3s ease infinite;

  //     &:nth-child(2) {
  //       animation-delay: 0.4s;
  //     }
  //     &:nth-child(3) {
  //       animation-delay: 0.5s;
  //     }
  //     &:nth-child(4) {
  //       animation-delay: 0.6s;
  //     }
  //     &:nth-child(5) {
  //       animation-delay: 0.7s;
  //     }
  //   }
  // }

  /* animation 2 */
  ul {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    margin: 0;
    padding: 0;
  }
  ul li {
    list-style: none;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%;
    animation: ani 1.6s ease-in-out infinite;
  }

  ul li:nth-child(1) {
    animation-delay: -1.4s;
    background: #ffffff;
    // box-shadow: 0 0 50px #ffffff;
  }
  ul li:nth-child(2) {
    animation-delay: -1.2s;
    background: #ffffff;
    // box-shadow: 0 0 50px #ffffff;
  }
  ul li:nth-child(3) {
    animation-delay: -1s;
    background: #ffffff;
    // box-shadow: 0 0 50px #ffffff;
  }
  ul li:nth-child(4) {
    animation-delay: -0.8s;
    background: #ffffff;
    // box-shadow: 0 0 50px #ffffff;
  }
  ul li:nth-child(5) {
    animation-delay: -0.6s;
    background: #ffffff;
    // box-shadow: 0 0 50px #ffffff;
  }

  @keyframes notleft {
    50% {
      left: 50%;
    }
    100% {
      left: 120%;
    }
  }

  @keyframes ani {
    0%,
    40%,
    100% {
      transform: scale(0.2);
    }
    20% {
      transform: scale(0.3);
      background: $red;
      // box-shadow: 0 0 50px $red;
    }
  }
}
</style>
