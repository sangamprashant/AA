
import Terms, { ListStyle } from "..";
import Section from "../../../Reuse/Section";
import TermsHeader from "../TermsHeader";
import { address, email, webDomain } from "@/strings";

const PRIVACYPOLICY = () => {
  return (
    <Terms>
      <Section>
        <TermsHeader title="PRIVACY POLICY" desc="Last updated June 25, 2024" />
        <p>
          This privacy notice for The A To Z classes ('<b>we</b>', '<b>us</b>',
          or '<b>our</b>'), describes how and why we might collect, store, use,
          and/or share ('<b>process</b>') your information when you use our
          services ('<b>Services</b>'), such as when you:
        </p>
        <ul style={ListStyle}>
          <li>
            Visit our website at{" "}
            <a href={webDomain} target="_blank" rel="noopener noreferrer">
              {webDomain}
            </a>
            , or any website of ours that links to this privacy notice
          </li>
          <li>
            Engage with us in other related ways, including any sales,
            marketing, or events
          </li>
        </ul>
        <p>
          <b>Questions or concerns?</b> Reading this privacy notice will help
          you understand your privacy rights and choices. If you do not agree
          with our policies and practices, please do not use our Services. If
          you still have any questions or concerns, please contact us at{" "}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <h3 className="mt-4">SUMMARY OF KEY POINTS</h3>
        <p className="font-weight-bold">
          <i>
            This summary provides key points from our privacy notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our{" "}
            <a href="#table-content">table of contents</a> below to find the
            section you are looking for.
          </i>
        </p>
        <p>
          What personal information do we process? When you visit, use, or
          navigate our Services, we may process personal information depending
          on how you interact with us and the Services, the choices you make,
          and the products and features you use. Learn more about{" "}
          <a href="#section7">personal information you disclose to us</a>.
        </p>
        <p>
          <b>Do we process any sensitive personal information?</b> We do not
          process sensitive personal information.
        </p>
        <p>
          <b>Do we collect any information from third parties?</b> We do not
          collect any information from third parties.
        </p>
        <p>
          <b>How do we process your information?</b> We process your information
          to provide, improve, and administer our Services, communicate with
          you, for security and fraud prevention, and to comply with law. We may
          also process your information for other purposes with your consent. We
          process your information only when we have a valid legal reason to do
          so. Learn more about{" "}
          <a href="#section10">how we process your information.</a>
        </p>
        <p>
          <b>
            In what situations and with which parties do we share personal
            information?
          </b>{" "}
          We may share information in specific situations and with specific
          third parties. Learn more about when and with whom we share your
          personal information.
        </p>
        <p>
          <b>How do we keep your information safe?</b> We have organisational
          and technical processes and procedures in place to protect your
          personal information. However, no electronic transmission over the
          internet or information storage technology can be guaranteed to be
          100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorised third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Learn more about how we keep your information
          safe.
        </p>
        <p>
          <b>What are your rights?</b> Depending on where you are located
          geographically, the applicable privacy law may mean you have certain
          rights regarding your personal information. Learn more about your
          privacy rights.
        </p>
        <p>
          <b>How do you exercise your rights?</b> The easiest way to exercise
          your rights is by submitting a data subject access request, or by
          contacting us. We will consider and act upon any request in accordance
          with applicable data protection laws.
        </p>
        <p>
          Want to learn more about what we do with any information we collect?{" "}
          <a href="#ection6">Review the privacy notice in full.</a>
        </p>
        <h3 className="my-4" id="table-content">
          TABLE OF CONTENTS
        </h3>
        <ol className="list-unstyled">
          <li>
            <a href="#section1">1. WHAT INFORMATION DO WE COLLECT?</a>
          </li>
          <li>
            <a href="#section2">2. HOW DO WE PROCESS YOUR INFORMATION?</a>
          </li>
          <li>
            <a href="#section3">
              3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </a>
          </li>
          <li>
            <a href="#section4">4. HOW LONG DO WE KEEP YOUR INFORMATION?</a>
          </li>
          <li>
            <a href="#section5">5. HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
          </li>
          <li>
            <a href="#section6">6. WHAT ARE YOUR PRIVACY RIGHTS?</a>
          </li>
          <li>
            <a href="#section7">7. HOW DO YOU EXERCISE YOUR PRIVACY RIGHTS?</a>
          </li>
          <li>
            <a href="#section8">8. DO WE MAKE UPDATES TO THIS NOTICE?</a>
          </li>
          <li>
            <a href="#section9">9. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
          </li>
          <li>
            <a href="#section10">
              10. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </a>
          </li>
        </ol>

        <h3 id="section1" className="my-4">
          1. WHAT INFORMATION DO WE COLLECT?
        </h3>
        <p className="font-weight-bold">
          Personal information you disclose to us
        </p>
        <p>
          <i>
            <b>In Short:</b> We collect personal information that you provide to
            us.
          </i>
        </p>
        <p>
          We collect personal information that you voluntarily provide to us
          when you express an interest in obtaining information about us or our
          products and Services, when you participate in activities on the
          Services, or otherwise when you contact us.
        </p>
        <p>
          <b>Personal Information Provided by You.</b> The personal information
          that we collect depends on the context of your interactions with us
          and the Services, the choices you make and the product and features
          you use. The personal information we collect may include the
          following:
        </p>
        <ul style={ListStyle}>
          <li>names</li>
          <li>phone numbers</li>
          <li>email addresses</li>
          <li>mailing addresses</li>
        </ul>
        <p>
          <b>Sensitive Information.</b> We do not process sensitive information.
        </p>
        <p>
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </p>

        <h3 id="section2" className="my-4">
          2. HOW DO WE PROCESS YOUR INFORMATION?
        </h3>
        <p>
          <b>In Short:</b> We process your information to provide, improve, and
          administer our Services, communicate with you, for security and fraud
          prevention, and to comply with law. We may also process your
          information for other purposes with your consent.
        </p>
        <p className="font-weight-bold">
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </p>
        <ul style={ListStyle}>
          <li>
            <b>To respond to user inquiries/offer support to users.</b> We may
            process your information to respond to your inquiries and solve any
            potential issues you might have with the requested service.
          </li>
          <li>
            <b>To enable user-to-user communications.</b> We may process your
            information if you choose to use any of our offerings that allow for
            communication with another user.
          </li>
        </ul>

        <h4 id="section3" className="my-4">
          3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </h4>
        <p>
          <i>
            <b>In Short:</b> We may share information in specific situations
            described in this section and/or with the following third parties.
          </i>
        </p>
        <p>
          We may need to share your personal information in the following
          situations:
        </p>
        <ul style={ListStyle}>
          <li>
            <b>Business Transfers.</b> We may share or transfer your information
            in connection with, or during negotiations of, any merger, sale of
            company assets, financing, or acquisition of all or a portion of our
            business to another company.
          </li>
          <li>
            <b>When we use Google Maps Platform APIs.</b> We may share your
            information with certain Google Maps Platform APIs (e.g., Google
            Maps API, Places API). To find out more about Google’s Privacy
            Policy, please refer to this link.
          </li>
        </ul>

        <h3 id="section4" className="my-4">
          4. HOW LONG DO WE KEEP YOUR INFORMATION?
        </h3>
        <p>
          <i>
            <b>In Short:</b> We keep your information for as long as necessary
            to fulfill the purposes outlined in this privacy notice unless
            otherwise required by law.
          </i>
        </p>
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us.
        </p>
        <p>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>

        <h3 id="section5" className="my-4">
          5. HOW DO WE KEEP YOUR INFORMATION SAFE?
        </h3>
        <p>
          <i>
            <b>In Short:</b> We aim to protect your personal information through
            a system of organizational and technical security measures.
          </i>
        </p>
        <p>
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security, and improperly collect, access, steal, or
          modify your information.
        </p>

        <h3 id="section6" className="my-4">
          6. WHAT ARE YOUR PRIVACY RIGHTS?
        </h3>
        <p>
          <i>
            <b>In Short:</b> You may review, change, or terminate your account
            at any time.
          </i>
        </p>
        <p>
          If you are a resident in the EEA or UK and you believe we are
          unlawfully processing your personal information, you also have the
          right to complain to your local data protection supervisory authority.
          You can find their contact details here:
          https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
        </p>
        <p>
          If you are a resident in Switzerland, the contact details for the data
          protection authorities are available here:
          https://www.edoeb.admin.ch/edoeb/en/home.html.
        </p>

        <h3 id="section7" className="my-4">
          7. HOW DO YOU EXERCISE YOUR PRIVACY RIGHTS?
        </h3>
        <p>
          {" "}
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track ('DNT') feature or setting you can
          activate to signal your privacy preference not to have data about your
          online browsing activities monitored and collected. At this stage, no
          uniform technology standard for recognising and implementing DNT
          signals has been finalised. As such, we do not currently respond to
          DNT browser signals or any other mechanism that automatically
          communicates your choice not to be tracked online. If a standard for
          online tracking is adopted that we must follow in the future, we will
          inform you about that practice in a revised version of this privacy
          notice.
        </p>

        <h3 id="section8" className="my-4">
          8. DO WE MAKE UPDATES TO THIS NOTICE?
        </h3>
        <p>
          <i>
            <b>In Short:</b> Yes, we will update this notice as necessary to
            stay compliant with relevant laws.
          </i>
        </p>
        <p>
          {" "}
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated 'Revised' date at the top of
          this privacy notice. If we make material changes to this privacy
          notice, we may notify you either by prominently posting a notice of
          such changes or by directly sending you a notification. We encourage
          you to review this privacy notice frequently to be informed of how we
          are protecting your information.
        </p>

        <h3 id="section9" className="my-4">
          9. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </h3>
        <p>
          If you have questions or comments about this notice, you may email us
          at <a href={`mailto:${email}`}>{email}</a> or by post to:
        </p>
        <ul className=" list-unstyled">
          <li>The A To Z classes</li>
          {address}
          <li>India</li>
        </ul>

        <h3 id="section10" className="my-4">
          10. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </h3>
        <p>
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          change that information, or delete it in some circumstances. To
          request to review, update, or delete your personal information, please
          visit: <a href={`${webDomain}/contact-us`}>{webDomain}/contact-us</a>. We will respond to
          your request within 30 days.
        </p>
      </Section>
    </Terms>
  );
};

export default PRIVACYPOLICY;
