<template>
  <div class="affiliate-term-conditions">
    <div class="affiliate-term-conditions-content">
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
        <div class="left-item" @click="handleUrl('/welcomeBonus')">
          {{ $tt("welcomeBonus") }}
        </div>
        <div
          class="left-item selected"
          @click="handleUrl('/affiliateTermsAndConditions')"
        >
          {{ $tt("affiliateTermsNConditions") }}
        </div>
      </div>
      <div class="mobile-header mobile">
        <div @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="title">{{ $tt("affiliateTermsNConditions") }}</div>
      </div>
      <div class="content-right">
        <h1>Version 1.0</h1>
        <h1>Effective Date: 21th of April 2022</h1>
        <ul>
          <li>
            It is important that you (the “Affiliate”, “You”) read and
            understand these Terms and Conditions and Privacy Policy before
            using these services.
          </li>
          <li>
            Your acceptance of these Terms and Conditions forms a binding
            contractual agreement between you and Prolific Trade N.V., the
            operator of Blaze.com
          </li>
          <li>
            When using this website and/or registering you agree to be legally
            bound by, and comply with, Blaze Affiliates Terms and Conditions and
            Privacy Policy.
          </li>
          <li>
            If you do not agree to the following Terms and Conditions and
            Privacy Policy, you should discontinue your application.
          </li>
        </ul>
        <br />
        <h1>DEFINITIONS</h1>
        <h2>Admin Fee</h2>
        <p>
          The value of Jackpot contributions, Games and Platform costs and
          operating costs.
        </p>
        <h2>Agreement</h2>
        <p>
          These Terms and Conditions, Privacy Policy and, where applicable, any
          other contractual document concluded between the Parties in relation
          to the Affiliate Programme. To the extent that the said contractual
          document is governed by these Terms and Conditions, any reference to
          ‘the Agreement’ as included therein shall also mean a reference to
          these Terms and Conditions and the Privacy Policy. Further, any
          reference to ‘this Agreement’ in these Terms and Conditions shall also
          include and refer to such contractual document.
        </p>
        <p>
          For the avoidance of doubt, these Terms and Conditions shall supersede
          any other terms and conditions applicable to such contractual
          documents concluded between the Parties.
        </p>
        <h2>Affiliate</h2>
        <p>
          A person (whether an individual or a company) who has registered and
          been accepted by Blaze as an Affiliate in order to promote Blaze
          Affiliate brands through affiliate links.
        </p>
        <h2>Affiliate Network</h2>
        <p>
          An individual and/or entity which You have a business relationship
          with and who operates for You with the intention of driving traffic to
          Blaze brands, or that You direct in any appropriate manner to Blaze
          brands and who does not have an account directly with Blaze but is
          connected to Your account. For the avoidance of doubt, this shall not
          include Sub-Affiliates.
        </p>
        <h2>Affiliate Payment</h2>
        <p>Any Revenue Share, Hybrid Payment and/or CPA Payments.</p>
        <h2>Affiliate Program</h2>
        <p>The Affiliate Program is operated by Blaze.</p>
        <h2>Affiliate Law</h2>
        <p>
          All laws, statutes, regulations, edicts, bylaws, mandatory codes of
          conduct and mandatory guidelines – whether local, national,
          international or otherwise existing from time to time – which are
          legally binding on either Party and which are applicable to that
          Party’s rights or obligations under this Agreement.
        </p>
        <h2>Application</h2>
        <p>
          Your application to join the Affiliate Program via the Affiliate
          Program site.
        </p>
        <h2>Balances Carried Over</h2>
        <p>
          In the calculation of Commission where Net Win is negative due to
          Customer winnings and/ or Admin Fees and/ or Cash Items and/ or
          Progressive Contributions the said balance will be set to zero. A
          negative balance due to Fraud Costs will however be carried over where
          applicable.
        </p>
        <h2>Brands</h2>
        <ul>
          <li>Blaze.com</li>
        </ul>
        <p>
          All Blaze Brands including without limitation any and all of the
          trademark registrations/applications of the Group, any taglines or
          marketing slogans used by the Group, as well as any other brands
          (whether registered or unregistered) owned and /or used by the Group,
          as may be indicated by Blaze from time to time.
        </p>
        <h2>Chargeback</h2>
        <p>
          The reversal of a payment made previously to Brands by a Referred
          Player or the credit card-issuing bank or any other third-party
          payments solution provider. Chargebacks are regarded as Fraud for the
          purposes of calculating net revenues.
        </p>
        <h2>Commencement Date</h2>
        <p>
          The date on which Blaze confirms Your application to join the
          Affiliate Program has been accepted.
        </p>
        <h2>CPA Deal</h2>
        <p>
          A Cost-Per-Acquisition deal, whereby Brands pays You a predetermined
          amount for each Referred Player. CPA deals will undergo a trial period
          to ensure affiliates are providing Roots Brands with legitimate and
          profitable traffic.
        </p>
        <h2>Customer/Player</h2>
        <p>
          An individual referred or directed by You in any appropriate manner to
          a Product offered by Blaze who can be linked to Your (or Your
          organisation’s) Affiliate account and/or identity who registers a
          Customer account with 9aze brands. By opening an account with Blaze
          brands, that Player will become Our customer and must comply with all
          Our applicable rules, policies, and operating procedures.
        </p>
        <h2>Fees</h2>
        <p>
          The amounts due to You by Us in exchange for the provision of the
          services in accordance with the conditions of this Agreement,
          calculated under the Revenue Share, CPA, or Hybrid model, as the case
          may be.
        </p>
        <h2>Fraud</h2>
        <p>
          Any form of fraud committed by a Referred Player, which in the sole
          opinion of Brands, is deliberately practiced by a Referred Player
          and/or an Affiliate in order to secure a real or potential, unfair or
          unlawful gain, including but not limited to:
        </p>
        <ul>
          <li>Fraud costs;</li>
          <li>Chargebacks;</li>
          <li>
            Bonus abuse by a Referred Player or group of Referred Players;
          </li>
          <li>
            Your (or a third party’s) encouragement to a Referred Player to
            abuse Our bonus offers;
          </li>
          <li>
            Collusion on the part of the Referred Player with any other Referred
            Player;
          </li>
          <li>
            Your (or a third party’s) offering or providing unauthorised
            incentives (financial or otherwise) to Players to encourage them to
            sign up;
          </li>
          <li>Dropping or stuffing cookies.</li>
          <li>Fraud Costs</li>
          <li>
            The costs incurred (financial or otherwise) by Brands as a direct or
            indirect result of Fraud by committed by You, Your employees,
            Sub-Affiliates, business partners, Customers, and/or third parties
            liked to Your affiliate Account to whom You, as an Affiliate, have
            introduced Our Products.
          </li>
        </ul>
        <h2>Gross Win</h2>
        <p>
          The total revenue generated by any Blaze brand Products as a result of
          all bets and/or deposits by Referred Players introduced to Brands by
          You.
        </p>
        <h2>Group</h2>
        <p>
          Any and all of the companies forming part of the Prolific Trade N.V.
          and associated with the Brand.
        </p>
        <h2>Intellectual Property</h2>
        <p>
          Any and all intellectual property rights, of all types or nature
          whatsoever, including, without limitation, patent, copyright, design
          rights, trademarks, word marks, database rights, applications for any
          of the above, moral rights, know-how, trade secrets, domain names,
          URL, trade names or any other intellectual or industrial property
          rights (and any licenses in connection with any of the same), whether
          or not registered or capable of registration, and whether subsisting
          in any specific country or countries or any other part of the world.
        </p>
        <h2>Markets</h2>
        <p>All markets in which the Group operates.</p>
        <h2>Net Revenue</h2>
        <p>
          is calculated as: (All Player bets minus All Player winnings minus
          Player bonuses minus Taxes) minus Admin fee minus Payment Fee.
        </p>
        <p>
          Please note we also deduct the following tax in these countries: –
          Germany: 19% – Austria: 40% – Ireland: 23%
        </p>
        <h2>Party</h2>
        <p>
          Either Blaze or the Affiliate (jointly referred to as the ‘Parties’).
        </p>
        <h2>Progressive Contributions</h2>
        <p>
          A percentage of revenue generated on any progressive game that is paid
          over by Us into the network’s progressive pool.
        </p>
        <h2>Products</h2>
        <p>
          An online gaming product (including but not limited to Casino, Live
          casino) for which professional services are rendered by the Group.
        </p>
        <h2>Revenue Share Deal</h2>
        <p>
          A deal where You receive payment through a revenue share model that is
          tracked on Omarsys.
        </p>
        <h2>Referred Player</h2>
        <p>
          A Player who has accessed any of the Brand Products and registered for
          a cash account directly through one of Your affiliate links. For the
          avoidance of doubt, players which are already customers of Brands
          shall not be considered ‘Referred Players’. Players who are referred
          to one of the Brands, won’t be automatically referred to all other
          brands.
        </p>
        <h2>Spam</h2>
        <p>
          Unwanted or unsolicited email or SMS or any other form of
          communication sent indiscriminately to one or more mailing lists,
          individuals, or newsgroups. This shall include not having appropriate
          opt-ins and/or opt-outs prior to the sending of such communication and
          the lack of maintaining records of the same.
        </p>
        <h2>Terms and Conditions</h2>
        <p>
          These terms and conditions, titled Blaze Affiliate Partner Terms and
          Conditions.
        </p>
        <h2>Website</h2>
        <p>
          The websites Blaze.com, and any other website as may be directed by
          Us.
        </p>
        <h2>Us/We/Our</h2>
        <p>The Group and all related Brands.</p>
        <h2>You/Your/Member</h2>
        <p>
          You in Your capacity as a Blaze Affiliate and Partner, and any
          Sub-Affiliates which You may engage pursuant to this Agreement.
        </p>
        <h1>1.0 | Appointment</h1>
        <p>
          Your application to be a Blaze Affiliate will be reviewed following
          submission and You will be notified in a timely manner of Our
          acceptance or rejection of Your application.
        </p>
        <p>
          If the information provided by You pursuant to Clauses 4.2, 4.12 and
          4.13 is deemed insufficient, We reserve the right to withhold pay-out
          and reject Your application to be a Blaze Affiliate.
        </p>
        <p>
          Upon acceptance into the Affiliate Program, You hereby accept the
          appointment as an Affiliate partner of Blaze and its Brands. For the
          avoidance of doubt, any auto-approval by Us does not imply that We may
          not re-evaluate Your application at a later stage. You acknowledge
          that this Agreement does not grant You an exclusive right or privilege
          to assist Us in the provision of services arising from Your referrals
          and that You shall have no claims to any Fees or other compensation on
          business secured by or through persons or entities other than You.
        </p>
        <h1>2.0 | Affiliates’ Rights</h1>
        <h2>2.1 | Licence to direct Customers to the Website</h2>
        <p>
          Upon acceptance as aforesaid, We grant You a non-exclusive,
          non-transferable, revocable licence, during the term of this
          Agreement, to direct Customers to the Website, in accordance with the
          terms of this Agreement.
        </p>
        <h2>2.2 | Licence to use certain Intellectual Property</h2>
        <p>
          During the term of this Agreement, You are granted a non-exclusive,
          non-transferable, revocable right and license to use the Approved
          Marketing Material as defined below (hereinafter referred to as
          “Licensed IP”). The license in conjunction with the Licensed IP
          granted to You in terms of this Clause shall be conditional and
          strictly contingent upon the following:
        </p>
        <ul>
          <li>
            The Licensed IP may be used solely and strictly as required for You
            to fulfil Your obligations under this Agreement;
          </li>
          <li>
            The Licensed IP may not be sub-licensed, assigned or otherwise
            transferred by You to any third party without Our prior written
            permission;
          </li>
          <li>
            You may not modify, alter, adjust, remove, crop, manipulate and
            create any derivative works of the Licensed IP;
          </li>
          <li>
            You shall not, during the term of this Agreement or at any time
            thereafter, assert the invalidity, unenforceability, or contest the
            ownership of the Intellectual Property Rights in any action or
            proceeding of whatever kind or nature, and further You shall not
            take any action that may prejudice Our rights in the Intellectual
            Property, render the same generic, or otherwise weaken their
            validity or diminish their associated goodwill;
          </li>
          <li>
            You may not use the Licensed IP or any Intellectual Property of the
            Group in a manner that would create a confusion to customers,
            notably without limitation as to the origin of the marketed goods
            and services, portray Affiliate as a member of the Group or
            impersonate the Group;
          </li>
          <li>
            You shall fully comply with Clause 4.3, Clause 4.6, Clause 4.14 and
            Clause 4.15;
          </li>
          <li>
            You shall fully comply with any other the terms of this Agreement
            (including any restrictions contained herein);
          </li>
          <li>
            All rights not expressly granted herein shall remain strictly with
            Us;
          </li>
          <li>
            Your use of any other Intellectual Property of the Group shall be
            strictly subject to prior written approval;
          </li>
          <li>
            We shall have a right to revoke the license as provided herein at
            any time and without cause.
          </li>
          <li>
            Notwithstanding anything to the contrary, Blaze retains the right to
            request a written agreement signed by both Parties detailing any
            other terms which Blaze at its sole discretion deems appropriate,
            such as any payment terms, methods of giving notices, other rights
            and obligations of both Parties and including a term during which
            You are allowed to make use of such Licensed IP provided You abide
            by the terms set forth by Us which shall be clearly stated within
            such agreement.
          </li>
        </ul>
        <h2>2.3 | Registration of Referred Customers and Players</h2>
        <p>
          Blaze Affiliates will register Referred Customers and Players, and
          will track their gaming activity. The Brands have the right to refuse
          Customers or close their accounts, if necessary, in order to comply
          with any regulatory or legal requirements that may arise.
        </p>
        <h2>
          2.4 | Financial reporting on Referred Customer and Player activity
        </h2>
        <p>
          The style, form, content and frequency of generated reports may, at
          Our discretion, vary from time to time. You will be provided with
          remote online access to generated reports of Referred Player activity
          and the Fees attracted by that activity. To gain access to these
          online reports, You will need to use Your username and password as
          provided to You by Blaze. We will provide You with a unique tracking
          link(s), but it is Your responsibility to ensure that the tracking
          links You use are in the correct syntax. We cannot track Referred
          Players referred by You, if the links You use are incorrect, so You
          must ensure to copy the code exactly as presented in the Affiliate
          centre. We will not be liable to pay Fees on any Referred Players who
          are not tracked due to modified tracking codes or links. It is Your
          responsibility to inform Us immediately if the tracking link provided
          is broken or does not work correctly.
        </p>
        <h2>2.5 | Modification of the Terms and Conditions</h2>
        <p>
          We may amend, alter, delete, interlineate or add to these Terms and
          Conditions contained in this Agreement, at any time and in Our sole
          discretion, by posting a change notice or a new agreement on Our site.
          Such amendments, alterations, deletions, interlineations or additions
          may include, for example, changes in the scope of available Fees, fee
          schedules, payment procedures, and referral program rules. Any
          amendments, alterations, deletions, interlineations or additions to
          this these Terms and Conditions shall be effective immediately upon
          notice, by display on the Website (‘Notice’), and shall supersede all
          previous versions. Your use of the Website and/ or continued marketing
          of Us or Our Products after such Notice is given to You will be deemed
          acceptance of such amendments, alterations, deletions, interlineations
          or additions or the new Agreement should these Terms and Conditions be
          replaced in their entirety. Be sure to review this Agreement
          periodically to ensure familiarity with its most current version.
        </p>
        <p>
          Please also note: No purported modifications, amendments, alterations,
          additions, deletions or interlineations of this agreement by you are
          permitted or will be recognised by us. No employees, officers or
          agents of Blaze may verbally alter, modify or waive any provision of
          this Agreement.
        </p>
        <h2>3.0 | Your Warranties</h2>
        <p>
          By applying to be registered as a Blaze Affiliate, You warrant the
          following:
        </p>
        <ul>
          <li>
            The information You provide Us on registration is complete, valid
            and truthful;
          </li>
          <li>
            In the event You are a juristic or legal person, the person
            submitting the application has the full right, power and authority
            to enter into this Agreement on behalf of such entity;
          </li>
          <li>
            The execution of this Agreement by such person, and the performance
            by You of Your obligations and duties hereunder, do not and will not
            violate any agreement to which You are a party or by which You are
            otherwise bound;
          </li>
          <li>
            That You have all requisite legal and authority to enter into this
            Agreement and to carry out and perform Your obligations under the
            terms of this Agreement;
          </li>
          <li>
            You shall comply with all Applicable Law and regulations related to
            the performance contemplated under this Agreement;
          </li>
          <li>
            Your performance of this Agreement shall not infringe the
            Intellectual Property or any other rights of any third party
            including without limitation right of privacy, right of publicity,
            contractual or other right of any person, or constitute any libel or
            slander of any person.
          </li>
        </ul>
        <h2>4.0 | Your Obligations</h2>
        <p>
          You shall take reasonable steps to ensure the reliability and proper
          training of Your employees and that such employees understand the data
          protection and marketing requirements applicable to both the Affiliate
          and to Brands.
        </p>
        <p>
          The Affiliate is to be aware that any operation from its end which
          runs counter to this Agreement may result in very serious consequences
          for the Affiliate itself, for Us, or for both Parties, including
          without limitation, fines, penalties, breaches of license conditions
          and ability to do business, as well as potential civil and criminal
          action against the Affiliate or The Group by the respective
          authorities.
        </p>
        <p>
          Without prejudice to any of the Company’s rights herein or at law, the
          Company may forthwith terminate this Agreement, in part or in its
          entirety, or any of your accounts should you act in breach of the
          foregoing and you shall be held fully responsible and liable for any
          such resulting fine, penalty, claim, action, or loss which is caused
          to us as a result of your action or default as the case may be.
        </p>
        <h2>4.1 | Your website</h2>
        <p>
          You are not allowed to register for this Affiliate Program if Your
          website is considered unsuitable.
        </p>
        <h2>4.2 | Direct Marketing and Spam</h2>
        <p>
          You shall not send Spam to any person, whether a Customer of Brands or
          otherwise, at any time.
        </p>
        <p>
          Any form of any direct marketing communication sent to one or more
          mailing lists, individuals or newsgroup, notably without limitation
          via E-mail and/or SMS direct marketing, that concerns whether directly
          or indirectly Brands or is sent or can be deemed to be sent on behalf
          of Us, irrespective of whether to the customer of Brands or otherwise
          (hereinafter referred to as “Direct Marketing”), shall be strictly
          prohibited. Any Direct Marketing carried out that looks to be coming
          directly from Blaze, or Blaze name, or using the likeness, or
          copyrighted material, shall be considered a material breach of this
          Agreement with the respective consequences.
        </p>
        <p>
          Any form of breach of this Clause 4.2, will result in Your account
          being placed under review immediately and any Fees due to You being
          withheld pending an investigation We shall be entitled to enforce a
          Penalty, which will be deducted from Your account. If this occurs, the
          amount of the Penalty will be deemed fair and acceptable to You.
          Should the Penalty and/or any additional payment due to Us (including
          without limitation expenses and/ or damages in dealing with such
          breach of this Clause or being blocked by third party Internet Service
          Providers) not be covered by funds in Your account, We have the right
          to investigate other alternative means for obtaining these payments
          from You, including the right to demand direct payment from You on the
          first demand.
        </p>
        <p>
          Should You require more information regarding this clause or to report
          any incidences of breach of this Clause please contact us at
          <a :href="$config.telegram">Official {{ $config.site_name }}</a
          >.
        </p>
        <h2>4.3 | Approved Marketing Material</h2>
        <p>
          Once successfully registered as an Affiliate of one of the Brands, You
          will have access to Our banners, text and/or other online and offline
          promotional materials and certain Intellectual Property (collectively
          “Approved Marketing Material”). You may place said materials on Your
          site, and/or utilise them via e-mail and/or direct marketing and/or
          social media and/or print media but You may not use any Intellectual
          Property of the Group (notably without limitation the Brand or related
          trademarked material) with respect to mobile applications, notably
          without limitation as keywords for any mobile application or to
          impersonate Group or create confusion as to the origin and/or nature
          of the goods and services provided within the scope mobile
          application. These are the designated methods by which You may
          advertise Us.
        </p>
        <p>
          It will be Your responsibility to ensure that the use of such Approved
          Marketing Material is strictly in accordance with any specifications,
          obligations and/or limitations in these Terms and Conditions and any
          Applicable Law. We reserve the right to request You to take down any
          form of use of the Approved Marketing Material which it deems to be
          non-compliant with this Agreement or Applicable Law or infringing
          Intellectual Property of the Group.
        </p>
        <p>
          Should You be in any doubt, please contact us before publication. All
          Approved Marketing Material must be kept current and You shall utilise
          new Marketing Material forthwith after it is made available to You by
          Us.
        </p>
        <h2>4.4 | Approved Layouts</h2>
        <p>
          In the absence of Our prior written approval, You will only be
          permitted to use Our Approved Marketing Material as made available at
          the Affiliate Centre, or as supplied directly to You by Us, and will
          not alter its appearance nor refer to Us, Our Products or Our/ their
          partners in any promotional materials. The appearance and syntax of
          the hypertext transfer links are designed and designated by Us and
          constitute the only authorised and permitted representation of Our
          Products sites.
        </p>
        <h2>4.5 | Marketing Compliance</h2>
        <p>
          You shall comply with all advertising guidelines and legislation in
          the relevant Markets for the term of this Agreement.
        </p>
        <h2>4.6 | Good Faith / Ethical Conduct</h2>
        <p>
          You will not knowingly benefit from known or suspected traffic which,
          in the reasonable opinion of Us, is not generated in good faith,
          including but not limited to traffic generated via Spam or through the
          use of Intellectual Property of the Group (notably without limitation
          the Brand) in conjunction with mobile applications or contrary to
          these Terms and Conditions, whether or not this actually causes damage
          to Us or otherwise. For the avoidance of doubt, this includes
          undertaking any fraudulent activity whatsoever, including, for
          separate deals like Cost-Per-Acquisition (CPA), referring players
          which We deem low-value.
        </p>
        <h2>4.7 | Copying of Sites or Theft of Site Content</h2>
        <p>
          If it can be reasonably proven that affiliate earnings have been lost
          due to an incident of copying theft, We reserve the right to pay
          revenue generated by the offending affiliate to the aggrieved Party.
          Complaints in relation to this Clause should be sent to by email.
        </p>
        <h2>4.8 | Your Restrictions</h2>
        <p>
          You shall not be entitled to any Fees in relation to any Sub-Affiliate
          if, in the case that You are a legal person, they are Your employee,
          director, shareholder or agent or, in the case that You are a natural
          person, they are Your employee, agent or direct family member.
        </p>
        <p>
          You shall not earn any Fees on Your own Customer Account nor on the
          Customer Account/s of Your employees or family members.
        </p>
        <h2>4.9 | Traffic Generated Through an Unsuitable Medium</h2>
        <p>
          Any form of traffic that is generated from any medium that is aimed at
          children, promotes violence, includes narcotic material, promotes
          discrimination based on race, sex, religion, nationality, disability,
          sexual orientation, or age, promotes illegal activities, or violates
          any Intellectual Property rights, or are otherwise considered by Us to
          bring Brands into disrepute or prejudice the interests of ours in any
          way or is capable of creation of confusion of the customers, is
          considered unsuitable, and constitutes a serious breach of this
          Agreement.
        </p>
        <p>
          It shall be Your sole responsibility to regularly monitor Your
          networks and traffic sources to ensure full compliance with this
          Clause at all times.
        </p>
        <h2>
          4.10 | Manipulation/Advising Referred Players to the Detriment of
          Brands
        </h2>
        <p>
          You shall not advise or incentivise Your Referred Players in any
          manner which would negatively affect the profitability of the
          affiliate relationship between You and Us. Prohibited activities
          include but are not limited to advising Referred Players about ways in
          which Brand’s Products could be abused or manipulated.
        </p>
        <h2>4.11 | Confidential Information</h2>
        <p>
          Except as otherwise provided in this Agreement, or except within the
          Group, or with the consent of any other Parties hereto, all Parties
          agree that all information, including, but not limited to, the terms
          of this Agreement, business information and technology concerning Us
          or You, respectively, or any of Our Affiliates provided by or on
          behalf of any of them shall remain strictly confidential and secret
          and shall not be utilised, directly or indirectly, by such party for
          its own business purposes or for any other purpose except and solely
          to the extent that any such information is generally known or
          available to the public through a source or sources other than such
          party hereto or its Affiliates. During the term of this Agreement, You
          may be entrusted with Confidential Information relating to the
          business, operations, or underlying technology of Brands and/ or the
          Affiliate Program (including, for example, Fees earned by You under
          the Affiliate Program). You agree to avoid disclosure or unauthorised
          use of the Confidential Information to third persons or outside
          Parties unless You have Our prior written consent and that You will
          use the Confidential Information only for the purposes necessary to
          further the purposes of this Agreement. Your obligations with respect
          to Confidential Information shall survive the termination of this
          Agreement.
        </p>
        <h2>4.12 | Data Protection and Privacy</h2>
        <p>
          You understand and agree that for the purpose and in terms of this
          Agreement, shall not, whether for Direct Marketing or otherwise
          process any personal data on behalf of any company belonging to the
          Group. In the light of the foregoing, with respect to any data that
          you process, as such process is to be deemed completely out of the
          scope of this agreement, you solely determine the purpose and means of
          processing and therefore you are in terms of Applicable Laws
          considered a controller of personal data and that You shall be solely
          responsible for any shall ensure its full compliance with, inter alia,
          all legislation, obligations and requests, by any authority in
          accordance with applicable EU data protection legislation or any
          legislation the jurisdiction in which You and the Group are domiciled
          or operate in. For the avoidance of doubt, Brands or the Group shall
          not, under any circumstances, be considered a controller or a
          processor of personal data respectively for the purposes of this
          Clause and/or this Agreement.
        </p>
        <p>
          You warrant that You will cooperate with Us fully and promptly in the
          event that We request information on Your data protection practices
          and You agree that We may monitor such data protection practices to
          ensure compliance with applicable data protection legislation.
        </p>
        <p>
          You shall make clear to any users of Your website, or any other
          website that is used by You in conjunction with this Agreement, that
          third parties, including Brands, may be placing and reading cookies on
          the user’s browser or placing web beacons to collect information. You
          shall obtain the respective user’s informed consent to the use of such
          third party cookies and post a prominent link to its privacy/cookie
          policy which shall provide detailed information about third party
          cookies and an explanation as to how these can be disabled (for
          example, by providing information about how users can customise cookie
          settings in browsers). You warrant full compliance, throughout the
          term of this Agreement with any cookie – related laws that may be
          applicable.
        </p>
        <h2>4.13 | Anti-Money Laundering</h2>
        <p>
          You may not directly or indirectly benefit from, or be a party to, any
          money laundering or related illegal activities. It is recorded that
          some jurisdictions in which We operate have strict laws on money
          laundering that may impose an obligation upon Us to report You to the
          federal or local authorities within such jurisdictions if We know,
          suspect or have reason to suspect that any transactions in which You
          are directly or indirectly involved, amongst other things, involve
          funds derived from illegal activities or are intended to conceal funds
          derived from illegal activities or involve the use of the Blaze
          Affiliate Program to facilitate criminal activity.
        </p>
        <p>
          You shall comply fully and promptly with any anti-money laundering
          related requests as may be required from You by Blaze.
        </p>
        <h2>4.14. | “Limitations on Advertising”</h2>
        <p>
          The following shall be strictly prohibited: You may not place digital
          advertisements on websites providing unauthorised access to
          copyrighted content or otherwise infringing any intellectual property
          of third Parties.
        </p>
        <h2>4.15 | Trademark Infringements</h2>
        <p>
          You acknowledge that Group has registered trademarks in relation to
          the Brand and agree that You shall not infringe or threaten to
          infringe, or carry out any unauthorised use of the Brand, the
          Products, or any other Intellectual Property of the:
        </p>
        <ul>
          <li>
            Ad bidding: any bid made by You to any Internet search engine or
            mobile application on keywords including without limitation, Blaze,
            Blaze Casino, trademarks, and/or variations thereof or words that
            are confusingly similar, or
          </li>
          <li>
            Mobile Applications: use of the Blaze, Blaze Casino, and/or
            variations thereof or words that are confusingly similar as a name
            of a mobile application, or name of the developer/operator of the
            mobile application, during the term of this Agreement or thereafter.
          </li>
        </ul>
        <p>
          In the event of a breach of this Clause, We will be entitled to
          exercise all mean available to enforce or defend Our rights with
          respect in any given territory, and You shall fully comply with Our
          requests immediately and without delay.
        </p>
        <h2>4.16 | Limitations on URLs</h2>
        <p>
          The use of Brand names, including without limitation Blaze, Blaze
          Casino, Blaze trademarks or any variation of these names or any use of
          any words that are confusingly similar, in affiliate URLs is
          restricted and prohibited. Our Brand name may not be used in a
          derivative URL or Subdomain. Using Blaze as the example:
        </p>
        <ul>
          <li><a>http://www.yoursite.com/blaze.html</a> - Allowed</li>
          <li>blaze.yoursite.com – NOT Allowed</li>
          <li>http://www.yoursiteblaze.com/ – NOT Allowed</li>
          <li>http://www.blazeyoursite.com/ – NOT Allowed</li>
        </ul>
        <h2>4.17 | Restricted Territories</h2>
        <p>
          Affiliate marketing efforts may not be directed at any person who is
          resident in any jurisdiction where their participation in online
          gambling would conflict with Applicable Law, for example, the United
          States of America and its dependencies. In this regard, it is the sole
          responsibility of you, the Affiliate, to understand and comply with
          all Applicable Laws in all the jurisdictions where your Affiliate
          Sites are accessible and from where Referred Players may originate.
        </p>
        <p>
          We further cannot accept any traffic coming from .nl sites, third
          party marketing specifically for The Netherlands and/or any marketing
          activities in Dutch.
        </p>
        <p>
          We reserve the right to update this list at any time and to take legal
          measures against You should You advertise Brands to any individuals
          within the aforementioned jurisdictions.
        </p>
        <h2>4.18 | Information Security</h2>
        <p>
          You are obliged to abide by the Information Security Policy at all
          times.
        </p>
        <h2>5.0 | Affiliate Deal Payment Models</h2>
        <p>
          Please refer to Your account on Blaze for specific information
          regarding Your payment model, and the relevant terms below for
          specific guidance relating to Revenue Share, CPA, or Hybrid Deals, as
          may be applicable.
        </p>
        <h2>5.1 | Terms Applicable to Revenue Share Deals</h2>
        <p>
          Under the Revenue Share Deal, You will receive a payment based on
          income generated by Your Referred Players to each Brand, based on the
          model outlined below.
        </p>
        <p>
          We reserve the right to change such model at any time and without
          notice.
        </p>
        <p>Calculation of revenue share is calculated as follows:</p>
        <ul>
          <li>10% Net Win across all Products by Referred Players.</li>
        </ul>
        <h2>5.2 | Terms Applicable to CPA Deals</h2>
        <p>
          Under any CPA Deal, You will receive a predetermined amount for each
          Referred Player, as agreed with the Affiliate. There shall be no
          revenue share component under this model.
        </p>
        <p>
          We reserve the right to change the CPA Deal at any time without
          notice.
        </p>
        <p>
          Unless agreed otherwise between the Parties in writing, the first
          fifty (50) Referred Players under the CPA Deal are to be seen as a
          test phase in which We will assess the quality of the Referred
          Players. After the test phase has been completed, We shall, in our
          sole discretion, determine whether to continue the campaign, amend
          pricing, or renegotiate the volumes and/or CPA amounts, based on the
          results obtained in the testing phase.
        </p>
        <h2>5.3 | Terms applicable to Hybrid Deals</h2>
        <p>
          Under any Hybrid Deal, Your payment will contain elements of both a
          Revenue Share Deal and a CPA Deal, based on the models outlined above.
        </p>
        <p>
          For the avoidance of doubt, the terms applicable to Revenue Share
          Deals as outlined in Clause 5.1 and the terms applicable to the CPA
          Deals as outlined in Clause 5.2 shall also apply to Hybrid Deals.
        </p>
        <h2>5.4 | Payment Options</h2>
        <p>
          Payment shall be made by Us to You by way of the method selected by
          You upon registration or accessible through the ‘payment information’
          section of your account at any time. You may only choose from:
        </p>
        <ul>
          <li>Skrill</li>
          <li>Neteller</li>
          <li>Crypto</li>
          <li>Blaze Player Balance</li>
        </ul>
        <p>
          If selecting ‘bank wire transfer’ your bank account must be able to
          receive euro amounts.
        </p>
        <p>
          Should You fail to register a valid payment method and full correct
          details upon acceptance of these Terms and Conditions, We will not
          contact You to inform You to update Your details. Please contact Us in
          case you experience any issues with registering a payment method.
        </p>
        <p>
          We shall not be liable to You in any manner whatsoever for late
          payments due to technical, third party or any other unforeseen events
          arising. However, we aim to process the Fees earned by You in the
          previous calendar month by the 15th of the following month.
        </p>
        <h2>5.5 | Cross-Tracking</h2>
        <p>
          We will endeavour to make sure all Referred Players are cross-tracked
          to Products that You have chosen to promote, should a Referred Player
          choose to play a product other than the Product advertised.
        </p>
        <br />
        <p>###6.0 | Term and Termination</p>
        <h2>6.1 | Term</h2>
        <p>
          The term of this Agreement will commence on approval of Your
          registration by Blaze in accordance with Clause 1 and shall continue
          until terminated on notice by either Party.
        </p>
        <h2>6.2 | Termination</h2>
        <p>
          Notice of termination shall be given in writing by either Party to the
          other at any time. For the purposes of notification of termination,
          delivery via e-mail will be considered as a written and immediate form
          of notification and the Agreement shall accordingly terminate with
          immediate effect.
        </p>
        <p>
          We reserve the right to terminate this Agreement immediately upon any
          breach of this Agreement by You or Your Affiliate Network.
        </p>
        <p>
          For the avoidance of doubt, in the event of multiple accounts being
          held by You, We reserve the right to terminate each account
          separately, or to exercise any termination right which emerges in
          relation to one account against other accounts, at Our sole
          discretion.
        </p>
        <h2>6.3 | Consequences of Termination</h2>
        <p>
          In the event of termination of this Agreement for any reason You will
          return to Us any Confidential information and/ or Customer
          Information, and all copies of it in Your possession, custody and
          control and will cease all uses of any Licensed IP. You will take
          immediate steps to transfer ownership to Blaze of any derivative URL
          established by You, at a cost to Blaze not exceeding that incurred by
          You in registering the derivative URL, but not the costs incurred in
          developing the derivative URL. You and Blaze and our electronic cash
          provider, suppliers, contractors, agents, their directors, officers,
          employees, and representatives shall be released from all obligations
          and liabilities to each other occurring or arising after the date of
          such termination, except with respect to those obligations that by
          their nature are designed to survive termination, as set out in this
          Agreement. Termination will not exculpate You from any liability
          arising from any breach of this Agreement, that occurred prior to
          termination and shall not affect or limit in any way Our rights
          pursuant to the Clause 10.1. You will only be entitled to unpaid Fees
          (if any) earned by You on or prior to the date of termination.
          However, if You have committed a breach of this Agreement, You shall
          not be entitled to any unpaid Fees generated after the breach
          occurred, irrespective of whether this Agreement has been terminated
          or otherwise, until such breach is remedied. You will not be entitled
          to any revenue generated after the date of termination. We may
          withhold the final payment for up to three months to ensure that the
          correct amount has been calculated and paid. If We continue to permit
          activity (generation of revenue) from Customers after termination,
          this shall not and shall not be construed to constitute a continuation
          or renewal of this agreement or a waiver of termination.
        </p>
        <h2>7.0 | Relationship of Parties</h2>
        <p>
          We are independent contractors, and nothing in this Agreement will
          create any legal partnership, joint venture, agency, franchise, sales
          representative, or employment relationship between the Parties. You
          shall have no authority to make or accept any offers or
          representations on Our behalf. You shall not make any statement,
          whether on Your site or otherwise, that conflicts with this Clause
          10.1.
        </p>
        <p>
          For the avoidance of doubt, You shall be solely responsible for the
          actions of Your Affiliate Networks and for monitoring Your Affiliate
          Networks to ensure compliance with the terms of this Agreement. You
          shall be held solely responsible for a breach of the terms of this
          Agreement by Your Affiliate Network, and We shall be entitled to take
          any action against You, without limitation, available under this
          Agreement in respect of such breach.
        </p>
        <h2>8.0 | Local legislation</h2>
        <p>
          You will not be treated as an employee with respect to the Employment
          &amp; Industrial Relations Act (Cap. 452) or any other statute,
          ordinance, rule, or regulation of any country whatsoever similar in
          purpose to the aforementioned Act.
        </p>
        <h2>9.0 | Representation of Blaze Brands</h2>
        <p>
          You shall not make any claims, representations, or warranties in
          connection with Brands and You shall have no authority to, and shall
          not, bind Us to any obligations outside of this Agreement, unless
          agreed to in writing by Us.
        </p>
        <h2>10.0 | Indemnity, Disclaimers and Limitation of Liability</h2>
        <h2>10.1 | Indemnity</h2>
        <p>
          You shall defend, indemnify, and hold Blaze and Our electronic cash
          providers, suppliers, contractors, agents, their directors, officers,
          employees, and representatives harmless from and against any and all
          liabilities, losses, damages, and costs, including reasonable
          attorney’s fees, resulting from, arising out of, or in any way
          connected with:
        </p>
        <ul>
          <li>
            any breach by You of any warranty, representation, or agreement
            contained in this Agreement,
          </li>
          <li>
            the performance of Your duties and obligations under this Agreement,
          </li>
          <li>Your negligence, or</li>
          <li>
            any injury caused directly or indirectly by Your negligent or
            intentional acts or omissions, or the unauthorised use of Our
            banners, copies and link or this Affiliate Program;
          </li>
          <li>
            all claims, damages, and expenses (including, and without
            limitation, attorneys’ fees) relating to the development, operation,
            maintenance, and contents of Your site;
          </li>
          <li>
            any proceedings, penalties or sanctions imposed by the relevant
            authorities as well as any costs and expenses of legal
            representation, attorney’s fees; incurred in relation, arising out
            of or result from any breach or non-compliance, non-performance of
            this Agreement or any part thereof, or non-compliance with
            Applicable Law.
          </li>
        </ul>
        <h2>10.2 | Disclaimers</h2>
        <p>
          We make no express or implied warranties or representations with
          respect to the Affiliate Program, Brands or payment arrangements
          (including, without limitation, their functionality, warranties of
          fitness, Product-ability, legality, non-infringement, or any implied
          warranties arising out of a course of performance, dealing, or trade
          usage). In addition, We make no representation that the operation of
          Our site (including service and tracking) will be uninterrupted or
          error-free. We will not be liable for the consequences of any such
          interruptions or errors.
        </p>
        <h2>10.3 | Limitation of Liability</h2>
        <p>
          Your liability, whether under contract, tort or otherwise (including
          any liability for negligent act or omission), shall not be in any
          manner excluded or limited and shall include, without limitation, also
          any liability for any indirect and consequential damages incurred by
          Us or the Group including loss of profits, revenue, business,
          contracts, anticipated savings.
        </p>
        <p>
          For the avoidance of doubt, You shall be solely liable towards Us for
          breaches of this Agreement by Your Affiliate Networks.
        </p>
        <p>
          We will not be liable for direct, indirect, special, punitive or
          consequential damages or for any loss, of any nature whatsoever,
          arising from or in connection with this Agreement or the Affiliate
          Program, even if We have been advised of the possibility of such
          damages.
        </p>
        <p>
          Further, Our aggregate liability arising with respect to this
          Agreement and the Program shall not exceed 10% of the total Fees paid
          or payable by Us to You in the previous 6 months from when the
          respective breach occurred under this Agreement.
        </p>
        <p>
          Our obligations under this Agreement do not constitute personal
          obligations of Our directors, officers, consultants, agents or
          shareholders. Any liability arising under this Agreement shall be
          satisfied solely from the Fees generated and is limited to direct
          damages.
        </p>
        <h2>10.4 | Remedies</h2>
        <p>
          Our rights and remedies in these Terms and Conditions shall not be
          mutually exclusive, i.e., the exercise of one or more of the
          provisions of this Agreement shall not preclude the exercise of any
          other provision.
        </p>
        <p>
          You acknowledge that We may, without prejudice to any other right
          available,
        </p>
        <ul>
          <li>
            immediately suspend Your membership of the Affiliate Program; and/
            or
          </li>
          <li>
            in Our absolute discretion, not pay You any funds due to You as
            Fees.
          </li>
        </ul>
        <p>
          If You have committed a breach of this Agreement, or if We are not
          satisfied with the information You are required to provide to us in
          terms of Clauses 4.2, 4.12 and 4.13.
        </p>
        <p>
          Additionally, Your account is not active or generating profit through
          Fee payments, We shall have the right to demand payment of the Penalty
          as well as any additional payment from You
        </p>
        <p>
          We further reserve the right to report You to the relevant authorities
          should We, in Our absolute discretion, determine that We are obliged,
          to do so in compliance with Applicable Law.
        </p>
        <p>
          You acknowledge, that damages or a Penalty may be inadequate for a
          breach or a threatened breach of this Agreement and, in the event of a
          breach or threatened breach of any provision of this Agreement, the
          respective rights and obligations of the Parties may be enforceable by
          specific performance, injunction, or other equitable remedy.
        </p>
        <p>
          Nothing contained in this Agreement shall limit or affect any of Our
          rights at law, or otherwise, for a breach or threatened breach of any
          provision of this Agreement, it being the intent of this provision to
          make clear that the enforcement of Our respective rights and
          obligations shall not be limited in any way.
        </p>
        <p>
          The rights and remedies outlined in this Clause, and in these Terms
          and Conditions, may be exercised against any or all of Your multiple
          accounts in Our sole discretion.
        </p>
        <h2>11.0 | Governing Law and Jurisdiction</h2>
        <p>
          This Agreement will be governed by the laws of Curacao and the parties
          agree to the jurisdiction of the Curacao courts and to the rules of
          arbitration in accordance with applicable law.
        </p>
        <h2>12.0 | Mutual Support</h2>
        <p>
          Both Parties shall give each other their mutual support in the giving
          of effect to the spirit, purpose and object of this Agreement.
        </p>
        <p>
          You shall comply with, inter alia, all legislation, obligations and
          requests, as required by Blaze or by any authority in accordance with
          applicable legislation in the jurisdiction in which You or Brands are
          domiciled or operate in.
        </p>
        <p>
          You warrant that You will cooperate with Us fully and promptly in the
          event the Group requests information on Your practices and You agree
          that We may monitor such practices to ensure compliance with
          applicable legislation. Should the Group discover non-compliance with
          any applicable legislation, We reserve the right to take any action
          which it deems necessary, including but not limited to terminating
          this Agreement with immediate effect, immediate closure of Your
          account and withholding all funds due to You. You agree to indemnify
          Us for any damages suffered as a result of a breach of this Clause and
          this Agreement and Blaze further reserves the right to take any action
          to which it may be entitled, in the event that it suffers any damage
          whatsoever due to Your non-compliance with this Clause or this
          Agreement.
        </p>
        <h2>13.0 | Third Parties</h2>
        <p>
          Nothing in this Agreement shall be construed to provide any rights,
          remedies or benefits to any person or entity not a party to this
          Agreement. For the avoidance of doubt, this Clause shall not apply to
          Affiliate Networks.
        </p>
        <h2>14.0 | Assignability and Inurement</h2>
        <p>
          You may not assign this Agreement, by operation of law or otherwise,
          without Our prior written consent. Subject to that restriction, this
          Agreement will be binding on, inure to the benefit of, and enforceable
          against You and Us and Your and Our respective successors and assigns.
        </p>
        <h2>15.0 | Non-Waiver</h2>
        <p>
          Our failure to enforce Your strict performance of any provision of
          this Agreement will not constitute nor be construed as a waiver of Our
          right to subsequently enforce such provision or any other provision of
          this Agreement.
        </p>
        <h2>16.0 | Severability/Waiver</h2>
        <p>
          Whenever possible, each provision of this Agreement shall be
          interpreted in such a manner as to be effective and valid under
          Applicable Law but, if any provision of this Agreement is held to be
          invalid, illegal or unenforceable in any respect, such provision will
          be ineffective only to the extent of such invalidity, or
          unenforceability, without invalidating the remainder of this Agreement
          or any provision hereof. No waiver will be implied from conduct or
          failure to enforce any rights and must be in writing to be effective.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AffiliateTermsAndConditions",
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
@import "/assets/scss/web/affiliateTermsAndConditions.scss";
@import "/assets/scss/mobile/affiliateTermsAndConditions.scss";
</style>
