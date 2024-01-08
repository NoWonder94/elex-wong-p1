<template>
  <div id="base">
    <Header style="position:fixed;width:100%;z-index:12"/>
    <section>
      <router-view></router-view>
    </section>
    <Footer/>
    <div class="orientation">
      <img src="../assets/Rotate.png">
      <span>请垂直荧幕噢</span>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
export default {
  components: {
    Header,
    Footer
  },
  watch: {
    $route(to, from) {
      document.title =
        this.$i18n.t('menu.' + this.$route.meta.title) +
        ' - ' +
        this.$i18n.t('site');
    }
  },
  mounted() {
    if (this.$route.query.lang == 'en') {
      this.$i18n.locale = 'en';
    }

    if (this.$route.query.lang == 'cn') {
      this.$i18n.locale = 'zh-CN';
    }
  }
};
</script>

<style lang="scss">
body {
  background-color: #f7f7f7 !important;
}

.orientation {
  width: 0;
  height: 0;
  overflow: hidden;
  display: none;
}
@media only screen and (max-width: 768px) and (orientation: landscape) {
  .orientation {
    background-color: black;
    display: block;
    width: 100vw;
    height: 100vh;
    z-index: 20;
    position: fixed;
    top: 0;
    left: 0;
    img {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 15%;
      animation: rotation 2s linear 0s infinite;
    }

    span {
      position: absolute;
      bottom: 20%;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      display: block;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0);
      }

      50% {
        transform: rotate(-180deg);
      }

      100% {
        transform: rotate(-180deg);
      }
    }
  }
}

.el-select {
  .el-input {
    :not(input):not(textarea),
    :not(input):not(textarea)::after,
    :not(input):not(textarea)::before {
      -webkit-user-select: none;
      user-select: none;
      cursor: default;
    }

    input,
    button,
    textarea,
    :focus {
      outline: none; // You should add some other style for :focus to help UX/a11y
      -webkit-user-select: none;
      user-select: none;
      pointer-events: none;
    }

    input,
    button,
    textarea {
      outline: none; // You should add some other style for :focus to help UX/a11y
      -webkit-user-select: none;
      user-select: none;
      pointer-events: none;
    }
  }
}
.el-pagination .btn-prev,
.el-pagination .btn-next {
  background-color: transparent !important;
  font-weight: 400;
}
.el-pager li {
  background-color: transparent !important;
  font-weight: 400;
}
@media only screen and (min-width: 768px) {
  .el-select-dropdown {
    .el-scrollbar {
      .el-select-dropdown__wrap {
        .el-select-dropdown__list {
          .el-select-dropdown__item {
            font-size: 0.8vw;
          }
        }
      }
    }
  }

  .el-input {
    .el-input__inner {
      font-size: 0.8vw;
      color: #d0d0d0;
    }
    .el-icon-arrow-up:before {
      color: #d0d0d0;
    }
  }
}
@media only screen and (max-width: 768px) {
  .el-select-dropdown {
    .el-scrollbar {
      .el-select-dropdown__wrap {
        .el-select-dropdown__list {
          max-width: 60vw;
          .el-select-dropdown__item {
            color: #656565;
            font-size: 4.3vw;
            font-weight: 500;
          }
        }
      }
    }
  }

  .el-input {
    .el-input__inner {
      height: 11.5vw;
      color: #656565;
      font-size: 4.3vw;
      font-weight: 500;
      border-radius: 0px;
    }
    .el-icon-arrow-up:before {
      color: #656565;
      font-size: 4.3vw;
      font-weight: 500;
    }
  }
}
</style>
