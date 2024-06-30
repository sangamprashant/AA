import { useEffect } from "react";
// import Section from "../Reuse/Section";
import BookClass from "./Book";
// import CarouselComponent from "./CarouselComponent";
import Classes from "./Classes";
import Faq from "./Faq";
// import Hero from "./Hero";
// import Yout from "./Hero/Yout";
import Mentors from "./Reviews/Mentors";
import ReviewStudent from "./Reviews/Student";
// import Navbar from "../Navbar";
import Footer from "../Footer";
import ContactHome from "../pages/Contact/ContactHome";
import Features from "./Features";
import Try from "./Hero/Try";
import ReviewParent from "./Reviews/Parent/Parent";
import ParentsTrust from "./Reviews/Parent/ParentsTrust";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Try />
      {/* <div className="top">
        <Section>
          <CarouselComponent>
            <Hero />
            <Yout />
          </CarouselComponent>
        </Section>
      </div> */}
      <Features />
      <Classes />
      <ReviewStudent />
      <ReviewParent />
      <ParentsTrust />
      <Mentors />
      <BookClass />
      <ContactHome />
      <Faq />
      <Footer />
    </>
  );
};

export default Home;
