"use client"
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, notification, NotificationArgsProps } from "antd";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { config } from "../../../config";
import Section from "../../Reuse/Section";
import { address, phone, socialLinks as SocialLink } from "@/strings";
import Link from "next/link";

type NotificationPlacement = NotificationArgsProps["placement"];

const socialLinks = [
  {
    icon: faFacebook,
    text: "Be the first on your block to get product updates, announcements, news and lots of really good content, like us on Facebook today!",
    link: SocialLink.facebook,
  },
  {
    icon: faInstagram,
    text: "Follow us on Instagram for the latest photos and videos from our events and projects.",
    link: SocialLink.instagram,
  },
  {
    icon: faLinkedin,
    text: "Connect with us on LinkedIn to stay updated with our professional journey and opportunities.",
    link: SocialLink.linkedin,
  },
  {
    icon: faTwitter,
    text: "Join the conversation on Twitter for real-time updates and community interaction.",
    link: SocialLink.twitter,
  },
];
const initialValue = {
  fname: "",
  lname: "",
  phone: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const [formData, setFormData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Section className="py-5 mt-4">
      {contextHolder}
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
                    type="number"
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
                <Alert
                  type="error"
                  message={errorMsg}
                  className={`my-2 opacity-${errorMsg ? "100" : "0"}`}
                />
                <div className="mb-3 text-end">
                  <button
                    type="submit"
                    className="btn theme-btn"
                    disabled={loading}
                  >
                    {loading ? "Plaese Wait.." : "Submit Now"}
                  </button>
                </div>
              </form>
            </div>

            <div className="col-xs-12 col-sm-6 contact-info">
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <h2 className=" ">Education Hub</h2>
                  <p className="address d-flex gap-2">
                    <FontAwesomeIcon icon={faLocationDot} />{" "}
                    <span> {address}</span>
                  </p>
                </div>

                <div className="col-xs-12 col-sm-6">
                  <h2 className="head-border-default">Customer Support</h2>
                  <p className="phone">
                    <FontAwesomeIcon icon={faPhone} /> +91 {phone}
                  </p>
                  <p className="phone">
                    <FontAwesomeIcon icon={faEnvelope} />{" "}
                    connect@theatozclasses.com
                  </p>
                </div>
                <h2 className="p-0 m-0">Others ways to connect</h2>
                <div className="social-links-contact">
                  {socialLinks.map((link, index) => (
                    <div className="d-flex gap-3 mb-3" key={index}>
                      <Link
                        href={link.link}
                        className="social-link"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={link.icon} />
                      </Link>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.614677130728!2d80.88761957508635!3d26.852205376683294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bffc1f66683a1%3A0x27015bc5a83b6e6d!2sTikait%20Rai%20Talab%20Colony!5e0!3m2!1sen!2sin!4v1721164640438!5m2!1sen!2sin"
          style={{
            filter: "grayscale(0) contrast(1.2) opacity(0.8)",
          }}
        ></iframe>
      </div>
    </Section>
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      !formData.email.trim() ||
      !formData.fname.trim() ||
      !formData.lname.trim() ||
      !formData.message.trim() ||
      !formData.phone.trim()
    ) {
      setErrorMsg("All fields are required!");
      return;
    }
    const reqBody = {
      firstName: formData.fname.trim(),
      lastName: formData.lname.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phone.trim(),
      message: formData.message.trim(),
    };
    try {
      setLoading(true);
      const response = await axios.post(`${config.SERVER}/contact`, reqBody);
      if (response.data.success) {
        setFormData(initialValue);
        openNotification(
          "Your contact details have been successfully submitted."
        );
        setErrorMsg(null);
      }
    } catch (error) {
      console.log({ error });
      setErrorMsg("Something went wrong, please try again later!");
    } finally {
      setLoading(false);
    }
  }

  function openNotification(message: string) {
    api.success({
      message: "Form Submitted Successfully",
      description: message,
      placement: "bottomRight" as NotificationPlacement,
    });
  }
};

export default ContactForm;
