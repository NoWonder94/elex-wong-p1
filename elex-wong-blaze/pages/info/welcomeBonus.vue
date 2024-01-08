<template>
  <div class="welcome-bonus">
    <div class="welcome-bonus-content">
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
        <div class="left-item" @click="handleUrl('/paymentMethods')">
          {{ $tt("paymentMethods") }}
        </div>
        <div class="left-item selected" @click="handleUrl('/welcomeBonus')">
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
        <div class="title">{{ $tt("welcomeBonus") }}</div>
      </div>
      <div class="content-right">
        <div class="title">{{ $tt("welcome_bonus") }}</div>
        <h2>How does the welcome bonus work?</h2>
        <p>
          The welcome bonus consists of a Deposit Bonus up to 20 BRL on
          {{ $config.site_name }}
          Original games.
        </p>
        <h2>To claim it, all you need to do is:</h2>
        <ol>
          <li>Login &amp; Go to your Rewards</li>
          <li>Make a deposit</li>
          <!-- <li>
            Receive your deposit + the same in bonus balance on {{ $config.site_name }} Original
            games.
          </li> -->
        </ol>
        <h2>
          The free rounds will be distributed according to the following
          structure:
        </h2>
        <ul>
          <li>Instantly: 10 Free Crash Rounds</li>
          <li>After 24 hours: 10 Free Double Rounds</li>
          <li>After 48 hours: 10 Free Mines Rounds</li>
          <li>After 72 hours: 10 free Dice rounds</li>
        </ul>
        <p>
          The Welcome Bonus is strictly 18+ (as is the use of the rest of the
          Website) and available to new players who sign up for a
          {{ this.$config.site_name }} account and satisfy the criteria
          stipulated below.
        </p>
        <p>
          Once the first deposit has been made (provided that you opted-in for
          the Welcome Bonus during the deposit) you will instantly and
          automatically receive your deposit matched up to 20 BRL as a bonus.
        </p>
        <p class="footer">
          <span
            >Standard
            <a href="/info/bonusTerms" style="color: #8a90a2">Bonus Terms</a>
            apply to the Welcome Bonus.</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeBonus",
  data() {
    return {
      bonusList: [
        {
          title: "How does the welcome bonus work?",
          desc: [
            "The welcome bonus consists of a Deposit Bonus up to 20 BRL on Blaze Original games.",
          ],
        },
        {
          title: "To claim it, all you need to do is:",
          desc: [
            "1. Login & Go to your Rewards",
            "2. Login & Go to your Rewards",
            "3. Login & Go to your Rewards",
          ],
        },
        {
          title:
            "The free rounds will be distributed according to the following structure:",
          desc: [
            "We may automatically collect certain data as discussed above and receive Personal Information about you where you provide such information through the services or other communications and interactions on the blaze.com site. We may also receive Personal Information from online vendors and service providers, and from customer lists lawfully acquired from third-party vendors. In addition, we may engage the services of third-party service providers to provide technical support to process your online transactions and maintain your account. We will have access to any information you provide to such vendors, service providers and third-party e-commerce services, and we will use the Personal Information as set out in this Privacy Policy below. This information will only be disclosed to third parties outside the company in accordance with this Privacy Policy. We take steps to ensure that our arrangements with third-party service providers and online vendors protect your privacy.",
            "We may automatically collect certain data as discussed above and receive Personal Information about you where you provide such information through the services or other communications and interactions on the blaze.com site. We may also receive Personal Information from online vendors and service providers, and from customer lists lawfully acquired from third-party vendors. In addition, we may engage the services of third-party service providers to provide technical support to process your online transactions and maintain your account. We will have access to any information you provide to such vendors, service providers and third-party e-commerce services, and we will use the Personal Information as set out in this Privacy Policy below. This information will only be disclosed to third parties outside the company in accordance with this Privacy Policy. We take steps to ensure that our arrangements with third-party service providers and online vendors protect your privacy.",
            "We may automatically collect certain data as discussed above and receive Personal Information about you where you provide such information through the services or other communications and interactions on the blaze.com site. We may also receive Personal Information from online vendors and service providers, and from customer lists lawfully acquired from third-party vendors. In addition, we may engage the services of third-party service providers to provide technical support to process your online transactions and maintain your account. We will have access to any information you provide to such vendors, service providers and third-party e-commerce services, and we will use the Personal Information as set out in this Privacy Policy below. This information will only be disclosed to third parties outside the company in accordance with this Privacy Policy. We take steps to ensure that our arrangements with third-party service providers and online vendors protect your privacy.",
            "We may automatically collect certain data as discussed above and receive Personal Information about you where you provide such information through the services or other communications and interactions on the blaze.com site. We may also receive Personal Information from online vendors and service providers, and from customer lists lawfully acquired from third-party vendors. In addition, we may engage the services of third-party service providers to provide technical support to process your online transactions and maintain your account. We will have access to any information you provide to such vendors, service providers and third-party e-commerce services, and we will use the Personal Information as set out in this Privacy Policy below. This information will only be disclosed to third parties outside the company in accordance with this Privacy Policy. We take steps to ensure that our arrangements with third-party service providers and online vendors protect your privacy.",
            "We may automatically collect certain data as discussed above and receive Personal Information about you where you provide such information through the services or other communications and interactions on the blaze.com site. We may also receive Personal Information from online vendors and service providers, and from customer lists lawfully acquired from third-party vendors. In addition, we may engage the services of third-party service providers to provide technical support to process your online transactions and maintain your account. We will have access to any information you provide to such vendors, service providers and third-party e-commerce services, and we will use the Personal Information as set out in this Privacy Policy below. This information will only be disclosed to third parties outside the company in accordance with this Privacy Policy. We take steps to ensure that our arrangements with third-party service providers and online vendors protect your privacy.",
          ],
        },
      ],
    };
  },
  methods: {
    handleUrl(url) {
      window.newRouter("/info" + url);
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/welcomeBonus.scss";
@import "/assets/scss/mobile/welcomeBonus.scss";
</style>
