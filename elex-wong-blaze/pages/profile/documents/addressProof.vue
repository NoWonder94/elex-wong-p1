<template>
  <div class="address-proof">
    <AccountHeader title="PROOF OF ADDRESS" />
    <div class="address-proof-content">
      <div class="content-left web">
        <div class="left-item" @click="handleUrl('/identificationProof')">
          <i class="el-icon-user-solid"></i>
          {{ $tt("proofOfIdentification") }}
        </div>
        <div class="left-item selected" @click="handleUrl('/addressProof')">
          <i class="el-icon-tickets"></i>
          {{ $tt("proofOfAddress") }}
        </div>
      </div>
      <div class="content-right">
        <div class="content">
          {{ $tt("no_action_required") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressProof",
  meta: {
    auth: true,
  },
  methods: {
    handleUrl(url) {
      window.newRouter("/profile/documents" + url);
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/addressProof.scss";
@import "/assets/scss/mobile/addressProof.scss";
</style>
