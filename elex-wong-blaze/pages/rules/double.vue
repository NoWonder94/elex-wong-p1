<template>
  <div class="double">
    <div class="double-content">
      <div class="content-left web">
        <div class="left-item" @click="handleUrl('/crash')">
          {{ $tt("crash") }}
        </div>
        <div class="left-item selected" @click="handleUrl('/double')">
          {{ $tt("double") }}
        </div>
      </div>
      <div class="mobile-header mobile">
        <div @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="title">{{ $tt("double") }}</div>
      </div>
      <div class="content-right">
        <div class="title">{{ $tt("_double") }}</div>
        <div class="desc">{{ title }}</div>
        <div v-for="(list, index) in doubleList" :key="index">
          <div class="desc-title">
            {{ list.title }}
          </div>
          <div v-for="desc in list.desc" :key="desc">
            <div class="desc">
              {{ desc }}
            </div>
          </div>
        </div>
        <div class="btn">{{ $tt("view_code") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Double",
  data() {
    return {
      // title:"Double is a multiplayer game which uses a sha256 chain in combination with a undetermined client seed to fairly generate rounds.",
      title: "  ",
      doubleList: [
        {
          title: "Chain Generation",
          desc: [
            "   ",
            "The terminating/final seed of this chain is 99384f03b5f52758f8c6037adca8d27d7d940dfe3cf15bbb763399bea0bbf914",
          ],
        },
        {
          title: "Generating a hash",
          desc: [
            "To achieve fair randomness, we create a sha256 hmac hash, created using the server seed as the secret, and client seed as the value.",
            "The crash chain of 10 million sha256 hashes was generated on 2019-04-01 06:36AM UTC. We decided on using 0000000000000000002aeb06364afc13b3c4d52767e8c91db8cdb39d8f71e8dd, the hash of Bitcoin block 570120, mined on 2019-04-04 05:06AM UTC as the client seed for this chain.",
          ],
        },
        {
          title: "Generating a double roll",
          desc: [
            "Taking this fairly generated hash, we generate a roll in the range of 0 - 15 (0 representing green) to represent a double tile using the following code:",
          ],
        },
      ],
    };
  },
  methods: {
    handleUrl(url) {
      window.newRouter("/rules" + url);
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/double.scss";
@import "/assets/scss/mobile/double.scss";
</style>
