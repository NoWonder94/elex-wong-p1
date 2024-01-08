<template>
  <div class="scroll-digit">
    <div v-for="(item, index) in digitArray" :key="`${digits}_${index}`">
      <Digit :digit="item" :index="index" v-bind="$props" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollDigit',
  props: {
    digits: {
      type: [Number, String],
      required: true
    },
    fontSize: {
      type: Number,
      default: 16
    },
    // 最先翻滚的字符，滚动时常
    duration: {
      type: Number,
      default: 0.3
    },
    color: String,
    bgColor: String,
    reverse: Boolean // 默认从右左往右滚动，reverse为true则从右往左滚动
  },
  computed: {
    digitArray() {
      return `${this.digits}`.split('')
    }
  },
}
</script>

<style scoped >
.scroll-digit {
  display: inline-block;
}
.scroll-digit > div {
  display: inline-block;
}
</style>
