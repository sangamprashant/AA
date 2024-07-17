import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { address, phone } from "../Strings";
import SocialLinks from "./SocialLinks";

const contactDetails = [
  {
    icon: faLocationDot,
    text: address,
    href: "#",
  },
  {
    icon: faPhone,
    text: `Call +91 ${phone}`,
    href: `tel:+91${phone}`,
  },
  {
    icon: faEnvelope,
    text: "connect@theatozclasses.com",
    href: "mailto:connect@theatozclasses.com",
  },
];

const impLinks = [
  {
    title: "About Us",
    link: "/about-us",
  },
  {
    title: "Contact Us",
    link: "/contact-us",
  },
  {
    title: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    title: "Cookie Policy",
    link: "/cookie-policy",
  },
  {
    title: "Terms and Conditions",
    link: "/terms",
  },
  {
    title: "Return Policy",
    link: "/return-policy",
  },
  {
    title: "Disclaimer",
    link: "/disclaimer",
  },
  {
    title: "Acceptable Use Policy",
    link: "/acceptable-use",
  },
];

const Footer = () => {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-col">
            <div className="footer_contact">
              <h4>Contact Us</h4>
              <div className="contact_link_box">
                {contactDetails.map((contact, index) => (
                  <a key={index} href={contact.href} className=" text-wrap">
                    <FontAwesomeIcon icon={contact.icon} aria-hidden="true" />{" "}
                    <span>{contact.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <div className="footer_detail">
              <a href="/" className="footer-logo text-decoration-none">
                The A to Z Classes
              </a>
              <p>
                At The A to Z Classes, we are dedicated to providing
                comprehensive and personalized education to our students. Our
                experienced instructors, up-to-date curriculum, and interactive
                teaching methods ensure a high level of student achievement and
                satisfaction. Join us to excel in your academic journey and
                beyond.
              </p>
              <SocialLinks />
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <div className="footer_contact">
              <h4>Important Links</h4>
              <div className="contact_link_box">
                {impLinks.map((contact, index) => (
                  <a key={index} href={contact.link}>
                    <span>{contact.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-info text-center mt-0">
          <sup>
            &copy; <span id="displayYear">{new Date().getFullYear()}</span> All
            Rights Reserved By{" "}
            <a href="/" className="text-white">
              true A to Z Classes
            </a>
          </sup>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
