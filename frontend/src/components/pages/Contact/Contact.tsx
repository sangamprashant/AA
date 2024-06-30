import React from "react";
import Footer from "../../Footer";
import PageHeaders from "../PageHeaders";
import ContactForm from "./ContactForm";
import "./contact.css";

const Contact = () => {
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeaders
        title="CONTACT US"
        description="Our dream team of conversion specialists are looking forward to hearing from you!"
      />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Contact;
