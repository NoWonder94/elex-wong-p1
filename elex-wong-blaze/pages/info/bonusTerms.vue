<template>
  <div class="bonus-term">
    <div class="bonus-term-content">
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
        <div class="left-item selected" @click="handleUrl('/bonusTerms')">
          {{ $tt("bonusTerms") }}
        </div>
        <div class="left-item" @click="handleUrl('/paymentMethods')">
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
        <div class="title">{{ $tt("bonusTerms") }}</div>
      </div>
      <div class="content-right">
        <div class="title">{{ $tt("bonus_terms") }}</div>
        <ol class="desc-text">
          <li>
            All bonuses are limited to one per person, per household, per
            computer or per IP unless otherwise specified.
          </li>
          <li>
            Players can forfeit their bonus amount at any time and withdraw any
            remaining balance.
          </li>
          <li>
            If a bonus is forfeited while placed sports bets are still pending,
            those sports bets will be considered invalid and any potential
            winnings will not be paid out.
          </li>
          <li>All bonuses are subject to 35 times wagering on bonus amount.</li>
          <li>
            A bet must be settled to count towards wagering requirements,
            unsettled bets will not count.
          </li>
          <li>All deposit and free cash bonuses will expire after 30 days.</li>
          <li>
            The maximum bet with bonus money is €5 or the equivalent in your
            local currency. Any attempt to circumvent the €5 maximum bet is
            strictly prohibited.
          </li>
          <li>
            The maximum bet with bonus money is €5 or the equivalent in your
            local currency. Any attempt to circumvent the €5 maximum bet is
            strictly prohibited.
          </li>
          <li>
            Before any withdrawals are processed, your play will be reviewed for
            any irregular playing patterns. For fair gaming purposes, equal,
            zero or low margin bets, hedge betting, or high variance betting
            strategies shall all be considered irregular gaming for Bonus
            playthrough requirement purposes. Should
            {{ $config.site_name }} deem that irregular game play has occurred,
            it reserves the right to withhold any withdrawals and/or confiscate
            all winnings, and if applicable, after cancelling bonuses, to
            reinstate the deposit on the player’s account, without necessarily
            informing the player.
          </li>
          <li>
            €5 is the maximum bet allowed when playing with bonus money. If,
            after gameplay is reviewed, {{ $config.site_name }} finds that a
            player is in breach of this condition, their bonus and winnings will
            be forfeit.
          </li>
          <li>
            {{ $config.display_url }} management reserve the right to void any
            bonuses and/or winnings obtained by fraudulent behavior as described
            above.
          </li>
          <li>
            {{ $config.display_url }} management has the right to update these
            rules at any time.
          </li>
          <li>
            Your Real Money will be used before your Bonus Money when placing
            wagers on our games. Your wager may include both Real and Bonus
            Money if your wager exceeds your Real Money balance.
          </li>
          <li>
            Bonus money can only be used on games marked as
            {{ $config.site_name }} Originals.
          </li>
          <a href="/info/termsofService" style="color: #8a90a2"
            >View more policies in Terms of Service section 19.1</a
          >
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BonusTerms",
  data() {
    return {
      bonusList: [
        "1.1. By using, visiting and/or accessing any part of the " +
          this.$config.display_url +
          " website and or any sub-domain, website or mobile application that we own or operate (the “Website”) and/or registering an account on the Website you agree to be bound by these Terms and Conditions, our Privacy Policy, our Cookies Policy and any other rules applicable to our betting or gaming products available on the Website (together the 'Terms'), and are deemed to have accepted and understood all the Terms.",
        "1.2. You should read the Terms carefully, if you do not agree with them and/or cannot accept them, please do not use, visit or access the Website.",
        "1.3. These Terms may be changed by us from time to time for any reason (including compliance with applicable legislation or requirements of regulators). Current version of the Terms will be available on the Website. If you continue to use the Website after such changes come into effect you are deemed to have accepted such changes to the Terms.",
        "1.4. " +
          this.$config.display_url +
          " is operated by Prolific Trade N.V., a company registered under the laws of Curacao under registration number 150731. " +
          this.$config.display_url +
          " is operated in Mexico by MAD ENTERTAINMENT SA de CV. is licensed and regulated by the General Directorate of Games and Sweepstakes, with permit number DGAJS/SCEVF/P-08/2005.",
        "1.5. Reference to “you”, “your”, “customer”, “user” or “player” shall mean any person using the Website or any services available thereon and/or any registered customer of the Website.",
        "1.6. Reference to “games” shall mean Casino, Live Casino, Sportsbook, cards, and other games as may from time to time become available on the Website. " +
          this.$config.display_url +
          " reserves the right to add and remove Games from the Website at its own discretion.",
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
@import "/assets/scss/web/bonusTerms.scss";
@import "/assets/scss/mobile/bonusTerms.scss";
</style>
