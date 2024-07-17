import Terms, { ListStyle } from "..";
import TermsHeader from "../TermsHeader";
import { email, phone, webDomain } from "../../../Strings";
import Section from "../../../Reuse/Section";
import { useLayoutEffect } from "react";
const TERMSANDCONDITIONS = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Terms>
      <Section>
        <TermsHeader
          title="Terms and Conditions"
          desc="Last updated July 17, 2024"
        />
        <h3 className="mt-4">AGREEMENT TO OUR LEGAL TERMS</h3>
        <p>
          We are The A To Z classes ('<b>Company</b>', '<b>we</b>', '<b>us</b>',
          or '<b>our</b>'), a company registered in India at{" "}
          <b>HIG-A-373/ll rajajipuram, Lucknow Uttar Pradesh -226017</b>.
        </p>
        <p>
          We operate the website{" "}
          <a href={webDomain} target="_blank" rel="noopener noreferrer">
            {webDomain}
          </a>{" "}
          (the '<b>Site</b>'), as well as any other related products and
          services that refer or link to these legal terms (the '
          <b>Legal Terms</b>') (collectively, the '<b>Services</b>'). You can
          contact us by phone at +919454509368, email at
          connect@theatozclasses.com, India.
        </p>
        <p>
          These Legal Terms constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity ('you'), and The A
          To Z classes, concerning your access to and use of the Services. You
          agree that by accessing the Services, you have read, understood, and
          agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE
          WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM
          USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
        </p>
        <p>
          We will provide you with prior notice of any scheduled changes to the
          Services you are using. The modified Legal Terms will become effective
          upon posting or notifying you by connect@theatozclasses.com, as stated
          in the email message. By continuing to use the Services after the
          effective date of any changes, you agree to be bound by the modified
          terms.
        </p>
        <p>
          All users who are minors in the jurisdiction in which they reside
          (generally under the age of 18) must have the permission of, and be
          directly supervised by, their parent or guardian to use the Services.
          If you are a minor, you must have your parent or guardian read and
          agree to these Legal Terms prior to you using the Services.
        </p>
        <p>
          We recommend that you print a copy of these Legal Terms for your
          records.
        </p>
        <h3 className="my-4"> TABLE OF CONTENTS</h3>
        <ul className=" list-unstyled">
          <li>
            <a href="#servicesRef">1. OUR SERVICES</a>
          </li>
          <li>
            <a href="#ipRightsRef">2. INTELLECTUAL PROPERTY RIGHTS</a>
          </li>
          <li>
            <a href="#userRepsRef">3. USER REPRESENTATIONS</a>
          </li>
          <li>
            <a href="#purchasesRef">4. PURCHASES AND PAYMENT</a>
          </li>
          <li>
            <a href="#subscriptionsRef">5. SUBSCRIPTIONS</a>
          </li>
          <li>
            <a href="#policyRef">6. POLICY</a>
          </li>
          <li>
            <a href="#prohibitedRef">7. PROHIBITED ACTIVITIES</a>
          </li>
          <li>
            <a href="#contributionsRef">8. USER GENERATED CONTRIBUTIONS</a>
          </li>
          <li>
            <a href="#licenseRef">9. CONTRIBUTION LICENCE</a>
          </li>
          <li>
            <a href="#reviewsRef">10. GUIDELINES FOR REVIEWS</a>
          </li>
          <li>
            <a href="#managementRef">11. SERVICES MANAGEMENT</a>
          </li>
          <li>
            <a href="#privacyRef">12. PRIVACY POLICY</a>
          </li>
          <li>
            <a href="#terminationRef">13. TERM AND TERMINATION</a>
          </li>
          <li>
            <a href="#modificationsRef">14. MODIFICATIONS AND INTERRUPTIONS</a>
          </li>
          <li>
            <a href="#lawRef">15. GOVERNING LAW</a>
          </li>
          <li>
            <a href="#resolutionRef">16. DISPUTE RESOLUTION</a>
          </li>
          <li>
            <a href="#correctionsRef">17. CORRECTIONS</a>
          </li>
          <li>
            <a href="#disclaimerRef">18. DISCLAIMER</a>
          </li>
          <li>
            <a href="#liabilityRef">19. LIMITATIONS OF LIABILITY</a>
          </li>
          <li>
            <a href="#indemnificationRef">20. INDEMNIFICATION</a>
          </li>
          <li>
            <a href="#userDataRef">21. USER DATA</a>
          </li>
          <li>
            <a href="#communicationsRef">
              22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
            </a>
          </li>
          <li>
            <a href="#smsRe">23. SMS TEXT MESSAGING</a>
          </li>
          <li>
            <a href="#miscellaneousRef">24. MISCELLANEOUS</a>
          </li>
          <li>
            <a href="#contactRef">25. CONTACT US</a>
          </li>
        </ul>
        <div id="servicesRef">
          <h3 className="mt-4">1. OUR SERVICES</h3>
          <p>
            The information provided when using the Services is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would be contrary to law
            or regulation or which would subject us to any registration
            requirement within such jurisdiction or country. Accordingly, those
            persons who choose to access the Services from other locations do so
            on their own initiative and are solely responsible for compliance
            with local laws, if and to the extent local laws are applicable
          </p>
        </div>
        <div id="ipRightsRef">
          <h3 className="mt-4">2. INTELLECTUAL PROPERTY RIGHTS</h3>
          <h5 className="my-3"> Our intellectual propert</h5>
          <p>
            We are the owner or the licensee of all intellectual property rights
            in our Services, including all source code, databases,
            functionality, software, website designs, audio, video, text,
            photographs, and graphics in the Services (collectively, the
            'Content'), as well as the trademarks, service marks, and logos
            contained therein (the 'Marks').
          </p>
          <p>
            Our Content and Marks are protected by copyright and trademark laws
            (and various other intellectual property rights and unfair
            competition laws) and treaties in the United States and around the
            world.
          </p>
          <p>
            The Content and Marks are provided in or through the Services 'AS
            IS' for your personal, non-commercial use or internal business
            purpose only.
          </p>
          <h5 className="my-3">Your use of our Services</h5>
          <p>
            Subject to your compliance with these Legal Terms, including the
            'PROHIBITED ACTIVITIES' div below, we grant you a non-exclusive,
            non-transferable, revocable licence to:
          </p>
          <ul style={ListStyle}>
            <li>access the Services; and</li>
            <li>
              download or print a copy of any portion of the Content to which
              you have properly gained access.
            </li>
          </ul>
          <p>
            solely for your personal, non-commercial use or internal business
            purpose.
          </p>
          <p>
            {" "}
            Except as set out in this div or elsewhere in our Legal Terms, no
            part of the Services and no Content or Marks may be copied,
            reproduced, aggregated, republished, uploaded, posted, publicly
            displayed, encoded, translated, transmitted, distributed, sold,
            licensed, or otherwise exploited for any commercial purpose
            whatsoever, without our express prior written permission.
          </p>
          <p>
            If you wish to make any use of the Services, Content, or Marks other
            than as set out in this div or elsewhere in our Legal Terms, please
            address your request to: connect@theatozclasses.com. If we ever
            grant you the permission to post, reproduce, or publicly display any
            part of our Services or Content, you must identify us as the owners
            or licensors of the Services, Content, or Marks and ensure that any
            copyright or proprietary notice appears or is visible on posting,
            reproducing, or displaying our Content.
          </p>
          <p>
            We reserve all rights not expressly granted to you in and to the
            Services, Content, and Marks.
          </p>
          <p>
            Any breach of these Intellectual Property Rights will constitute a
            material breach of our Legal Terms and your right to use our
            Services will terminate immediately.
          </p>
          <h5 className="my-3">Your submissions</h5>
          <p>
            Please review this div and the 'PROHIBITED ACTIVITIES' div carefully
            prior to using our Services to understand the (a) rights you give us
            and (b) obligations you have when you post or upload any content
            through the Services.
          </p>
          <p>
            <b>Submissions:</b> By directly sending us any question, comment,
            suggestion, idea, feedback, or other information about the Services
            ('Submissions'), you agree to assign to us all intellectual property
            rights in such Submission. You agree that we shall own this
            Submission and be entitled to its unrestricted use and dissemination
            for any lawful purpose, commercial or otherwise, without
            acknowledgment or compensation to you.
          </p>
          <p>
            <b>You are responsible for what you post or upload:</b> By sending
            us Submissions through any part of the Services you:
          </p>
          <ul style={ListStyle}>
            <li>
              confirm that you have read and agree with our 'PROHIBITED
              ACTIVITIES' and will not post, send, publish, upload, or transmit
              through the Services any Submission that is illegal, harassing,
              hateful, harmful, defamatory, obscene, bullying, abusive,
              discriminatory, threatening to any person or group, sexually
              explicit, false, inaccurate, deceitful, or misleading;
            </li>
            <li>
              to the extent permissible by applicable law, waive any and all
              moral rights to any such Submission;
            </li>
            <li>
              warrant that any such Submission are original to you or that you
              have the necessary rights and licences to submit such Submissions
              and that you have full authority to grant us the above-mentioned
              rights in relation to your Submissions; and
            </li>
            <li>
              warrant and represent that your Submissions do not constitute
              confidential information.
            </li>
          </ul>
          <p>
            You are solely responsible for your Submissions and you expressly
            agree to reimburse us for any and all losses that we may suffer
            because of your breach of (a) this div, (b) any third party’s
            intellectual property rights, or (c) applicable law.
          </p>
        </div>
        <div id="userRepsRef">
          <h3 className="mt-4">3. USER REPRESENTATIONS</h3>
          <p>
            By using the Services, you represent and warrant that: (1) you have
            the legal capacity and you agree to comply with these Legal Terms;
            (2) you are not a minor in the jurisdiction in which you reside, or
            if a minor, you have received parental permission to use the
            Services; (3) you will not access the Services through automated or
            non-human means, whether through a bot, script or otherwise; (4) you
            will not use the Services for any illegal or unauthorised purpose;
            and (5) your use of the Services will not violate any applicable law
            or regulation.
          </p>
          <p>
            If you provide any information that is untrue, inaccurate, not
            current, or incomplete, we have the right to suspend or terminate
            your account and refuse any and all current or future use of the
            Services (or any portion thereof).
          </p>
        </div>
        <div is="purchasesRef">
          <h3 className="mt-4">4. PURCHASES AND PAYMENT</h3>
          <p>We accept the following forms of payment:</p>
          <p className="px-4">- RazorPay</p>
          <p>
            You agree to provide current, complete, and accurate purchase and
            account information for all purchases made via the Services. You
            further agree to promptly update account and payment information,
            including email address, payment method, and payment card expiration
            date, so that we can complete your transactions and contact you as
            needed. Sales tax will be added to the price of purchases as deemed
            required by us. We may change prices at any time. All payments shall
            be in Rupees.
          </p>
          <p>
            You agree to pay all charges at the prices then in effect for your
            purchases and any applicable shipping fees, and you authorise us to
            charge your chosen payment provider for any such amounts upon
            placing your order. We reserve the right to correct any errors or
            mistakes in pricing, even if we have already requested or received
            payment.
          </p>
          <p>
            We reserve the right to refuse any order placed through the
            Services. We may, in our sole discretion, limit or cancel quantities
            purchased per person, per household, or per order. These
            restrictions may include orders placed by or under the same customer
            account, the same payment method, and/or orders that use the same
            billing or shipping address. We reserve the right to limit or
            prohibit orders that, in our sole judgement, appear to be placed by
            dealers, resellers, or distributors.
          </p>
        </div>
        <div id="subscriptionsRef">
          <h3 className="mt-4">5. SUBSCRIPTIONS</h3>
          <h5 className="my-3">Billing and Renewal</h5>
          <p>
            Your subscription will continue and automatically renew unless
            cancelled. You consent to our charging your payment method on a
            recurring basis without requiring your prior approval for each
            recurring charge, until such time as you cancel the applicable
            order. The length of your billing cycle will depend on the type of
            subscription plan you choose when you subscribed to the Services.
          </p>
          <h5 className="my-3"> Free Trial</h5>
          <p>
            We offer a 2-day free trial to new users who register with the
            Services. The account will not be charged and the subscription will
            be suspended until upgraded to a paid version at the end of the free
            trial.
          </p>
          <h5 className="my-3">Cancellation</h5>
          <p>
            You can cancel your subscription at any time by contacting us using
            the contact information provided below. Your cancellation will take
            effect at the end of the current paid term. If you have any
            questions or are unsatisfied with our Services, please email us at
            connect@theatozclasses.com.
          </p>
          <h5 className="my-3">Fee Changes</h5>
          <p>
            {" "}
            We may, from time to time, make changes to the subscription fee and
            will communicate any price changes to you in accordance with
            applicable law.
          </p>
        </div>
        <div id="policyRef">
          <h3 className="mt-4">6. POLICY</h3>
          <p>
            {" "}
            Please review our Return Policy posted on the Services prior to
            making any purchases.
          </p>
        </div>
        <div id={"prohibitedRef"}>
          <h3 className="mt-4">7. PROHIBITED ACTIVITIES</h3>
          <p>
            {" "}
            You may not access or use the Services for any purpose other than
            that for which we make the Services available. The Services may not
            be used in connection with any commercial endeavours except those
            that are specifically endorsed or approved by us.
          </p>
          <p> As a user of the Services, you agree not to:</p>
          <ul style={ListStyle}>
            <li>
              Systematically retrieve data or other content from the Services to
              create or compile, directly or indirectly, a collection,
              compilation, database, or directory without written permission
              from us.
            </li>
            <li>
              Trick, defraud, or mislead us and other users, especially in any
              attempt to learn sensitive account information such as user
              passwords.
            </li>
            <li>
              Circumvent, disable, or otherwise interfere with security-related
              features of the Services, including features that prevent or
              restrict the use or copying of any Content or enforce limitations
              on the use of the Services and/or the Content contained therein.
            </li>
            <li>
              Disparage, tarnish, or otherwise harm, in our opinion, us and/or
              the Services.
            </li>
            <li>
              Use any information obtained from the Services in order to harass,
              abuse, or harm another person.
            </li>
            <li>
              Make improper use of our support services or submit false reports
              of abuse or misconduct.
            </li>
            <li>
              Use the Services in a manner inconsistent with any applicable laws
              or regulations.
            </li>
            <li>
              Engage in unauthorized framing of or linking to the Services.
            </li>
            <li>
              Upload or transmit (or attempt to upload or to transmit) viruses,
              Trojan horses, or other material, including excessive use of
              capital letters and spamming (continuous posting of repetitive
              text), that interferes with any party’s uninterrupted use and
              enjoyment of the Services or modifies, impairs, disrupts, alters,
              or interferes with the use, features, functions, operation, or
              maintenance of the Services.
            </li>
            <li>
              Engage in any automated use of the system, such as using scripts
              to send comments or messages, or using any data mining, robots, or
              similar data gathering and extraction tools.
            </li>
            <li>
              Delete the copyright or other proprietary rights notice from any
              Content.
            </li>
            <li>
              Attempt to impersonate another user or person or use the username
              of another user.
            </li>
            <li>
              Upload or transmit (or attempt to upload or to transmit) any
              material that acts as a passive or active information collection
              or transmission mechanism, including without limitation, clear
              graphics interchange formats ('gifs'), 1×1 pixels, web bugs,
              cookies, or other similar devices (sometimes referred to as
              'spyware' or 'passive collection mechanisms' or 'pcms').
            </li>
            <li>
              Interfere with, disrupt, or create an undue burden on the Services
              or the networks or services connected to the Services.
            </li>
            <li>
              Harass, annoy, intimidate, or threaten any of our employees or
              agents engaged in providing any portion of the Services to you.
            </li>
            <li>
              Attempt to bypass any measures of the Services designed to prevent
              or restrict access to the Services, or any portion of the
              Services.
            </li>
            <li>
              Copy or adapt the Services' software, including but not limited to
              Flash, PHP, HTML, JavaScript, or other code.
            </li>
            <li>
              Except as permitted by applicable law, decipher, decompile,
              disassemble, or reverse engineer any of the software comprising or
              in any way making up a part of the Services.
            </li>
            <li>
              Except as may be the result of standard search engine or Internet
              browser usage, use, launch, develop, or distribute any automated
              system, including without limitation, any spider, robot, cheat
              utility, scraper, or offline reader that accesses the Services, or
              use or launch any unauthorized script or other software.
            </li>
            <li>
              Use a buying agent or purchasing agent to make purchases on the
              Services.
            </li>
            <li>
              Make any unauthorized use of the Services, including collecting
              usernames and/or email addresses of users by electronic or other
              means for the purpose of sending unsolicited email, or creating
              user accounts by automated means or under false pretenses.
            </li>
            <li>
              Use the Services as part of any effort to compete with us or
              otherwise use the Services and/or the Content for any
              revenue-generating endeavor or commercial enterprise.
            </li>
            <li>
              Use the Services to advertise or offer to sell goods and services.
            </li>
          </ul>
        </div>
        <div id={"contributionsRef"}>
          <h3 className="mt-4">8. USER GENERATED CONTRIBUTIONS</h3>
          <p> The Services does not offer users to submit or post content.</p>
        </div>
        <div id={"licenseRef"}>
          <h3 className="mt-4">9. CONTRIBUTION LICENCE</h3>
          <p>
            You and Services agree that we may access, store, process, and use
            any information and personal data that you provide following the
            terms of the Privacy Policy and your choices (including settings).
          </p>
          <p>
            By submitting suggestions or other feedback regarding the Services,
            you agree that we can use and share such feedback for any purpose
            without compensation to you.
          </p>
        </div>
        <div id={"reviewsRef"}>
          <h3 className="mt-4">10. GUIDELINES FOR REVIEWS</h3>
          <p>
            We may provide you areas on the Services to leave reviews or
            ratings. When posting a review, you must comply with the following
            criteria: (1) you should have firsthand experience with the
            person/entity being reviewed; (2) your reviews should not contain
            offensive profanity, or abusive, racist, offensive, or hateful
            language; (3) your reviews should not contain discriminatory
            references based on religion, race, gender, national origin, age,
            marital status, sexual orientation, or disability; (4) your reviews
            should not contain references to illegal activity; (5) you should
            not be affiliated with competitors if posting negative reviews; (6)
            you should not make any conclusions as to the legality of conduct;
            (7) you may not post any false or misleading statements; and (8) you
            may not organise a campaign encouraging others to post reviews,
            whether positive or negative.
          </p>
          <p>
            We may accept, reject, or remove reviews in our sole discretion. We
            have absolutely no obligation to screen reviews or to delete
            reviews, even if anyone considers reviews objectionable or
            inaccurate. Reviews are not endorsed by us, and do not necessarily
            represent our opinions or the views of any of our affiliates or
            partners. We do not assume liability for any review or for any
            claims, liabilities, or losses resulting from any review. By posting
            a review, you hereby grant to us a perpetual, non exclusive,
            worldwide, royalty-free, fully paid, assignable, and sublicensable
            right and licence to reproduce, modify, translate, transmit by any
            means, display, perform, and/or distribute all content relating to
            review.
          </p>
        </div>
        <div id={"managementRef"}>
          <h3 className="mt-4">11. SERVICES MANAGEMENT</h3>
          <p>
            We reserve the right, but not the obligation, to: (1) monitor the
            Services for violations of these Legal Terms; (2) take appropriate
            legal action against anyone who, in our sole discretion, violates
            the law or these Legal Terms, including without limitation,
            reporting such user to law enforcement authorities; (3) in our sole
            discretion and without limitation, refuse, restrict access to, limit
            the availability of, or disable (to the extent technologically
            feasible) any of your Contributions or any portion thereof; (4) in
            our sole discretion and without limitation, notice, or liability, to
            remove from the Services or otherwise disable all files and content
            that are excessive in size or are in any way burdensome to our
            systems; and (5) otherwise manage the Services in a manner designed
            to protect our rights and property and to facilitate the proper
            functioning of the Services.
          </p>
        </div>
        <div id={"privacyRef"}>
          <h3 className="mt-4">12. PRIVACY POLICY</h3>
          <p>
            We care about data privacy and security. Please review our Privacy
            Policy:{" "}
            <a
              href={`${webDomain}/privacy-policy`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {webDomain}/privacy-policy
            </a>
            . By using the Services, you agree to be bound by our Privacy
            Policy, which is incorporated into these Legal Terms. Please be
            advised the Services are hosted in India. If you access the Services
            from any other region of the world with laws or other requirements
            governing personal data collection, use, or disclosure that differ
            from applicable laws in India, then through your continued use of
            the Services, you are transferring your data to India, and you
            expressly consent to have your data transferred to and processed in
            India.
          </p>
        </div>
        <div id={"terminationRef"}>
          <h3 className="mt-4">13. TERM AND TERMINATION</h3>
          <p>
            These Legal Terms shall remain in full force and effect while you
            use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE
            LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND
            WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES
            (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY
            REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF
            ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL
            TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR
            USE OR PARTICIPATION IN THE SERVICES OR DELETE ANY CONTENT OR
            INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR
            SOLE DISCRETION.
          </p>
          <p>
            If we terminate or suspend your account for any reason, you are
            prohibited from registering and creating a new account under your
            name, a fake or borrowed name, or the name of any third party, even
            if you may be acting on behalf of the third party. In addition to
            terminating or suspending your account, we reserve the right to take
            appropriate legal action, including without limitation pursuing
            civil, criminal, and injunctive redress.
          </p>
        </div>
        <div id={"modificationsRef"}>
          <h3 className="mt-4">14. MODIFICATIONS AND INTERRUPTIONS</h3>
          <p>
            We reserve the right to change, modify, or remove the contents of
            the Services at any time or for any reason at our sole discretion
            without notice. However, we have no obligation to update any
            information on our Services. We also reserve the right to modify or
            discontinue all or part of the Services without notice at any time.
            We will not be liable to you or any third party for any
            modification, price change, suspension, or discontinuance of the
            Services.
          </p>
          <p>
            We cannot guarantee the Services will be available at all times. We
            may experience hardware, software, or other problems or need to
            perform maintenance related to the Services, resulting in
            interruptions, delays, or errors. We reserve the right to change,
            revise, update, suspend, discontinue, or otherwise modify the
            Services at any time or for any reason without notice to you. You
            agree that we have no liability whatsoever for any loss, damage, or
            inconvenience caused by your inability to access or use the Services
            during any downtime or discontinuance of the Services. Nothing in
            these Legal Terms will be construed to obligate us to maintain and
            support the Services or to supply any corrections, updates, or
            releases in connection therewith.
          </p>
        </div>
        <div id={"lawRef"}>
          <h3 className="mt-4">15. GOVERNING LAW</h3>
          <p>
            These Legal Terms shall be governed by and defined following the
            laws of India. The A To Z classes and yourself irrevocably consent
            that the courts of India shall have exclusive jurisdiction to
            resolve any dispute which may arise in connection with these Legal
            Terms.
          </p>
        </div>
        <div id={"resolutionRef"}>
          <h3 className="mt-4">16. DISPUTE RESOLUTION</h3>
          <p>
            You agree to irrevocably submit all disputes related to these Legal
            Terms or the legal relationship established by these Legal Terms to
            the jurisdiction of the India courts. The A To Z classes shall also
            maintain the right to bring proceedings as to the substance of the
            matter in the courts of the country where you reside or, if these
            Legal Terms are entered into in the course of your trade or
            profession, the state of your principal place of business.
          </p>
        </div>
        <div id={"correctionsRef"}>
          <h3 className="mt-4">17. CORRECTIONS</h3>
          <p>
            There may be information on the Services that contains typographical
            errors, inaccuracies, or omissions, including descriptions, pricing,
            availability, and various other information. We reserve the right to
            correct any errors, inaccuracies, or omissions and to change or
            update the information on the Services at any time, without prior
            notice.
          </p>
        </div>
        <div id={"disclaimerRef"}>
          <h3 className="mt-4">18. DISCLAIMER</h3>
          <p>
            THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
            AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO
            THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
            EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE
            THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON
            INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
            ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF
            ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE
            WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS,
            MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL
            INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM
            YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORISED ACCESS
            TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL
            INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY
            INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES,
            (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE
            TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR
            (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY
            LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY
            CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE
            SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
            RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A
            THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY
            WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
            ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE
            RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
            THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE
            OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT,
            YOU SHOULD USE YOUR BEST JUDGEMENT AND EXERCISE CAUTION WHERE
            APPROPRIATE.
          </p>
        </div>
        <div id={"liabilityRef"}>
          <h3 className="mt-4">19. LIMITATIONS OF LIABILITY</h3>
          <p>
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE
            TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
            EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
            PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM
            YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES.
          </p>
        </div>
        <div id={"indemnificationRef"}>
          <h3 className="mt-4">20. INDEMNIFICATION</h3>
          <p>
            You agree to defend, indemnify, and hold us harmless, including our
            subsidiaries, affiliates, and all of our respective officers,
            agents, partners, and employees, from and against any loss, damage,
            liability, claim, or demand, including reasonable attorneys’ fees
            and expenses, made by any third party due to or arising out of: (1)
            use of the Services; (2) breach of these Legal Terms; (3) any breach
            of your representations and warranties set forth in these Legal
            Terms; (4) your violation of the rights of a third party, including
            but not limited to intellectual property rights; or (5) any overt
            harmful act toward any other user of the Services with whom you
            connected via the Services. Notwithstanding the foregoing, we
            reserve the right, at your expense, to assume the exclusive defence
            and control of any matter for which you are required to indemnify
            us, and you agree to cooperate, at your expense, with our defence of
            such claims. We will use reasonable efforts to notify you of any
            such claim, action, or proceeding which is subject to this
            indemnification upon becoming aware of it.
          </p>
        </div>
        <div id={"userDataRef"}>
          <h3 className="mt-4">21. USER DATA</h3>
          <p>
            We will maintain certain data that you transmit to the Services for
            the purpose of managing the performance of the Services, as well as
            data relating to your use of the Services. Although we perform
            regular routine backups of data, you are solely responsible for all
            data that you transmit or that relates to any activity you have
            undertaken using the Services. You agree that we shall have no
            liability to you for any loss or corruption of any such data, and
            you hereby waive any right of action against us arising from any
            such loss or corruption of such data.
          </p>
        </div>
        <div id={"communicationsRef"}>
          <h3 className="mt-4">
            22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
          </h3>
          <p>
            Visiting the Services, sending us emails, and completing online
            forms constitute electronic communications. You consent to receive
            electronic communications, and you agree that all agreements,
            notices, disclosures, and other communications we provide to you
            electronically, via email and on the Services, satisfy any legal
            requirement that such communication be in writing. YOU HEREBY AGREE
            TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER
            RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND
            RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE
            SERVICES. You hereby waive any rights or requirements under any
            statutes, regulations, rules, ordinances, or other laws in any
            jurisdiction which require an original signature or delivery or
            retention of non-electronic records, or to payments or the granting
            of credits by any means other than electronic means.
          </p>
        </div>
        <div id={"smsRef"}>
          <h3 className="mt-4">23. SMS TEXT MESSAGING</h3>
          <h5> Opting Out</h5>
          <p>
            If at any time you wish to stop receiving SMS messages from us,
            simply reply to the text with "STOP.” You may receive an SMS message
            confirming your opt out.
          </p>{" "}
          <h5> Message and Data Rates</h5>
          <p>
            {" "}
            Please be aware that message and data rates may apply to any SMS
            messages sent or received. The rates are determined by your carrier
            and the specifics of your mobile plan.
          </p>
          <h5>Support</h5>
          <p>
            If you have any questions or need assistance regarding our SMS
            communications, please email us at connect@theatozclasses.com or
            call at +919454509368.
          </p>
        </div>
        <div id={"miscellaneousRef"}>
          <h3 className="mt-4">24. MISCELLANEOUS</h3>
          <p>
            These Legal Terms and any policies or operating rules posted by us
            on the Services or in respect to the Services constitute the entire
            agreement and understanding between you and us. Our failure to
            exercise or enforce any right or provision of these Legal Terms
            shall not operate as a waiver of such right or provision. These
            Legal Terms operate to the fullest extent permissible by law. We may
            assign any or all of our rights and obligations to others at any
            time. We shall not be responsible or liable for any loss, damage,
            delay, or failure to act caused by any cause beyond our reasonable
            control. If any provision or part of a provision of these Legal
            Terms is determined to be unlawful, void, or unenforceable, that
            provision or part of the provision is deemed severable from these
            Legal Terms and does not affect the validity and enforceability of
            any remaining provisions. There is no joint venture, partnership,
            employment or agency relationship created between you and us as a
            result of these Legal Terms or use of the Services. You agree that
            these Legal Terms will not be construed against us by virtue of
            having drafted them. You hereby waive any and all defences you may
            have based on the electronic form of these Legal Terms and the lack
            of signing by the parties hereto to execute these Legal Terms.
          </p>
        </div>
        <div id={"contactRef"}>
          <h3 className="mt-4">25. CONTACT US</h3>
          <p>
            In order to resolve a complaint regarding the Services or to receive
            further information regarding use of the Services, please contact us
            at:
          </p>
          <h5>
            The A To Z Classes <br />
            India <br />
            Phone +91{phone} <br />
            {email}
          </h5>
        </div>
      </Section>
    </Terms>
  );
};

export default TERMSANDCONDITIONS;
