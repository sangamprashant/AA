import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useState } from "react";
import Section from "../../Reuse/Section";

const socialLinks = [
  {
    icon: faFacebook,
    text: "Be the first on your block to get product updates, announcements, news and lots of really good content, like us on Facebook today!",
  },
  {
    icon: faInstagram,
    text: "Follow us on Instagram for the latest photos and videos from our events and projects.",
  },
  {
    icon: faLinkedin,
    text: "Connect with us on LinkedIn to stay updated with our professional journey and opportunities.",
  },
  {
    icon: faTwitter,
    text: "Join the conversation on Twitter for real-time updates and community interaction.",
  },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log("Form submitted!", formData);
  };

  return (
    <Section className="py-5 mt-4">
      <div className="page-spacer clearfix">
        <div className="container">
          <div className="row align-stretch">
            <div className="col-xs-12 col-sm-6 contact-form">
              <h1>REACH OUT TO US!</h1>
              <p>
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <form className="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    name="fname"
                    placeholder="First Name"
                    required
                    value={formData.fname}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    name="lname"
                    placeholder="Last Name"
                    required
                    value={formData.lname}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows={7}
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3 text-end">
                  <button type="submit" className="btn theme-btn">
                    Submit Now
                  </button>
                </div>
              </form>
            </div>

            <div className="col-xs-12 col-sm-6 contact-info">
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <h2 className=" ">Education Press</h2>
                  <p className="address">
                    <FontAwesomeIcon icon={faLocationDot} /> Lorem ipsum dolor
                    sit, amet consectetur adipisicing elit. Tempora sequi
                    accusamus facere.
                  </p>
                </div>

                <div className="col-xs-12 col-sm-6">
                  <h2 className="head-border-default">Customer Support</h2>
                  <p className="phone">
                    <FontAwesomeIcon icon={faPhone} /> 731-234-5678
                  </p>
                </div>
                <h2 className="p-0 m-0">Others ways to connect</h2>
                <div className="social-links-contact">
                  {socialLinks.map((link, index) => (
                    <div className="d-flex gap-3 mb-3" key={index}>
                      <div className="social-link">
                        <FontAwesomeIcon icon={link.icon} />
                      </div>
                      <div className="social-link-content">
                        <p>{link.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="position-relative mb-5" style={{ height: "400px" }}>
        <h1 className="display-6">Map and Location</h1>
        <iframe
          width="100%"
          height="100%"
          title="map"
          scrolling="no"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.364871941983!2d81.07030757508787!3d26.891912976659526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399958aa9da50cb7%3A0x8f5a1f4d75d0d691!2sShri%20Ramswaroop%20College%20Of%20Engineering%20and%20Management!5e0!3m2!1sen!2sus!4v1719218134322!5m2!1sen!2sus"
          style={{
            filter: "grayscale(0) contrast(1.2) opacity(0.8)",
          }}
        ></iframe>
      </div>
    </Section>
  );
};

export default ContactForm;
