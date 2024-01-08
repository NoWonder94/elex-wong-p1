<template>
  <div class="crash">
    <div class="crash-content">
      <div class="content-left web">
        <div class="left-item selected" @click="handleUrl('/crash')">
          {{ $tt("crash") }}
        </div>
        <div class="left-item" @click="handleUrl('/double')">
          {{ $tt("double") }}
        </div>
      </div>
      <div class="mobile-header mobile">
        <div @click="$router.go(-1)"><i class="el-icon-arrow-left"></i></div>
        <div class="title">{{ $tt("crash") }}</div>
      </div>
      <div class="content-right">
        <div class="title">{{ $tt("_crash") }}</div>
        <div class="desc">{{ title }}</div>
        <div v-for="(list, index) in crashList" :key="index">
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
  name: "Crash",
  data() {
    return {
      title:
        "Crash is a multiplayer game which uses a sha256 chain in combination with a undetermined client seed to fairly generate rounds.",
      crashList: [
        {
          title: "Chain Generation",
          desc: [
            "To generate the chain, we begin with securely randomized bytes. From there, we iterate 10 million times feeding the previous seed into a sha256 function. Double games read the chain in a reverse order.",
            "The terminating/final seed of this chain is 492bd10144a3525e2745718fe4d25e08affbea483872d8e8b86191b20ce0a7a8",
          ],
        },
        {
          title: "Generating a hash",
          desc: [
            "To achieve fair randomness, we create a sha256 hmac hash, created using the server seed as the secret, and client seed as the value.",
            "The crash chain of 10 million sha256 hashes was generated on 2019-04-04 05:59AM UTC. We decided on using 0000000000000000000415ebb64b0d51ccee0bb55826e43846e5bea777d91966, the hash of Bitcoin block 570132, mined on 2019-04-04 06:35AM UTC as the client seed for this chain.",
          ],
        },
        {
          title: "Generating a crash point",
          desc: [
            "Taking this fairly generated hash, we generate a crash point using the following code:",
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
@import "/assets/scss/web/crash.scss";
@import "/assets/scss/mobile/crash.scss";
</style>
