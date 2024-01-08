<template>
  <div class="privacy-policy">
    <div class="privacy-policy-content">
      <div class="content-left web">
        <div class="left-item" @click="handleUrl('/termsofService')">
          {{ $tt("termOfService") }}
        </div>
        <div class="left-item selected" @click="handleUrl('/privacyPolicy')">
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
        <div class="title">{{ $tt("privacyPolicy") }}</div>
      </div>
      <div class="content-right">
        <div class="title">{{ $tt("privacy_policy") }}</div>

        <div v-for="(list, index) in policyList" :key="index">
          <div class="desc-title">
            {{ list.title }}
          </div>
          <div v-for="(desc, index) in list.desc" :key="index">
            <div class="desc-text">
              <p v-html="desc"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrivacyPolicy",
  data() {
    return {
      policyList: [
        {
          title: "1. PRIVACY",
          desc: [
            "Prolific Trade N.V. is committed to protecting your personal information. This Privacy Policy lets you know what information we collect when you use our services, why we collect this information and how we use the collected information.",
            "Please note that this Privacy Policy will be agreed between you and <a href='https://" +
              this.$config.display_url +
              "' target='_top' style='color: #8a90a2;'>" +
              this.$config.display_url +
              "</a>. (‘We’, ‘Us’ or ‘Our’, as appropriate). This Privacy Policy is an integrated part of <a href='https://" +
              this.$config.display_url +
              "' target='_top' style='color: #8a90a2;'> " +
              this.$config.display_url +
              "'s</a> Terms and Conditions.",
            "The website <a href='https://" +
              this.$config.display_url +
              "' target='_top' style='color: #8a90a2;'>" +
              this.$config.display_url +
              "</a> (“Casino”, “Website”, “Company”, “We”, “Us”, “Our”) is owned and operated Prolific Trade N.V., a company registered in accordance with Curaçao Law, registration No. 150731, Address: Groot Kwartierweg 10, Curacao. Prolific Trade N.V. is licensed and regulated by the Curacao Gaming Authority and operates under the License No. 365/JAZ issued to Gaming Services Provider, Authorized and Regulated by the Government of Curaçao.",
            "We may periodically make changes to this Privacy Policy and will notify you of these changes by posting the modified terms on our platforms. We recommend that you revisit this Privacy Policy regularly.",
          ],
        },

        {
          title: "2. INFORMATION COLLECTED",
          desc: [
            "We consider information that may be used to identify an individual, including, but not limited to, first and last name, date of birth, home or other physical address, email address, phone number or other relevant information to be Personal Information (‘Personal Information’). You may be asked to provide Personal Information when you use our website, register for an account or use our services. The Personal Information that we collect may include information such as: contact information (including telephone number), shipping information, billing information, transaction history, website usage preferences, and feedback regarding the Services. This information is held by us on servers based in Germany and elsewhere from time to time. When you interact with the services, our servers keep an activity log unique to you that collects certain administrative and traffic information including: source IP address, time of access, date of access, web page(s) visited, language use, software crash reports and type of browser used. This information is essential for the provision and quality of our services. We do not collect Personal Information about you without your knowledge.",
          ],
        },
        {
          title: "3. MEANS OF COLLECTING AND PROCESSING DATA",
          desc: [
            "We may automatically collect certain data as discussed above and receive Personal Information about you where you provide such information through the services or other communications and interactions on the " +
              this.$config.display_url +
              " site. We may also receive Personal Information from online vendors and service providers, and from customer lists lawfully acquired from third-party vendors. In addition, we may engage the services of third-party service providers to provide technical support to process your online transactions and maintain your account. We will have access to any information you provide to such vendors, service providers and third-party e-commerce services, and we will use the Personal Information as set out in this Privacy Policy below. This information will only be disclosed to third parties outside the company in accordance with this Privacy Policy. We take steps to ensure that our arrangements with third-party service providers and online vendors protect your privacy.",
          ],
        },
        {
          title: "4. INFORMATION USE",
          desc: [
            "We use the Personal Information we collect from you to deliver our Services, to provide customer support, to undertake necessary security and identity verification checks, to process any of your online transactions, to assist your participation in third-party promotions, meet certain business requirements and for any other purpose related to the operation of the Services. As such, we may share your Personal Information with our carefully selected partners (including any other parties that have data sharing arrangements with the latter).",
            "Your Personal Information may also be used by us to provide you with: (1) promotional offers and information regarding our products and services; and (2) promotional offers and information regarding the products and services of our partners, in order to enlarge the range of provided products and improve our customer service. From time-to-time, we may request information from you via surveys or contests. Participation in these surveys or contests is completely voluntary and you have the choice of whether or not to disclose such information. Information requested may include contact information (such as name, correspondence address and telephone number), and demographic information (such as zip or postal code or age). By accepting any contest prize or winnings from us, you consent to use of your name for advertising and promotional purposes without additional compensation, except where prohibited by law. Unless you have elected not to receive promotional information, we may also use your Personal Information (including your email address and phone number) to provide you with information regarding our products, services and promotions, including other gaming products (including online poker, casino, betting, backgammon) and products and services from third parties carefully selected by us.",
          ],
        },
        {
          title: "5. CERTAIN EXCLUDED DISCLOSURES",
          desc: [
            "We may disclose your Personal Information if required to do so by law, or if we believe in good faith that such action is necessary to: (1) comply with any legal process served on us, any of our sites or the services or in circumstances where we are under a substantially similar legal obligation; (2) protect and defend our rights or property; or (3) act to protect the personal safety of users of the services or the public. If, in our sole determination, you are found to have cheated or attempted to defraud us, the company , or any other user of the services in any way including but not limited to game manipulation or payment fraud, or if we suspect you of fraudulent payment, including use of stolen credit cards, or any other fraudulent activity (including any chargeback or other reversal of a payment) or prohibited transaction (including money laundering), we reserve the right to share this information (together with your identity) with other online gaming sites, banks, credit card companies, appropriate agencies and relevant authorities. (4) For the purpose of research on the prevention of addiction, data can be made anonymous and passed on to the respective institutions.",
          ],
        },
        {
          title: "6. ACCESS",
          desc: [
            "You may ‘opt out’ of receiving any promotional communications either by choosing to opt out via your account settings available on our sites or the services or in an email you receive from us, or at any time by sending an email, or by writing to us at Customer Service.",
            "In addition, You may contact us if you: 1) want to confirm the accuracy of the Personal Information we have collected about you; 2) would like to update your Personal Information; and/or 3) have any complaint regarding our use of your Personal Information. If requested, we will (1) update any information you have provided to us, in case you prove the necessity for such changes or (2) mark any information to prohibit future use for marketing purposes. For the avoidance of doubt, nothing in this Privacy Policy shall prevent us from retaining your Personal Information where we are required to do so by law.",
          ],
        },
        {
          title: "7. COOKIES",
          desc: [
            "Information placed on your device",
            "-When accessing our services, we may store information on your device. This information is referred to as cookies, which are small text files that are stored on your device when you visit online pages that record your preferences. We also use Local Shared Objects or ‘flash cookies’. ‘Flash cookies’ are similar to browser cookies. They allow us to remember things about your visits across our sites. Neither cookies nor flash cookies can be used to access or use other information on your computer. We only use these methods to track your use of our services. Cookies help us monitor traffic to the site, improve our services and make it easier and/or more relevant for your use. We use flash cookies and third party cookies to help us show you more relevant and desirable advertisements.",
            "Strictly necessary cookies ",
            "-Strictly necessary cookies are essential to allow a user to move around a website and use its features, such as accessing secure areas of the website or making financial transactions. Without these cookies, we would not be able to make our websites work efficiently.",
            "During the registration process",
            "-These cookies will hold information collected during your registration and will allow us to recognize you as a customer and provide you with the services you require. We may also use this data to better understand your interests while online and to enhance your visits to our platforms.",
            "On our website",
            "-For visitors to our website, we use cookies to collect information. Our servers use three different types of cookies:",
            "- A <i>‘session-based’</i> cookie: This type of cookie is only allocated to your computer for the duration of your visit to our website. A session-based cookie helps you move around our website faster and, if you’re a registered customer, it allows us to give you information that is more relevant to you. This cookie automatically expires when you close your browser.",
            "- A <i>‘persistent’</i> cookie: This type of cookie will remain on your computer for a period of time set for each cookie. Flash cookies are also persistent.",
            "- <i>‘Analytical’</i> cookies: This type of cookie allows us to recognize and count the number of visitors to our site and see how visitors use our services. These help us improve the way our sites work, for example, by ensuring you can find what you are looking for easily.",
            "-You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but, if you prefer, you can usually modify your browser setting to decline cookies. The Help menu on the menu bar of most browsers will tell you how to prevent your browser from accepting new cookies, how to have the browser notify you when you receive a new cookie and how to disable cookies altogether.",
            "Flash cookies",
            "-You can modify your Flash Player settings to prevent the use of flash cookies. The Settings Manager of your Flash Player allows you to manage your preferences. To disallow flash cookies from all third party content go to the ‘Global Storage Settings’ panel of the Settings Manager and deselect the checkbox labelled ‘Allow third party flash content to store information on your computer’ and close the Settings Manager. Alternatively you can also adjust your settings for specific websites you visit through the ‘Website Storage Settings’ panel which is also found in the Settings Manager.",
            "-If you are using an old version of Flash Player or older web browser, the Settings Manager may not be available to you. We recommend that you ensure that you refresh your Flash Player and browser to the latest available versions.",
            "-If you choose to decline cookies, you may not be able to experience all of the interactive features on our sites.",
          ],
        },
        {
          title: "8. CONSENT TO USE OF ELECTRONIC SERVICE PROVIDERS",
          desc: [
            "In order to play real money games on our services, you will be required to send money to and receive money from us. We may use third-party electronic payment systems to process such financial transactions. By accepting this Privacy Policy, you expressly consent to Personal Information necessary for the processing of transactions including, where necessary, the transfer of information outside of your country. We take steps to ensure that our arrangements with payments systems protect your privacy.",
          ],
        },
        {
          title: "9. CONSENT TO SECURITY REVIEW",
          desc: [
            "We reserve the right to conduct a security review at any time to validate the registration data provided by you and to verify your use of the services and your financial transactions for potential breach of our Terms and Conditions and of applicable law. By using our services and thereby agreeing to our Terms and Conditions you authorize us to use your Personal Information and to disclose your Personal Information to third parties for the purposes of validating the information you provide during your use of our services, including, where necessary, the transfer of information outside of your country. Security reviews may include but are not limited to ordering a credit report and/or otherwise verifying the information you provide against third-party databases. In addition, to facilitate these security reviews, you agree to provide such information or documentation as we may request.",
          ],
        },

        {
          title: "10. SECURITY",
          desc: [
            "We understand the importance of security and the techniques needed to secure information. We store all of the Personal Information we receive directly from you in an encrypted and password-protected database residing within our secure network behind active state-of-the-art firewall software. (Our Services support SSL Version 3 with 128-bit encryption). We also take measures to ensure our subsidiaries, agents, affiliates and suppliers employ adequate security measures.",
          ],
        },
        {
          title: "11. PROTECTION OF MINORS",
          desc: [
            "Our Services are not intended for or directed at persons under the age of eighteen (18) (or the lawful age in their respective jurisdiction). Any person who provides their information to us through any part of the services signifies to us that they are eighteen (18) years of age (or the lawful age in their respective jurisdiction) or older. It is our policy to uncover attempts by minors to access our services which may involve having to initiate a security review. If we become aware that a minor has attempted to or has submitted personal information via our services, we will take steps to reject or purge from our records all information we are legally allowed to purge the information from our records.",
          ],
        },
        {
          title: "12. INTERNATIONAL TRANSFERS",
          desc: [
            "Personal Information collected on the services may be stored and processed in any country in which we or our affiliates, suppliers or agents maintain facilities. By using our services, you expressly consent to any transfer of information outside of your country (including to countries that may not be assessed as having adequate privacy laws). Nevertheless, we take steps to ensure that our agents, affiliates and suppliers comply with our standards of privacy regardless of their location.",
          ],
        },
        {
          title: "13. THIRD-PARTY PRACTICES",
          desc: [
            "We cannot ensure the protection of any information that you provide to a third-party online site that links to or from the services or any information collected by any third party administering our affiliate program (if applicable) or any other program, since these third-party online sites are owned and operated independently from us. Any information collected by these third parties is governed by the privacy policy, if any, of such third party.",
          ],
        },
        {
          title: "14. LEGAL DISCLAIMER",
          desc: [
            "The Services operate ‘AS-IS’ and ‘AS-AVAILABLE’ without liability of any kind. We are not responsible for events beyond our direct control. Due to the complex and ever-changing nature of our technology and business, we cannot guarantee nor do we claim that there will be error-free performance regarding the privacy of your Personal Information, and we will not be liable for any indirect, incidental, consequential or punitive damages relating to the use or release of said Personal Information.",
          ],
        },
        {
          title: "15. CONSENT TO PRIVACY POLICY",
          desc: [
            "Your use of our services constitutes an agreement to our Privacy Policy.",
            "This is our entire and exclusive Privacy Policy and it supersedes any earlier version. This Privacy Policy should be read in conjunction with our Terms and Conditions and any additional applicable terms posted on our platforms. We may periodically make changes to this Privacy Policy and will notify you of these changes by posting the modified terms on our Platforms. Your continued use of our services following any changes to this Privacy Policy constitutes your acceptance of the changes. We recommend that you revisit this Privacy Policy regularly.",
            "In addition, as per Article 77 of the GDPR, you have the right to lodge a complaint related to your data processing to a supervisory authority, in particular in the Member State of your habitual residence, place of work or place of an alleged infringement.",
          ],
        },
        {
          title: "16. Other websites",
          desc: [
            "Our web site may contain links to other web sites, which are outside our control and are not covered by this Privacy Policy. If you access other sites using the links provided, the operators of these sites may collect information from you, which will be used by them in accordance with their privacy policy, which may differ from ours. We are not responsible. Solely the operators of these websites shall be responsible for their functionality or possible errors on the linked sites.",
          ],
        },
        {
          title: "17. Data Deletion",
          desc: [
            "To request for your data to be deleted please contact  Official " +
              this.$config.display_url +
              ". Please note under GDPR Article 17(3)(b) legal requirements take precedence over the right to be forgotten. Therefore in order to comply with AML regulations, we will retain your data for five years. After this we will be able to process your request.",
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
@import "/assets/scss/web/privacyPolicy.scss";
@import "/assets/scss/mobile/privacyPolicy.scss";
</style>
