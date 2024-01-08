<template>
  <div class="howreferworks">
    <div class="howreferworks-modal-overlay" @click="closeModal('close')">
      <div class="howreferworks-modal" @click.stop>
        <div class="header">
          <i class="el-icon-close" @click="closeModal('close')"></i>
          <div class="head">{{ $tt("how_invitation_works") }}</div>
          <el-divider />
        </div>

        <div class="body">
          <img class="logo" src="~/assets/img/referfriend.svg" alt="" />
          <h2 class="title">{{ $tt("invite_your_friend") }}</h2>
          <div class="desc">
            {{ $tt("invite_your_friend_desc_1") }}
            {{ friend_deposit_reward_currency }}
            {{ $tt("invite_your_friend_desc_2") }}
          </div>
        </div>

        <div class="footer">
          <h3 class="subtitle">{{ $tt("terms") }}</h3>
          <ul class="tnc">
            <li class="list" v-for="msg in messages" :key="msg">{{ msg }}</li>
          </ul>
          <div class="backBtn" @click="closeModal('back')">
            {{ $tt("back") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HowReferWorks",
  data() {
    return {
      friend_deposit_reward_currency: "12 BRL",
      messages: [
        this.$tt("how_invitation_works_message.desc_1"),
        this.$tt("how_invitation_works_message.desc_2"),
        this.$tt("how_invitation_works_message.desc_3"),
        this.$tt("how_invitation_works_message.desc_4"),
        this.$tt("how_invitation_works_message.desc_5"),
      ],
    };
  },
  methods: {
    closeModal(action) {
      this.$emit("close-modal", action);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/web/howreferworks.scss";
@import "/assets/scss/mobile/howreferworks.scss";
</style>
