<template>
  <div class="chat-ignores">
    <AccountHeader title="CHAT IGNORES" />
    <div class="content">
      <div class="title">
        {{ $tt("chat_ignores") }}
      </div>
      <div class="desc">
        {{ $tt("no_ignores_found") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatIgnores",
  meta: {
    auth: true,
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/chatIgnores.scss";
@import "/assets/scss/mobile/chatIgnores.scss";
</style>
