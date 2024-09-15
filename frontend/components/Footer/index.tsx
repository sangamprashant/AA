"use client"
import { address, appName, email, phone } from "@/strings";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import "./footer.css";

const contactDetails = [
  {
    icon: faPhone,
    text: `Call +91 ${phone}`,
    href: `tel:+91${phone}`,
  },
  {
    icon: faEnvelope,
    text: email,
    href: `mailto:${email}`,
  },
  {
    icon: faLocationDot,
    text: address,
    href: "#",
  },
];

export const impLinks = [
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
    link: "/terms/privacy-policy",
  },
  {
    title: "Cookie Policy",
    link: "/terms/cookie-policy",
  },
  {
    title: "Terms and Conditions",
    link: "/terms",
  },
  {
    title: "Return Policy",
    link: "/terms/return-policy",
  },
  {
    title: "Disclaimer",
    link: "/terms/disclaimer",
  },
  {
    title: "Acceptable Use Policy",
    link: "/terms/acceptable-use",
  },
];

const Footer = () => {
  return (
    <footer className="footer_section text-center">
      <div className="footer-animation"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-col px-5">
            <div className="footer_contact">
              <h4>Contact Us</h4>
              <div className="contact_link_box">
                {contactDetails.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="d-flex gap-3 text-wrap text-start"
                    style={{
                      overflowWrap: "break-word",
                    }}
                  >
                    <FontAwesomeIcon icon={contact.icon} aria-hidden="true" />{" "}
                    <span className="text-wrap">{contact.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col p-2">
            <div className="footer_detail">
              <Link href="/" className="footer-logo text-decoration-none">
                The A to Z Classes
              </Link>
              <p className="text-center">
                At The A to Z Classes, we are dedicated to providing
                comprehensive and personalized education to our students. Our
                experienced instructors, up-to-date curriculum, and interactive
                teaching methods ensure a high level of student achievement and
                satisfaction. Join us to excel in your academic journey and
                beyond.
              </p>
            </div>
          </div>
          <div className="col-md-4 footer-col px-5">
            <div className="footer_contact">
              <h4>Important Links</h4>
              <div className="contact_link_box ">
                {impLinks.map((contact, index) => (
                  <Link key={index} href={contact.link}>
                    <span>{contact.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SocialLinks />
        <div className="footer-info text-center mt-4">
          <sup>
            &copy; <span id="displayYear">{new Date().getFullYear()}</span> All
            Rights Reserved By{" "}
            <a href="/" className="text-white">
              {appName}
            </a>
          </sup>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
