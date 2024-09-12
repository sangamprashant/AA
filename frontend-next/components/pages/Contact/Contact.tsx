import Footer from "../../Footer";
import PageHeaders from "../PageHeaders";
import ContactForm from "./ContactForm";


const Contact = () => {
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
