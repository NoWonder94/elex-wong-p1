<template>
  <div class="ContentTitle">
    <span></span>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "ContentTitle",
  props: ["text"],
};
</script>

<style lang="scss">
@import "../assets/scss/base.scss";
@media only screen and (min-width: $pcMinWidth) {
  .ContentTitle {
    font-size: 16px;
    font-weight: bold;
    span {
      margin-right: 15px;
      padding: 1.5px 2.5px;
      background-color: $lighterGreen;
      border-radius: 5px;
    }
  }
}
@media only screen and (max-width: $mobileMaxWidth) {
  .ContentTitle {
    font-size: 5vw;
    font-weight: bold;

    span {
      margin-right: 2vw;
      padding: 0.2vw 0.5vw;
      background-color: $lighterGreen;
      border-radius: 1vw;
    }
  }
}
</style>
