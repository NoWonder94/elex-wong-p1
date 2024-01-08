<template>
  <div class="term-service">
    <div class="term-service-content">
      <div class="content-left web">
        <div class="left-item selected" @click="handleUrl('/termsofService')">
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
        <div class="left-item" @click="handleUrl('/welcomeBonus')">
          {{ $tt("welcomeBonus") }}
        </div>
        <div class="left-item" @click="handleUrl('/affiliateTermsAndConditions')">
          {{ $tt("affiliateTermsNConditions") }}
        </div>
      </div>
      <div class="mobile-header mobile">
        <div @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="title">{{ $tt("termOfService") }}</div>
      </div>
      <div class="content-right">
        <div class="title">{{ $tt("term_of_service") }}</div>
        <div class="desc-title">
          {{ desc }}
        </div>
        <div v-for="(tnc, index) in tncList" :key="index">
          <div class="desc-title">
            {{ tnc.title }}
          </div>
          <div v-for="(desc, i) in tnc.desc" :key="i">
            <div class="desc-text">
              {{ desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TermsOfService",
  data() {
    return {
      desc: "THESE TERMS AND CONDITIONS ARE DRAFTED IN ENGLISH. ANY TRANSLATION INTO ANOTHER LANGUAGE IS ONLY FOR THE CONVENIENCE OF THE READER. IN THE EVENT OF ANY CONFLICT OR INCONSISTENCY THE ENGLISH LANGUAGE VERSION SHALL PREVAIL OVER ANY TRANSLATED VERSION.",
      tncList: [
        {
          title: "1. Introduction",
          desc: [
            "1.1. By using, visiting and/or accessing any part of the " +
            this.$config.display_url +
            " website and or any sub-domain, website or mobile application that we own or operate (the “Website”) and/or registering an account on the Website you agree to be bound by these Terms and Conditions, our Privacy Policy, our Cookies Policy and any other rules applicable to our betting or gaming products available on the Website (together the 'Terms'), and are deemed to have accepted and understood all the Terms.",
            "1.2. You should read the Terms carefully, if you do not agree with them and/or cannot accept them, please do not use, visit or access the Website.",
            "1.3. These Terms may be changed by us from time to time for any reason (including compliance with applicable legislation or requirements of regulators). Current version of the Terms will be available on the Website. If you continue to use the Website after such changes come into effect you are deemed to have accepted such changes to the Terms.",
            "1.4. " +
            this.$config.display_url +
            " is operated by Prolific Trade N.V., a company registered under the laws of Curacao under registration number 150731.",
            "1.5. Reference to “you”, “your”, “customer”, “user” or “player” shall mean any person using the Website or any services available thereon and/or any registered customer of the Website.",
            "1.6. Reference to “games” shall mean Casino, Live Casino, Sportsbook, cards, and other games as may from time to time become available on the Website. " +
            this.$config.display_url +
            " reserves the right to add and remove Games from the Website at its own discretion.",
          ],
        },
        {
          title: "2. Your Account",
          desc: [
            "2.1. Legal requirements",
            "2.1.1. Reference to the “Account” shall mean an account registered by you on the Website after accepting and agreeing to these Terms. By registering an Account you declare that you are over 18 years of age or of a higher minimum legal age as stipulated in the jurisdiction of your residence under the laws applicable to you. It is your sole responsibility to know whether the services available on the Website are legal in the country of your residence. Persons who are under age of 18 years are not allowed to use the Website and/or any services available on it.",
            "2.1.2. You are not allowed to register on the Website and use our services if you are a resident of Aruba, Australia, Bonaire, Curacao, France, Iran, Iraq, Netherlands, Saba, Spain, St Maarten, Statia, U.S.A or the U.S.A dependencies, United Kingdom. We reserve the right to refuse customers from any other countries over and above the aforementioned jurisdictions at our own discretion.",
            "2.2. Registration of Account",
            "2.2.1. In order to place bets, play games and deposit money you need to register the Account on the Website.",
            "2.2.2. To register the Account, you must provide complete and up-to-date information including a mobile number, e-mail address, username, password and other mandatory information requested on the registration form.",
            "2.2.3. By registering the Account on the Website you agree to specify your legal name. We may take action to check the accuracy of the information you provide. You’re not allowed to change this data, but there are cases in which you can individually request for changing of data by contacting Website customer support, such as an honest mistake etc.",
            "2.2.4. If you choose, or you are provided with a username, password or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any third party. We are not responsible for any abuse or misuse of your Account by third parties due to your disclosure, whether intentional or accidental, whether active or passive, of your login details to any third party. We will never ask you to reveal your password and will never initiate contact with you to ask you for the memory joggers associated with your password.",
            "2.2.5. Employees, former employees of service providers and/or affiliated persons are not permitted to register the accounts on the Website and cannot exploit the services and promotions available on it. Same rules apply to family members of the above mentioned. Violation of this rule will result in the account being permanently closed and the referred accounts will be considered as fraudulent. Any winnings derived from such activities will be deemed as forfeited by the account holder and only the deposited amount will be returned to the account holder.",
            "2.2.6 You cannot transfer, sell, or pledge Your Account to another person. This prohibition includes the transfer of any assets of value of any kind, including but not limited to ownership of accounts, winnings, deposits, bets, rights and/or claims in connection with these assets, legal, commercial, or otherwise. The prohibition on said transfers also includes however is not limited to the encumbrance, pledging, assigning, usufruct, trading, brokering, hypothecation and/or gifting in cooperation with a fiduciary or any other third party, company, natural or legal individual, foundation and/or association in any way shape or form",
            "2.3. Account issues",
            "2.3.1. If you forget your password or think that somebody knows details of your personal data, moreover if you suspect that another user is taking an unfair advantage through cheating or collusion you must report the suspicion to us.",
            "2.3.2. We reserve the right to declare any bet or transaction void partially or in full if we, at our own discretion, would deem it obvious that any of the following circumstances have occurred:",
            "1) the Account holder or people associated with the Account holder may directly or indirectly influence the outcome of an event;",
            "2) the Account holder and or people associated with the Account holder are directly or indirectly avoiding the rules of the Website;",
            "3) the result of an event or the bet has been directly or indirectly affected by criminal activity;",
            "4) the odds of an event have significantly been changed due to a public announcement in relation to the event;",
            "5) bets have been placed that would not have been accepted otherwise, but they were accepted during periods when the Website have been affected by technical problems;",
            "6) due to an error, such as a mistake, misprint, technical error, human error, force majeure or otherwise, bets have been offered, placed and or accepted due to this error.",
            "2.3.3. When we close or suspend an Account for whatever reason, we reserve the right to close any future Accounts that may be registered by the same person, device, address, or that may use the same payment wallets or credit cards and void/cancel all bets and transactions of that Accounts.",
            "2.3.4. We offer two-factor authentication (2FA) as additional protection from unauthorized use of your Account. You are responsible for keeping your login information confidential and making sure it cannot be accessed by another person.",
            "2.4. By registering the Account on the Website you undertake, declare and warrant that:",
            "2.4.1. You are over 18 years of age or such higher minimum legal age of majority as stipulated in the laws of jurisdiction applicable to you and, under the laws applicable to you, you are allowed to participate in the Games offered on the Website.",
            "2.4.2. You will use this Website and your Account solely and exclusively for the purpose of your genuine participation in the Games and not for any financial or other operations; your participation in the Games will be strictly in your personal non-professional capacity for recreational and entertainment reasons only.",
            "2.4.3. You participate in the Games on your own behalf and not on behalf of any other person;",
            "2.4.4. You are not resident in Curacao, France, Iran, Iraq, Netherlands, North Korea, Singapore, Spain, Portugal, St Maarten, Statia, U.S.A or the U.S.A dependencies, Ukraine, United Kingdom.",
            "2.4.5. All information that you provide to Prolific Trade N.V. is true, complete, and correct, and that you shall immediately notify us of any change of such information.",
            "2.4.6. You are solely responsible for reporting and accounting for any taxes applicable to you under relevant laws for any winnings that you receive from Prolific Trade N.V..",
            "2.4.7. All money that you deposit into your Account is not tainted with any illegality and, in particular, do not originate from any illegal activity or source.",
            "2.4.8. You understand that by participating in the Games you take the risk of losing money deposited into your Account.",
            "2.4.9. You shall not be involved in any fraudulent, collusive, fixing or other unlawful activity in relation to your or third parties’ participation in any of the Games and shall not use any software-assisted methods or techniques or hardware devices for your participation in any of the Games. Prolific Trade N.V. hereby reserves the right to invalidate or close your Account or invalidate your participation in a Game in the event of such behavior.",
            "2.4.10. In relation to deposits and withdrawals of funds into and from your Account, you shall only use credit cards and other financial instruments that are valid and lawfully belong to you.",
            "2.4.11. The computer software that we make available to you is owned by Prolific Trade N.V. or other third Parties and protected by copyright and other intellectual property laws. You may only use the software for your own personal, recreational uses in accordance with all rules, terms and conditions hereby established and in accordance with all applicable laws, rules and regulations.",
            "2.4.12. Games played on the Website should be played in the same manner as games played in any other setting. You shall be courteous to other players and representatives of Prolific Trade N.V. and shall avoid rude or obscene comments, including in chat rooms.",
          ],
        },
        {
          title: "3. Multi Accounts",
          desc: [
            "3.1. You can sign up (register) and use only one Account on the Website.",
            "3.2. Only one Account for each household, IP address and computer or device is allowed. If two or more users share the same household, IP address and computer or device we must be informed by the respective Accounts’ holders in advance.",
            "3.3. If you sign up or attempt to register more than one Account, for whatever reason, we may block or close any or all of your Accounts at our discretion. We may also void all the bets that have been placed in the duplicate Accounts, block bonuses and gifts and void withdrawal requests. In addition, any returns, winnings, or bonuses have been gained or accrued during the duplicate account lifecycle will be forfeited from you.",
          ],
        },
        {
          title: "4. Payouts",
          desc: [
            "4.1. When the outcome of a Game you participate in becomes determined or, where applicable, Prolific Trade N.V. has confirmed the relevant result of an event and settled the markets; all winnings will be available on your Account.",
            "4.2. If Prolific Trade N.V. mistakenly credits your Account with winnings that do not belong to you, whether due to a technical or human error or otherwise, the amount will remain property of Prolific Trade N.V. and the amount will be deducted from your Account. If prior to Prolific Trade N.V. becoming aware of the error you have withdrawn funds that do not belong to you, without prejudice to other remedies and actions that may be available at law, the mistakenly paid amount will constitute a debt owed by you to Prolific Trade N.V.. In the event of an incorrect crediting, you are obliged to notify Prolific Trade N.V. immediately.",
            "4.3. Prolific Trade N.V. will carry out additional verification and identification procedures for any withdrawal or reserves the right to carry such verification procedures at any level of withdrawals. All transactions will be checked to prevent money laundering.",
          ],
        },
        {
          title: "5. Deposits",
          desc: [
            "5.1. To have a possibility to place bets and play for real money you have to deposit money into your Account. You can deposit at any time online by using your debit or credit card, e-wallet, via a bank transfer or via all available deposit methods. All available deposit methods you can find in “Deposit page” on the Website. Cash or cheques are not an accepted method of deposit. Please note that some of the methods may not be available in some countries.",
            "5.2. You declare with each deposit that the to be deposited funds rightfully belong to you and that these funds have not been obtained or are derived from any illegal means. Prolific Trade N.V. retains the right to request additional source of funds based on a case-by-case basis.",
            "5.3. The maximum amount the player is allowed to deposit per day/ 24 hours is EUR 100.000,00 (or the equivalent in the Account currency). Any deposits above said maximum amount may be cancelled and returned by Prolific Trade N.V.",
            "Prolific Trade N.V. has the right to request you to provide to Prolific Trade N.V. source of funds when you make/have made a deposit of an amount greater than [EUR][1000] (or the equivalent in the Account currency).",
            "We accept payments in various currencies. Any payment received by Prolific Trade N.V. in a currency other than the currency of your Account will be converted into the currency of your Account, at the prevailing exchange rate. Please note that any exchange premiums are payable by you.",
            "5.4. Prolific Trade N.V. reserves the right to use additional procedures and means to verify your identity (KYC) when effecting deposits into an Account and to close an Account if you fail to send these documents to Prolific Trade N.V..",
            "5.5. Prolific Trade N.V. does not grant any credit for the use of its services.",
            "5.6. By depositing you confirm that all deposits are authorized and you won’t try to decline them or take any action which will cause such payment to be reversed by the third party, in order to avoid any legitimate liability.",
            "5.7. As a prevention of money laundering, a deposit must be wagered at least once before a withdrawal can be made. Please note that if wagering requirements are in place, the wagering requirement needs to be respected before a withdrawal is requested.",
            "5.8. Prolific Trade N.V. doesn’t allow making 3rd party deposits (by a friend, relative, partner, wife or husband). All payments have to be made from an Account/system or credit card that is registered on the Account holder. If the 3rd party deposits are noticed all winnings will be forfeited and sent back to Prolific Trade N.V., and the deposit will be returned to the rightful owner of an Account/credit card. If banking transfer requires a charge while returning money back to the rightful owner it will be paid by a receiver.",
          ],
        },
        {
          title: "6. Withdrawals",
          desc: [
            "6.1. You have to provide your KYC documents, credit card pictures (both sides, front and back. The card number should have the first 6 and last 4 digits of the card clearly readable, while the remaining digits of the card number and CVV / CVC code should not be visible) and bank statement, copy of a personal identification document, proof of address, proof of ownership of any other used payment method when claiming the withdrawal for the first time. Additional requirements depending on payment channels will apply.",
            "6.2. cN.V. reserves the right to change the maximum allowed sum for each payment system per one transaction at any time and without prior notification.",
            "6.3. A withdrawal request will not be processed until all wagering requirements have been met.",
            "6.4. It will not be possible to withdraw funds marked as “Bonus”, as well as funds stuck in an aborted game.",
            "6.5. Prolific Trade N.V. has the right to refuse withdrawal if the total bet amount is less than the amount of the last deposit. You have to turn over the initial deposit at least one time before being able to withdraw.",
            "6.6. All withdrawal requests are processed within two (2) banking days, but there are cases where these timing can be longer, depending on payment channels, additional account checks and public holidays.",
            "6.7. A user cannot withdraw funds in excess of his/her Account balance.",
            "6.8. Withdrawals will be made to your bank account or other withdrawal methods available to you in “Cashier”. The withdrawals are processed by the method used by the user to deposit funds into Account balance. You may only withdraw the maximum amount of €1.000.000,00 (or the equivalent in the Account currency) in any twenty-four-hour period unless a larger amount has been agreed upon between you and Prolific Trade N.V. Prolific Trade N.V. may reject a withdrawal request if the suspicion arises that funds are being withdrawn for any fraudulent or money laundering reasons, pending the investigation thereto.",
            "6.9. When a withdrawal is canceled, the funds are returned back to your Account and you can make use of those funds accordingly on the Account. Prolific Trade N.V. does not assume any responsibility for any funds lost during gameplay following a withdrawal cancellation either by you or by us.",
            "6.10. Please be advised that our products are consumed instantly during gameplay. Thus, we cannot provide refunds, returns of monies, or cancellation of the requested service when playing. If you play a Game with real money, the money will be drawn from your Account instantly.",
            "6.11. You may only withdraw the maximum amount of Euro 1.000.000,00 (or the equivalent in your Account currency) in any 24 hour and maximum amount of Euro 5.000.000,00 (or the equivalent in your Account currency) in a 30 days period unless a larger amount has been agreed by us.",
            "6.12. Prior to accepting a withdrawal we may request that you provide legal identification for example certified copies of passports, ID cards or other such documentation as we feel is required in the circumstances. We may also carry out phone verification, face verification or other such verification as is required to ensure that you are who you say you are.",
            "6.13. You can only have one pending withdrawal (ie. requested but not processed) per payment method at any one time. Furthermore, depending on the method used, you can make only one withdrawal request per 24 hours period.",
            "6.14. If you win more than Euro 5.000.000,00 (or the equivalent in your Account currency), Prolific Trade N.V. reserves the right to divide the payout into monthly instalments of maximum Euro 5.000.000,00 (or the equivalent in your Account currency), until the full amount is paid out. All progressive jackpot wins will be paid in full.",
            "6.15. The maximum daily winning amount for one Customer cannot exceed Euro 10.000.000,00 or the equivalent in your Account’s currency. The “day” means the time between 00:00 GMT and 23:59 GMT.",
          ],
        },
        {
          title: "7. Account Closure",
          desc: [
            "7.1. You may close your Account at any time and request a withdrawal of the balance of the Account, subject to the deduction of relevant withdrawal charges. To close your Account, you must first cancel any open bets if applicable, and contact the Website customer support. The effective closure of the Account will correspond to the termination of Prolific Trade N.V.. In case the reason behind the closure of the Account is related to concerns about possible gambling addiction you shall inform Prolific Trade N.V..",
            "7.2. The method of repayment will be at our absolute discretion.",
            '7.3. Prolific Trade N.V. reserves the right to close your Account and to refund to you the "Available to withdrawal" balance, subject to the deduction of relevant withdrawal charges, at Prolific Trade N.V.’s absolute discretion and without any obligation to state a reason or give prior notice',
            "7.4. Prolific Trade N.V. reserves the right to cancel and remove any bonus amount awarded to you if not been used within 1 month from the date awarded.",
            "7.5. Prolific Trade N.V. reserves the right to refuse a withdrawal claim in case of fraud, in which case an Account will be suspended and the payment not processed.",
            "7.6. Prolific Trade N.V. will review all player Accounts and classify them at its discretion. Once a player is classified as a “bonus hunter” or “bonus abuser”, all winnings and bonuses will be void and the Account will be suspended and the payment not processed.",
          ],
        },
        {
          title: "8. Personal Information7",
          desc: [
            "8.1. Criminal Activity In the case when any irregularity (including a suspicion of attempted money-laundering or fraud) has been noticed, Prolific Trade N.V. reserves the right to close Accounts and/or report about criminal or other suspicious activities provided through one or multi Accounts to the relevant existing regulatory or law enforcement authorities. All offenders’ Account balances will be blocked, withdrawals will be void, deposits and winnings will be forfeited.",
            "8.2. Collusion and cheating Prolific Trade N.V. is eligible to disable users Accounts and forfeit their Account balances (including deposits and winnings) if they will be noticed of gaining, attempting to gain an advantage of trading information of their cards or establishing a collusive agreement with other users to take an unfair advantage. These advantages may consist of chip dumping and transfer, discussing a hand during play, multiple using a single Account, soft playing. Prolific Trade N.V. provides the rigorous examination of play by both manual and automated ways and investigates all related user complaints. In addition, Prolific Trade N.V. provides proactively and randomly examining gameplays and Accounts.",
            "8.3. Fraudulent activity Once Prolific Trade N.V. noticed a fraudulent, unlawful, dishonest or improper activity (including using the VPN, proxy or similar service that masks or manipulates the identification of your real location, or making bets, wagers or poker play through a third party or on behalf of a third party) on the Website, we are eligible to block user’s Account with forfeiting of all Account balances without prior notification. In such cases, Prolific Trade N.V. reserves the right to report fraudulent activity to existing regulatory and law enforcement authorities including but not limited to banks, credit card companies and/or any person or entity that has the legal right to such information, and/or taking legal action against such user.",
          ],
        },
        {
          title: "9. Crashed & Aborted Games",
          desc: [
            "9.1. Criminal Activity",
            "In the case when any irregularity (including a suspicion of attempted money-laundering or fraud) has been noticed, Prolific Trade N.V. reserves the right to close Accounts and/or report about criminal or other suspicious activities provided through one or multi Accounts to the relevant existing regulatory or law enforcement authorities. All offenders’ Account balances will be blocked, withdrawals will be void, deposits and winnings will be forfeited.",
            "9.2. Collusion and cheating",
            "Prolific Trade N.V. is eligible to disable users Accounts and forfeit their Account balances (including deposits and winnings) if they will be noticed of gaining, attempting to gain an advantage of trading information of their cards or establishing a collusive agreement with other users to take an unfair advantage. These advantages may consist of chip dumping and transfer, discussing a hand during play, multiple using a single Account, soft playing. Prolific Trade N.V. provides the rigorous examination of play by both manual and automated ways and investigates all related user complaints. In addition, Prolific Trade N.V. provides proactively and randomly examining gameplays and Accounts.",
            "9.3. Fraudulent activity",
            "Once Prolific Trade N.V. noticed a fraudulent, unlawful, dishonest or improper activity (including using the VPN, proxy or similar service that masks or manipulates the identification of your real location, or making bets, wagers or poker play through a third party or on behalf of a third party) on the Website, we are eligible to block user’s Account with forfeiting of all Account balances without prior notification. In such cases, Prolific Trade N.V. reserves the right to report fraudulent activity to existing regulatory and law enforcement authorities including but not limited to banks, credit card companies and/or any person or entity that has the legal right to such information, and/or taking legal action against such user.",
          ],
        },
        {
          title: "10. Live Chat",
          desc: [
            "10.1. As part of your use of the Website, Prolific Trade N.V. may provide you with a chat facility, which is moderated by us and subject to controls. We reserve the right to review the chat and to keep a record of all statements made on such a facility. Your use of the chat facility should be for recreational and socializing purposes, and is subject to the following rules.",
            "10.2. You shall not make any statements that are sexually explicit or grossly offensive, including expressions of bigotry, racism, hatred, or profanity.",
            "10.3. You shall not make statements that are abusive, defamatory or harassing or insulting to the Website or Prolific Trade N.V..",
            "10.4. You shall not make statements that advertise, promote or otherwise relate to any other online entities.",
            "10.5. You shall not make statements about Prolific Trade N.V., the Website, or any other Internet site(s) connected to Prolific Trade N.V. that are untrue and/or malicious and/or damaging to Prolific Trade N.V..",
            "10.6. You shall not collude through the chat rooms or separate chat. Any suspicious chats will be reported to the relevant regulatory or law enforcement authority.",
            "10.7. In the event if you breach any of the above provisions relating to the chat facility, Prolific Trade N.V. shall have the right to remove the chat room or immediately terminate your Account. Upon such termination, Prolific Trade N.V. shall refund to you any funds which may be in your Account over and above any amount which may be owing to us at such time (if any).",
          ],
        },
        {
          title: "11. Crashed & Aborted Games",
          desc: [
            "11.1. Prolific Trade N.V. is not liable for any downtime, server disruptions, lagging, or any technical or political disturbance to the gameplay. Refunds may be given solely at the discretion of Prolific Trade N.V..",
            "11.2. Prolific Trade N.V. shall accept no liability for any damages or losses which are deemed or alleged to have arisen out of or in connection with Website or its content, including without limitation, delays or interruptions in operation or transmission, loss or corruption of data, communication or lines failure, any person's misuse of the Website or its content or any errors or omissions in content.",
            "11.3. In the event of a casino system malfunction, all wagers are void.",
            "11.4. In the event a Game is started but miscarried because of a failure of the system, Prolific Trade N.V. shall refund the amount wagered in the Game to you by crediting it to your Account or, if an Account no longer exists, by paying it to you in an approved manner; and if you have an accrued credit at the time the Game miscarried, credit to your Account the monetary value of the credit or, if an Account no longer exists, pay it to you in an approved manner.",
          ],
        },
        {
          title: "12. Duties",
          desc: [
            "12.1. Prolific Trade N.V. reserves the right to assign or otherwise lawfully transfer its rights and obligations under the Terms. You shall not assign or otherwise transfer your rights and obligations under these Terms.",
          ],
        },
        {
          title: "13. Complaints",
          desc: [
            "13.1. If you have a complaint, you can Telegram to the Website customer support at Official" +
            this.$config.site_name +
            ".",
            "13.2. Prolific Trade N.V. will use best efforts to resolve a reported matter promptly.",
            "13.3. If you have a query with regard to any transaction you may contact Prolific Trade N.V. at Official" +
            this.$config.site_name +
            "with details of the query. We will review any queried or disputed transactions. Our judgment is final.",
          ],
        },
        {
          title: "14. Agreement & Admissibility",
          desc: [
            "14.1. These Terms, the Privacy Policy, the Cookies Policy and any document expressly referred to in them and any guidelines or rules posted on the Website constitute the entire agreement and understanding between you and Prolific Trade N.V. with respect to this Website and save in the case of fraud it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between you and Prolific Trade N.V. with respect to this Website.",
            "14.2. A printed version of these Terms and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relate to these Terms to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form.",
            "14.3. If any provision of these Terms is held to be illegal or unenforceable, such provision shall be severed from these Terms and all other provisions shall remain in force unaffected by such severance.",
            "14.4. In case of inconsistency of textual content between language versions, the English version of the Website shall prevail.",
            "14.5. These Terms are governed by the laws of Curacao and the parties agree to the jurisdiction of the Curacao courts and to the rules of arbitration in accordance with applicable law.",
          ],
        },
        {
          title: "15. Copyright",
          desc: [
            "15.1. We are the sole owners of the trademark Prolific Trade N.V. and the Prolific Trade N.V. logo. Any unauthorized use of the Prolific Trade N.V. trademark and the Prolific Trade N.V. logo may result in prosecution. ",
            "15.2. " +
            this.$config.display_url +
            " is the uniform resource locator of the Website operated by Prolific Trade N.V. and no unauthorized use may be made of this URL on another website or digital platform without our prior written consent.",
            "15.3. Prolific Trade N.V. is the owner or the rightful licensee of the rights to the technology, software and business systems used within this Website.",
            "15.4. The contents and structure of the Prolific Trade N.V. ́s Website pages belong to Prolific Trade N.V., all rights reserved. The copyright in this Website including all text, graphics, code, files, and links belongs to Prolific Trade N.V. and the site may not be reproduced, transmitted or stored in whole or in part without our written consent. Your registration and use of our system do therefore not confer any rights whatsoever to the intellectual property contained in our system.",
            "15.5. Links to the Website and any of the pages therein may not be included in any other website without the prior written consent of Prolific Trade N.V..",
            "15.6. You agree not to use any automatic or manual device to monitor the Website pages or any content therein.",
            "15.7. Any unauthorized use or reproduction may be prosecuted",
          ],
        },
        {
          title: "16. Promotions: Terms &amp; Conditions",
          desc: [
            "16.1. Every individual promotion will come with its own set of specific promotional terms and conditions (the “Promotional Terms”) in addition to these Terms. You should therefore read these Terms in combination with the applicable Promotional Terms for any competition, bonus or promotion you wish to enter.",
            "16.2. By participating in promotions you agree to be bound by these Terms and Promotional Terms.",
            "16.3. If for any reason, a promotion does not have the Promotional Terms, such promotion will by default be governed by these Terms.",
            "16.4. Each of the Promotion Terms regulating the implementation of any promotion is independent of the rest of the Terms. In case if one of the provisions being unsuitable or incorrect, the remaining Promotion Terms remain in force.",
            "16.5. Participation in a promotion will be deemed to constitute full and unconditional acceptance of the Terms which includes these Promotional Terms and any applicable Promotional Terms and that our decisions are final and binding in all respects.",
            "16.6. Prolific Trade N.V. reserves the right to terminate or cancel any current promotion without prior notification. Any user who infringes the Promotional Terms will be disqualified from any reward derived from said promotion.",
            "16.7. Prolific Trade N.V. has the rights to withhold any credits, bonuses, coupons, loyalty points or prizes awarded as part of a promotion at its own discretion.",
            "16.8. Prolific Trade N.V. has the right to inform users about current promotions or any updates by email, SMS, chat, Whatsapp, social media, mobile phone, Internet browser notification or mobile application. ",
            "16.9. Prolific Trade N.V. disclaims any liability for inaccurate information, whether caused by the Website, user's equipment used in a promotion, or by human or technical errors related to the submission of entries. ",
            "16.10. Bonuses and Bonus money",
            "16.10.1 Prolific Trade N.V. regularly offers you different bonuses and rewards that are credited to your Account. A reward at Prolific Trade N.V. can mean free spins, cashback, free bet, extra money to play directly and the extra money you receive after making a deposit. A bonus usually follows with the wagering requirements that have to be met in order to withdraw the funds. In these cases, we recommend you to read the bonus rules before using.",
            "16.10.2. Bonus rules",
            "16.10.2.1. A bonus is awarded the bonus balance.",
            "16.10.2.2. When the wagering requirements for the bonus are met the bonus amount is transferred to the main balance and may be withdrawn at any time.",
            "16.10.2.3. Prolific Trade N.V. reserves the right to take punitive measures against users who abuse bonuses and rewards, namely: delete, decline all current bonuses and bonus winnings; to block the user's Account immediately. In that case, Prolific Trade N.V. disclaims any liability for the withdrawal or compensation of the funds that had been on the Account before it was blocked. ",
            "16.10.2.4. Any outside bet spread combination on Roulette games covering 24 or more (64%) of the 37 unique number spots on the table. E.g. betting on Red and Black - covers 36 of the 37 possible outcomes - in this case all winnings and bonuses will be voided.",
            "16.10.2.5. Using bonuses to play games with accumulated benefits in the course of gameplay (Ex: Free Spins meters or other game features unlocked following some gameplay) and coming back to the game following the zeroing-out of the wagering requirements to trigger or unlock the feature and collect the accumulated benefits or related winnings - in this case all winnings and bonuses will be voided.",
            "16.10.2.6. The funds won using bonuses cannot be withdrawn until all bonuses are wagered",
            "16.10.2.7. Malfunction voids all pays and plays. Prolific Trade N.V. has a right to withdraw any winnings caused by malfunction up to the latest deposits.",
            "16.10.2.8. Users should read and be aware of any applicable bonus policy and follow its terms in order to receive the bonus.",
            "16.10.2.9. All bonuses have an expiry date. The standard expiry date for bonus money is 30 days. The expiry date can differ for specific bonuses. In such an event, the expiry date will be indicated in the relevant bonus’ terms and conditions. Betting requirements need to have been fulfilled at the expiry date. We may cancel or debit bonus credit from the player Account after the expiry date.",
            "16.10.2.10. The standard betting requirement for casino bonus money is 35 times the bonus amount received and for sportsbooks it is 35 times the bonus amount received. This may differ for specific promotions provided that it is specified accordingly in the relevant terms and conditions.",
            "16.10.2.11. The wagering requirements of a bonus means the total amount of bets you must stake before the bonus and any accrued winnings are transferred into your cash balance and can be withdrawn. The wagering requirements for each bonus are set out in the specific terms for the bonus and will be expressed as a multiple of the bonus amount, or of the bonus plus the deposit amount. The wagering requirement for bonuses will be set out in the terms specific to that bonus. Not all bets will count towards the wagering requirements. Bets on Blackjack, Roulettes, Arcade games (Heads or Better, Dice Twister, etc) Video poker games (Jacks or Better, Aces and Faces, etc), Baccarat, Casino Hold'em, 2 Ways Royal, Craps and Sic Bo games contribute 25% of actual wagering on these games towards your wagering requirements. Table games wagering contribution is 25%, Sic Bo, Royal Craps, Baccarat, Red dog 0%. Most of Slot games contribute 50%. Blaze Originals contribute 100% towards the wagering requirements These percentages can be changed from time to time so please make sure to contact the Website customer support each time to find out a certain game’s wagering contribution. ",
            "16.11. Wagering requirements",
            "16.11.1. After getting the bonus it is transferred to the bonus balance up to the moment of reaching the wagering requirements.",
            "16.11.2. The wagering requirements are a multiplier that represents the number of times you have to play a bonus before you are able to withdraw any winnings. After reaching the wagering requirements, a bonus or accrued winnings are transferred into main balance.",
            "16.11.3. Wagering requirements for bonuses will be null when the balance is lower than Euro 0.01 (or the equivalent in your Account currency).",
            "16.11.4. The funds won using bonuses cannot be withdrawn until all bonuses are wagered.",
            "16.11.5. You can make a withdrawal before you have fulfilled the wagering requirements, but then you will lose your bonus money. If you decide to make such a withdrawal you have to contact the Website customer support team.",
            "16.11.6. Every user has the right to abandon the bonuses by making the request to Website customer support in order to zero the bonus balance.",
            "16.12. Free Spins With free spins, you get to play free on a game on the Website with the same chance of winning as when you play with your real money. Winnings on free spins are converted to bonus money or real money. When converted to bonus money you will need to wager the bonus money 35 times before it is transferred to your cash balance after which it can be withdrawn. ",
          ],
        },
        {
          title: "17. Sports Betting Rules",
          desc: [
            "17.1. Prolific Trade N.V. accepts bets or/and wagers for sporting events that are presented on the Website. All such bets/wagers are subject to the rules applicable to each sport, e.g. Basketball, Tennis, E-Sports, etc.",
            "17.2. You cannot make wagers exceeding your Account balance.",
            "17.3. Once a bet has been placed and confirmed, a user cannot change or cancel a bet. It is therefore in the user’s interest to ensure that all details of their bet are correct before placing a bet. ",
            "17.4. Before an event starts, Prolific Trade N.V. reserves, at its own discretion, the right to void or cancel part or whole of a bet even after its acceptance without providing any reason to the user. After the event start, Prolific Trade N.V. reserves, at its own discretion, the right to void or cancel part or whole of a bet, even after its acceptance if there is a valid reason for this, such as: - a mistake in the wording (palpable error) of the event, odds or starting time; - the user attempt to bypass Prolific Trade N.V. limits (potential payout) and risk management by placing multiple, identical or similar bets or opening multiple Accounts; - the user is getting an advantage of any public announcement or secret information he has access to that determines the outcome of the bet; - the user combines related bets; - the user is actively participating in the event, e.g. as a Player, Referee, Manager or has direct or indirect relationship with events participants; - Website suffers a technical error offering wrong odds or events; - any other valid reason duly communicated to the user upon request.",
            "17.5. Prolific Trade N.V. reserves the right to cancel all bets of an event, if there is any change regarding the venue of the event.",
            "17.6. Prolific Trade N.V. reserves the right to cancel all bets if there are radical changes in the circumstances of an event such as the length of playing time, the distance in a race speed or the number of periods, etc.",
            "17.7. Winnings will be credited to the user Account following confirmation of the final result.",
            "17.8. The outcome of a market is settled once this is determined. Prolific Trade N.V. takes the right to settle the game results in case a market is not determined earlier in the game. This rule works in terms of the normal duration of the match being concluded and if no any conditions are stated in the market description on the Website. For example: Example 1: Match-winner 1X2 market of an event is determined after the end of the normal duration (regular time) of the event. Football (Soccer) 1x2 Match Winner is determined after the 90 min, including any extra minutes called by the referee of the match as “normal duration”. When the game is played in Overtime (the regular time cannot determine the winner), all markets state that this is a subject to pay “include overtime” after completion of the game. If there are any penalty kicks (or other decisive moments) they’re not taken into consideration, unless another stated in the market. If the beginning of the game is delayed for whatever reasons, the event can be kept open and all bets can remain open 48 hours from the official Version: 16th November 2021 start time. evertheless, Prolific Trade N.V. reserves the right to void such bets on its direction and refund the Users’ stakes back. All bets can remain open and be calculated due to the game results by the decision of Prolific Trade N.V. when the organizer continues the abandoned event within 48 hours after starting time. In case the abandoned event does not continue with the decision of the organizer within 48 hours after its starting, Prolific Trade N.V. will settle all determined markets that were completed on the pitch. In addition, Prolific Trade N.V. will cancel another and refund the stakes to players. There are exceptions to the general rule: The 48 hours rule is not supported in the Tennis games. All bets are vailable until the referee or official representative determines the winner. Nevertheless, there are cases in which a player retires. In this situation, all markets that are determined on the court are settled accordingly and all the rest declared void and stakes returned to players. If there are any doubts about the retirement of a player before the last point is concluded, the market of the match winner is cancelled. Nevertheless, all markets that relate to the specific sets or games that are determined, are settled accordingly. Baseball games. The 48 hours rule is supported. When two teams are playing 2 games in a row they are considered as Game 1 and Game 2 and will be settled as chronologically played with all bets valid. For the avoidance of doubt, if Team A plays Team B twice, the result of Game 1 will count for bets offered on Game 1 as originally scheduled and the result of Game 2 will count for bets offered on Game 2, as originally scheduled. The 48 hours rule is valid. (e.g. if a football match is abandoned in the second half, the markets of the first half will be settled normally). (e.g. in the example above, the markets of the second match have not decided) will be void and stakes will be refunded to customers. ",
            "17.9. Explanation of specific Betting Types If there is at least one Scorer when the match is abandoned, all bets made on the first Goalscorer will be applied and on the last will be canceled. A player will be determined as a winner according to Goalscorer market at any time, and other players’ bets are void. Head 2 Head Bets These bets mean the prediction about taking the higher position, getting more points or results between two players. Head 2 Head bets will work if both players will do the best in the event. If two players get the same result or play out a draw, all bets will be void. Outright Bets These bets mean the prediction about taking the higher position, getting more points or results among the players (3+). Outright bets will work if all participants will actively take part in the event. If there are participants that do not take part in the event, all odds that were placed on other participants will be amended and settled with a reduction in the odds. The reduction includes the same margin applied to the missing participants. If two or more participants take the same result (play in a draw), the applicable odds will be equal to the accepted odds divided by the number of tie participants (e.g. with equal odds 2.70 and three tie participants the final odds will be: 2.70 / 3 = 0.90), unless the official representative chooses only one winner with an additional statistic criterion (e.g. assists). Booking markets These are yellow and red cards. The yellow one counts as one card and the red - two. If a player gets two yellow cards in a row that are changed into a red card, this counts as three cards. In general, a player cannot receive more than three cards. A settlement will be based on all available card data that will appear during the normal event’s playing time. The cards are shown after the final whilst won’t be considered. The cards of a player who did not take part in the game (players that have already been replaced, coaches, players on the bench who have not taken part in the game) will not be considered. Booking markets with points In general, a player cannot get over 35 points during the game. A yellow card brings 10 points, the red one is counted as 25 points, and the second yellow-red card– 25. The second yellow card for a player who leads to a red card is not counted. Corners The corners are considered for the relevant market Version: 16th November 2021 settlement only if they have been taken. If the corner is given but not taken, it will not be counted. Intervals The period from 00:01 until the completion of the minute indicated as the end minute is stated as the first interval. To exclude doubts, the interval 1-15 min is considered the period from 00:01 to 15:00 and the interval 30-45 min is considered the period from 30:01 until the end of the First Half accordingly. The interval 75-90 min is considered the period from 75:01 to the end of Full Time. The referee on its direction considered the last time interval from the minute indicated until the end of the period.",
            "17.10. Bets by order and from bookmakers as well as betting agents are not permitted. Bets on events in which the bettor is participating (“participating” in this sense relates to those persons involved as a sportsperson, athlete, as an owner, trainer or functionary of a participating club) or those which are commissioned by any person participating, are not permitted. In addition, bets on league, cup or other events in which the respective club/ organization is participating may not be placed or commissioned by those persons considered to be participating in the respective event. In the case of violation of these regulations, Prolific Trade N.V. reserves the right to refuse payment of any winnings and already invested stakes as well as to cancel any bets. Prolific Trade N.V. takes no responsibility for knowing if the user is a member of one of the mentioned groups. This means that Prolific Trade N.V. is entitled to undertake any necessary measures at any time after the user has become known as being a member of one of the mentioned groups.",
            "17.11. Live scoreboard details added on Prolific Trade N.V. are for information purposes and are not a basis for settlement. All persons should ensure scoreboard details are correct before placing their bets.",
          ],
        },
        {
          title: "18. NetEnt",
          desc: [
            "1. Absolute Restriction NetEnt will not permit NetEnt Casino Games to be supplied to any entity that operates in any of the below jurisdictions (irrespective of whether or not NetEnt Casino Games are being supplied by the entity in that jurisdiction) without the appropriate licenses. Belgium, Bulgaria, Colombia, Croatia, Czech Republic, Denmark, Estonia, France, Italy, Latvia, Lithuania, Mexico, Portugal, Romania, Spain, Sweden, Switzerland, United Kingdom, United States of America.",
            "2. Blacklisted Territories All NetEnt Casino Games may not be offered in the following territories: Afghanistan, Albania, Algeria, Angola, Australia, Bahamas, Botswana, Belgium, Bulgaria, Colombia, Croatia, Czech Republic, Denmark, Estonia, Ecuador, Ethiopia, France, Ghana, Guyana, Hong Kong, Italy, Iran, Iraq, Israel, Kuwait, Latvia, Lithuania, Mexico, Namibia, Nicaragua, North Korea, Pakistan, Panama, Philippines, Portugal, Romania, Singapore, Spain, Sweden, Switzerland, Sudan, Syria, Taiwan, Trinidad and Tobago, Tunisia, Uganda, United Kingdom, United States of America, Yemen, Zimbabwe.",
            "3. Blacklisted Branded Games Territories The followed NetEnt Braded Games have some further restrictions in addition to the Blacklisted Territories set out above: 3.1 In addition to the jurisdictions set out in paragraph 2, Planet of the Apes Video Slot must not be offered in the following territories: Azerbaijan, China, India, Malaysia, Qatar, Russia, Thailand, Turkey, Ukraine.",
            "3.2 In addition to the jurisdictions set out in paragraph 2, Vikings Video Slot must not be offered in the following jurisdictions: Azerbaijan, Cambodia, Canada, China, France, India, Indonesia, Laos, Malaysia, Myanmar, Papua New Guinea, Qatar, Russia, South Korea, Thailand, Turkey, Ukraine, United States of America.",
            "3.3 In addition to the jurisdictions set out in paragraph 2, Narcos Video Slot must not be offered in the following territories: Indonesia, South Korea.",
            "3.4 In addition to the jurisdictions set out in paragraph 2, Street Fighter Video Slot must not be offered in the following territories: Anguilla, Antigua &amp; Barbuda, Argentina, Aruba, Barbados, Bahamas, Belize, Bermuda, Bolivia, Bonaire, Brazil, British Virgin Islands, Canada, Cayman Islands, China, Chile, Clipperton Island, Columbia, Costa Rica, Cuba, Curacao, Dominica, Dominican Republic, El Salvador, Greenland, Grenada, Guadeloupe, Guatemala, Guyana, Haiti, Honduras, Jamaica, Japan, Martinique, Mexico, Montserrat, Navassa Island, Paraguay, Peru, Puerto Rico, Saba, Saint Barthelemy, Saint Eustatius, Saint Kitts and Nevis, Saint Lucia, Saint Maarten, Saint Martin, Saint Pierre and Miquelon, Saint Vincent and the Grenadines, South Korea, Suriname, Turks and Caicos Islands, United States of America, Uruguay, US Virgin Islands, Venezuela.",
            "3.5 In addition to the jurisdictions set out in paragraph 2, Fashion TV Video Slot must not be offered in the following territories: Cuba, Jordan, Turkey, Saudi Arabia. ",
            "4. Universal Monsters (Dracula, Creature from the Black Lagoon, Phantoms Curse and The Invisible Man) may only be played in the following territories: ",
            "Andorra, Austria, Armenia, Azerbaijan, Belarus, Bosnia and Herzegovina, Cyprus, Finland, Georgia, Germany, Greece, Hungary, Iceland, Ireland, Liechtenstein, Luxembourg, Malta, Moldova, Monaco, Montenegro, Netherlands, North Macedonia, Norway, Poland, Russia, San Marino, Serbia, Slovakia, Slovenia, Turkey and Ukraine.",
            "19. The customer of the client is prohibited to transfer or sell their accounts to another person. This prohibition includes the transfer of any assets of value of any kind, such as however not limited to ownership of accounts, winnings, deposits, bets, rights and/or claims in connection with these assets, legal, commercial or otherwise. The prohibition on said transfers also includes however is not limited to the encumbrance, pledging, assigning, usufruct, trading, brokering, hypothecation and/or gifting in cooperation with a fiduciary or any other third party, company, natural or legal individual, foundation and/or association in any way shape or form. ",
          ],
        },
        {
          title: "19. RESPONSIBLE GAMING",
          desc: [
            "a. Gambling while under the age of 18 is a criminal offence, and we take our responsibilities to prevent access for those under the age of 18 very seriously. Prolific Trade N.V. reserves the right to request proof of age documentation from any user at any time and any winnings will be confiscated if on completion of age verification the customer is shown to be underage.",
            "b. At Prolific Trade N.V., we encourage our users to enjoy gambling in a responsible manner. However, we do recognise that gambling can become addictive and may lead to problem gambling or even addiction for some people. In order to ensure users play responsibly, we offer a range of tools that can be used to control play, such as different types of limits or short breaks. For more information, please see our Responsible Gaming page. ",
            "c. In order to set or manage the Responsible Gaming limits, you must log in to your Account. If you find that controlling your play with the available tools is not sufficient, we recommend that you consider a break or self-exclusion. ",
            "d. Self-exclusion enables you to suspend yourself from using our services.",
            "Prolific Trade N.V. has the following effective periods available for self-exclusion: ",
            "(a) 24 hours",
            "(b) Three days",
            "(c) One week",
            "(d) 30 days",
            "(e) indefinite period",
            "In order to exclude for an indefinite period, you will be requested to contact Prolific Trade N.V. directly. ",
            "e. It is your responsibility to adhere to any self-exclusion agreement, though we are happy to help by blacklisting addresses and devices where possible (please note, this is not always possible due to technical restrictions).",
            "f. The effectiveness of any self-exclusion agreement depends largely on your commitment to manage your own behaviour. An exclusion will be most effective if you agree not to attempt to register again. Please be advised that exclusion should not be intended to function as a replacement for you managing your own behaviour or as a full guarantee to stop you from further gambling.",
            "g. During a self-exclusion period, every attempt will be applied to prevent you from creating a duplicate account, and any account detected with a clear link to an account under self-exclusion will be closed upon detection, and any remaining unused balances returned to the original depositing source.",
            "h. A written request must be submitted to customer support, should you wish to cancel a self-exclusion or reopen your account. Please be advised that Prolific Trade N.V. reserves the right to keep accounts closed or deny a reopening request, in order to maintain the safety of a player, as per the decision made by our Responsible Gaming Department.",
            "i. By accepting these Terms, you acknowledge and confirm that you are not excluded from our service. Therefore, no deposits, losses or winnings will be owed/refunded to you if associated with a fraudulently created additional/duplicate account, except for remaining unused balances from deposits, which will be refunded in full. To fully investigate such cases, Prolific Trade N.V.’s Responsible Gambling or Fraud Departments are entitled to request additional forms of documentation such as but not limited to, ID in hand and phone/voice verification.",
            "j. By playing games or using the gambling services at Prolific Trade N.V., you acknowledge that you are playing games based on, or betting on events that are subject to, luck and chance and that through the use of the service and/or software, you are subject to the risk of losing money. Thus, you accept that any losses suffered are the sole responsibility of yourself.",
            "k. Our websites include links to external third-party organisations and information that may be helpful to problem gamblers in need of further assistance from professionals. If you feel that you might be developing a gambling addiction or problem, we encourage you to consult these organisations. Please also contact us directly should you feel that gambling has affected your life in a negative way or recognise that you have any gambling issues. In order to protect the wellbeing of those affected by problem gambling who are in a critical situation and are expressing suicidal thoughts to our agents via direct communication, we reserve the right to contact relevant local authorities to seek immediate action.",
            "l. Please note, 'idle time' is reached after 40 minutes of no activity, at which point users will be logged out automatically. It is the responsibility of individual users to maintain the security of their accounts by making sure that no one else has access to their passwords or login details. We recommend that users always log out if their device is potentially accessible by others, especially minors or those with known gambling problems.",
            "m. If at the time of requesting self-exclusion there are still outstanding bets, where the result is not yet known, such bet/s that subsequently win will have winnings sent once the event has been settled.",
            "n. If the user has a reason to believe that a person under the age of 18 years is accessing our services, please contact us immediately. Our support team can be contacted via email: [email address] or through LiveChat via our website.",
            "o. Please be advised that all sensitive data related to problem gambling or exclusion has to be collected and kept on records to carry out our statutory functions related to affected individuals.",
            "p. Prolific Trade N.V. monitors all communication channels and thoroughly reviews all submitted documents. Based on the information provided or communicated by the player, Prolific Trade N.V. reserves the right to suspend the player's account if the player exhibits signs of problem gambling.",
          ],
        },
        {
          title: "19. Account Transfer",
          desc: [
            "You are prohibited to transfer or sell your Account to another person. This prohibition includes the transfer of any assets of value of any kind, such as however not limited to ownership of accounts, winnings, deposits, bets, rights and/or claims in connection with these assets, legal, commercial or otherwise. The prohibition on said transfers also includes however is not limited to the encumbrance, pledging, assigning, usufruct, trading, brokering, hypothecation and/or gifting in cooperation with a fiduciary or any other third party, company, natural or legal individual, foundation and/or association in any way shape or form",
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
@import "/assets/scss/web/termsOfService.scss";
@import "/assets/scss/mobile/termsOfService.scss";
</style>
