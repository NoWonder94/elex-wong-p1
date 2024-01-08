<template>
  <div class="responsible-gambling">
    <div class="responsible-gambling-content">
      <div class="content-left web">
        <div class="left-item" @click="handleUrl('/termsofService')">
          {{ $tt("termOfService") }}
        </div>
        <div class="left-item" @click="handleUrl('/privacyPolicy')">
          {{ $tt("privacyPolicy") }}
        </div>
        <div
          class="left-item selected"
          @click="handleUrl('/responsibleGambling')"
        >
          {{ $tt("responsibleGambling") }}
        </div>
        <div class="left-item" @click="handleUrl('/bonusTerms')">
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
        <div class="title">{{ $tt("responsibleGambling") }}</div>
      </div>
      <div class="content-right">
        <div class="title">Gambling with responsibility</div>
        <p>Last updated: 18-02-2021</p>
        <p>Please read this information carefully for your own benefit.</p>
        <p>
          {{ $config.display_url }} is operated by Prolific Trade N.V. having
          its office at Groot Kwartierweg 10, Curacao. Company Registration
          number 150731.
        </p>
        <h2>Interpretation and Definitions</h2>
        <h3>Interpretation</h3>
        <p>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions.
        </p>
        <p>
          The following definitions shall have the same meaning regardless of
          whether they appear in singular or in plural.
        </p>
        <h3>Definitions</h3>
        <p>For the purposes of these Terms and Conditions:</p>
        <ul>
          <li>
            <b>Account</b> means a unique account created for You to access our
            Service or parts of our Service.
          </li>
          <li>
            <b>Company</b> (referred to as either "the Company", "We", "Us" or
            "Our" in this Agreement) refers to Prolific Trade N.V.
          </li>
          <li><b>Service</b> refers to the Website.</li>
          <li><b>Website</b> refers to {{ $config.display_url }}.</li>
          <li>
            <b>You</b> means the individual accessing or using the Service, or
            the company, or other legal entity on behalf of which such
            individual is accessing or using the Service, as applicable.
          </li>
        </ul>
        <h1>Responsible Gambling and Self Exclusion</h1>
        <h2>Responsible Gambling</h2>
        <p>
          Gambling means for the majority of our Users, entertainment, fun and
          excitement. But we also know that for some of our Users gambling has
          negative side effects. In the medical science is pathologic gambling
          since many years as serious sickness is recognised.
        </p>
        <p>
          Since our first day we have thought about this problem and try our
          best to help. Under “Responsible Gambling” We understand multiple
          steps of measures, with which a gambling provider can help to lower
          the possibility of negative side effects appearing. -In case they
          already appear we also try to take active steps against them.
        </p>
        <p>
          The most important instrument against negative side effects from
          gambling are knowledge and education about the risks of gambling to
          support our Users self-control in order to make sure they do not
          suffer from negative side effects.
        </p>
        <h2>Information and contact</h2>
        <p>
          Our Support will help you via email at all time without any additional
          costs for you:
        </p>
        <ul>
          <li>
            Telegram:
            <a :href="$config.telegram" target="_blank">
              {{ $config.telegram }}
            </a>
          </li>
        </ul>
        <p>
          Our Support will of course not give out any information about You
          without Your consent to anyone else
        </p>
        <p>
          In addition you also can take a self-test, if You are already gambling
          addicted at:
          <a
            href="https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem/"
            target="_blank"
            style="color: #8a90a2"
            >https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem/</a
          >
        </p>
        <p>
          And you can also find additional information about gambling addictions
          at:
          <a
            href="https://www.begambleaware.org/safer-gambling/"
            target="_blank"
            style="color: #8a90a2"
            >https://www.begambleaware.org/safer-gambling/</a
          >
        </p>
        <h2>
          Helpful hints for responsible gambling at {{ $config.display_url }}
        </h2>
        <p>
          We recommend you think about the following hints, before gambling in
          order to insure gambling stays fun for You and without any negative
          side effects:
        </p>
        <ul>
          <li>
            <p>Set yourself a deposit limit</p>
            <p>
              Before you start to gambling, think about how much you can afford
              to gamble with according to Your financial situation. Play with
              amounts which are for fun and for Your entertainment
            </p>
          </li>
          <li>
            <p>Do not try to win back a loss at every cost</p>
            <p>
              Try to not take too huge risks to win back what You lost before at
              any cost. Play for Entertainment and not to earn money.
            </p>
          </li>
          <li>
            <p>Set yourself a time limit</p>
            <p>
              Set yourself a time limit and do not break it. Keep in mind
              gambling should stay in balance with your other hobbies and not be
              Your only hobby.
            </p>
          </li>
          <li>
            <p>Play smart:</p>
            <p>
              It is smarter to not play, when You are extremely stressed,
              depressed or under too much pressure. Also do not play when you
              are under the influence of Medications, Drugs or Alcohol.
            </p>
          </li>
          <li>
            <p>Take breaks:</p>
            <p>
              You should take breaks when You notice, that You get tired or
              can't concentrate anymore
            </p>
          </li>
          <li>
            <p>Only one account:</p>
            <p>
              To make it easier to have an overview of how much time and money
              You spend on gambling it is highly advised to not create more than
              one Account per Person.
            </p>
          </li>
        </ul>
        <h2>Minor Protection</h2>
        <p>
          To use our Service, You have to be 18 years or older. To avoid abuse,
          keep Your login data safe from any minors near You.
        </p>
        <p>
          Principally we recommend a filter program to avoid minors, especially
          children, to access any context on the internet, which is not healthy
          for them.
        </p>
        <p>
          For parents we can recommend a list of internet filters, to support
          them, from keeping their children from any context, which was not made
          for them:
          <a
            href="https://famisafe.wondershare.com/internet-filter/best-internet-filters.html"
            target="_blank"
            style="color: #8a90a2"
            >https://famisafe.wondershare.com/internet-filter/best-internet-filters.html</a
          >
        </p>
        <h2>Self-Exclusion:</h2>
        <p>
          In case You are diagnosed with a gambling addiction or try to stay
          away from gambling for a different reason, we want to assist you to
          stay away from anything that does nothing good for you.
          “Self-Exclusion” means that You exclude yourself, out of Your own
          choice, from all gambling services. This exclusion cannot be undone
          for a set amount of time. If you wish to self-exclude yourself from
          gambling, please message our support and give them a time span between
          6 months and 5 years. They also will explain all future steps and what
          is needed from you.
        </p>
        <ul>
          <li>
            Telegram:
            <a :href="$config.telegram" target="_blank">
              {{ $config.telegram }}
            </a>
          </li>
        </ul>
        <p>
          Please keep in mind that Self Exclusion is permanent for the set time
          span and will not be undone for your own protection.
        </p>
        <p>
          During Self Exclusion you are not allowed to create a new Account and
          every attempt to create a new Account during Self Exclusion is a
          violation of our
          <a href="/en/terms-of-service" style="color: #8a90a2"
            >Terms of Service</a
          >
          and may result in the permanent ban of your original account.
        </p>
      </div>

      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResponsibleGambling",
  methods: {
    handleUrl(url) {
      window.newRouter("/info" + url);
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/responsibleGambling.scss";
@import "/assets/scss/mobile/responsibleGambling.scss";
</style>
