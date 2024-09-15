// import { useLayoutEffect } from "react";
import Terms, { ListStyle } from "..";
import Section from "../../../Reuse/Section";
import { phone, webDomain } from "@/strings";
import TermsHeader from "../TermsHeader";

const COOKIESPOLICY = () => {
  return (
    <Terms>
      <Section>
        <TermsHeader title="COOKIE POLICY" desc="Last updated July 16, 2024" />
        <p>
          {" "}
          This Cookie Policy explains how The A To Z classes ("<b>Company</b>,"
          "<b>we</b>," "<b>us</b>," and "<b>our</b>") uses cookies and similar
          technologies to recognize you when you visit our website at{" "}
          <a href={webDomain} target="_blank" rel="noopener noreferrer">
            {webDomain}
          </a>{" "}
          ("<b>Website</b>"). It explains what these technologies are and why we
          use them, as well as your rights to control our use of them.
        </p>
        <p>
          {" "}
          In some cases we may use cookies to collect personal information, or
          that becomes personal information if we combine it with other
          information.
        </p>

        <h3 className="mt-4"> What are cookies?</h3>
        <p>
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners in order to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
        </p>
        <p>
          Cookies set by the website owner (in this case, The A To Z classes)
          are called "first party cookies." Cookies set by parties other than
          the website owner are called "third party cookies." Third-party
          cookies enable third-party features or functionality to be provided on
          or through the website (e.g., advertising, interactive content, and
          analytics). The parties that set these third-party cookies can
          recognize your computer both when it visits the website in question
          and also when it visits certain other websites.
        </p>
        {/* --------------------------------------------------------------- */}
        <h3 className="mt-4">Why do we use cookies?</h3>
        <p>
          We use first- and third-party cookies for several reasons. Some
          cookies are required for technical reasons in order for our Website to
          operate, and we refer to these as "essential" or "strictly necessary"
          cookies. Other cookies also enable us to track and target the
          interests of our users to enhance the experience on our Online
          Properties. Third parties serve cookies through our Website for
          advertising, analytics, and other purposes. This is described in more
          detail below.
        </p>
        {/* ---------------------------------------------------------------- */}
        <h3 className="mt-4">How can I control cookies?</h3>
        <p>
          You have the right to decide whether to accept or reject cookies. You
          can exercise your cookie rights by setting your preferences in the
          Cookie Consent Manager. The Cookie Consent Manager allows you to
          select which categories of cookies you accept or reject. Essential
          cookies cannot be rejected as they are strictly necessary to provide
          you with services.
        </p>
        <p>
          The Cookie Consent Manager can be found in the notification banner and
          on our website. If you choose to reject cookies, you may still use our
          website though your access to some functionality and areas of our
          website may be restricted. You may also set or amend your web browser
          controls to accept or refuse cookies.
        </p>
        <p>
          The specific types of first- and third-party cookies served through
          our Website and the purposes they perform are described in the table
          below (please note that the specific cookies served may vary depending
          on the specific Online Properties you visit):
        </p>
        {/* ---------------------------------------------------------------- */}
        <h3 className="mt-4">How can I control cookies on my browser?</h3>
        <p>
          As the means by which you can refuse cookies through your web browser
          controls vary from browser to browser, you should visit your browser's
          help menu for more information. The following is information about how
          to manage cookies on the most popular browsers:
        </p>
        <ul style={ListStyle}>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d"
              target="_blank"
              rel="noopener noreferrer"
            >
              Internet Explorer
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edge
            </a>
          </li>
          <li>
            <a
              href="https://help.opera.com/en/latest/web-preferences/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Opera
            </a>
          </li>
        </ul>

        <p>
          In addition, most advertising networks offer you a way to opt out of
          targeted advertising. If you would like to find out more information,
          please visit:
        </p>
        <ul style={ListStyle}>
          <li>
            <a
              href="https://optout.aboutads.info/?c=2&lang=EN"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digital Advertising Alliance
            </a>
          </li>
          <li>
            <a
              href="https://youradchoices.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digital Advertising Alliance of Canada
            </a>
          </li>
          <li>
            <a
              href="https://www.youronlinechoices.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              European Interactive Digital Advertising Alliance
            </a>
          </li>
        </ul>
        {/* ---------------------------------------------------------------- */}
        <h3 className="mt-4">
          What about other tracking technologies, like web beacons?
        </h3>
        <p>
          Cookies are not the only way to recognize or track visitors to a
          website. We may use other, similar technologies from time to time,
          like web beacons (sometimes called "tracking pixels" or "clear gifs").
          These are tiny graphics files that contain a unique identifier that
          enables us to recognize when someone has visited our Website or opened
          an email including them. This allows us, for example, to monitor the
          traffic patterns of users from one page within a website to another,
          to deliver or communicate with cookies, to understand whether you have
          come to the website from an online advertisement displayed on a
          third-party website, to improve site performance, and to measure the
          success of email marketing campaigns. In many instances, these
          technologies are reliant on cookies to function properly, and so
          declining cookies will impair their functioning.
        </p>
        {/* ---------------------------------------------------------------- */}
        <h3 className="mt-4">
          Do you use Flash cookies or Local Shared Objects?
        </h3>
        <p>
          Websites may also use so-called "Flash Cookies" (also known as Local
          Shared Objects or "LSOs") to, among other things, collect and store
          information about your use of our services, fraud prevention, and for
          other site operations.
        </p>
        <p>
          If you do not want Flash Cookies stored on your computer, you can
          adjust the settings of your Flash player to block Flash Cookies
          storage using the tools contained in the{" "}
          <a href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html">
            Website Storage Settings Panel
          </a>
          . You can also control Flash Cookies by going to the{" "}
          <a
            href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Global Storage Settings Panel
          </a>{" "}
          and following the instructions (which may include instructions that
          explain, for example, how to delete existing Flash Cookies (referred
          to "information" on the Macromedia site), how to prevent Flash LSOs
          from being placed on your computer without your being asked, and (for
          Flash Player 8 and later) how to block Flash Cookies that are not
          being delivered by the operator of the page you are on at the time).
        </p>
        <p>
          Please note that setting the Flash Player to restrict or limit
          acceptance of Flash Cookies may reduce or impede the functionality of
          some Flash applications, including, potentially, Flash applications
          used in connection with our services or online content.
        </p>
        {/* ---------------------------------------------------------------- */}
        <h3 className="mt-4">Do you serve targeted advertising?</h3>
        <p>
          Third parties may serve cookies on your computer or mobile device to
          serve advertising through our Website. These companies may use
          information about your visits to this and other websites in order to
          provide relevant advertisements about goods and services that you may
          be interested in. They may also employ technology that is used to
          measure the effectiveness of advertisements. They can accomplish this
          by using cookies or web beacons to collect information about your
          visits to this and other sites in order to provide relevant
          advertisements about goods and services of potential interest to you.
          The information collected through this process does not enables us or
          them to identify your name, contact details, or other details that
          directly identify you unless you choose to provide these.
        </p>
        {/* ---------------------------------------------------------------- */}
        <h3 className="mt-4">How often you update this Cookie Policy?</h3>
        <p>
          We may update this Cookie Policy from time to time in order to
          reflect, for example, changes to the cookies we use or for other
          operational, legal, or regulatory reasons. Please therefore revisit
          this Cookie Policy regularly to stay informed about our use of cookies
          and related technologies.
        </p>
        <p>
          The date at the top of this Cookie Policy indicates when it was last
          updated.
        </p>
        <h3 className="mt-4">Where can I get further information?</h3>
        <p>
          If you have any questions about our use of cookies or other
          technologies, please contact us at:
        </p>
        <p>
          The A To Z classes <br />
          India <br />
          Phone: +91{phone}
        </p>
      </Section>
    </Terms>
  );
};

export default COOKIESPOLICY;
