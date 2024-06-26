import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";

const contactDetails = [
  {
    icon: faLocationDot,
    text: "JeetPur Birdpur No13, Siddharth Nagar",
    href: "#",
  },
  {
    icon: faPhone,
    text: "Call +01 1234567890",
    href: "tel:+011234567890",
  },
  {
    icon: faEnvelope,
    text: "demo@gmail.com",
    href: "mailto:demo@gmail.com",
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
                  <a key={index} href={contact.href}>
                    <FontAwesomeIcon icon={contact.icon} aria-hidden="true" />{" "}
                    <span>{contact.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <div className="footer_detail">
              <a href="#" className="footer-logo text-decoration-none">
                The A to Z Classes
              </a>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                optio iure a possimus, reprehenderit dolor maiores cumque
                repudiandae voluptas error vitae fugit similique magnam iste
                placeat veniam aliquam. Suscipit, tenetur.
              </p>
              <SocialLinks />
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <div className="footer_contact">
              <h4>Important links</h4>
              <div className="contact_link_box">
                {impLinks.map((contact, index) => (
                  <Link key={index} to={contact.link}>
                    <span>{contact.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-info text-center mt-3">
          <p>
            &copy; <span id="displayYear">{new Date().getFullYear()}</span> All
            Rights Reserved By{" "}
            <a href="/" className="text-primary">
              The A to Z Classes
            </a>
          </p>
          <sub>
            Designed By{" "}
            <a
              href="https://github.com/sangamprashant"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prashant Srivastav
            </a>
          </sub>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
