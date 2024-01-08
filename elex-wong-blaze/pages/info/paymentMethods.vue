<template>
  <div class="payment-methods">
    <div class="payment-methods-content">
      <div class="content-left web">
        <div class="left-item" @click="handleUrl('/termsofService')">
          {{ $tt("termOfService") }}
        </div>
        <div class="left-item" @click="handleUrl('/privacyPolicy')">
          {{ $tt("privacyPolicy") }}
        </div>
        <div class="left-item" @click="handleUrl('/responsibleGambling')">
          {{ $tt("responsibleGambling") }}
        </div>
        <div class="left-item" @click="handleUrl('/bonusTerms')">
          {{ $tt("bonusTerms") }}
        </div>
        <div class="left-item selected" @click="handleUrl('/paymentMethods')">
          {{ $tt("paymentMethods") }}
        </div>
        <div class="left-item" @click="handleUrl('/welcomeBonus')">
          {{ $tt("welcomeBonus") }}
        </div>
        <div
          class="left-item"
          @click="handleUrl('/affiliateTermsAndConditions')"
        >
          {{ $tt("affiliateTermsNConditions") }}
        </div>
      </div>
      <div class="mobile-header mobile">
        <div @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="title">{{ $tt("paymentMethods") }}</div>
      </div>
      <div class="content-right">
        <div class="content">
          <h1>Payment Methods</h1>
          <p>
            All deposit and withdrawal methods at
            {{ $config.site_name }} are secure and easy to use. Payment methods
            are country specific. Below are the methods available to your
            country:
          </p>

          <h3>Deposit Methods</h3>
          <table class="default web">
            <thead>
              <tr>
                <th>Payment Method</th>
                <th>Type</th>
                <th>Fee</th>
                <th>Processing time</th>
                <th>Limits per transaction</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>

          <h3>Withdrawal Methods</h3>
          <table class="default web">
            <thead>
              <tr>
                <th>Payment Method</th>
                <th>Type</th>
                <th>Fee</th>
                <th>Processing time</th>
                <th>Limits per transaction</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentMethods",
  data() {
    return {};
  },
  methods: {
    handleUrl(url) {
      window.newRouter("/info" + url);
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/paymentMethods.scss";
@import "/assets/scss/mobile/paymentMethods.scss";
</style>
