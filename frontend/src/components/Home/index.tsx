import { Fragment, useEffect } from "react";
import Footer from "../Footer";
import ContactHome from "../pages/Contact/ContactHome";
import BookClass from "./Book";
import Classes from "./Classes";
import ContentExpore from "./Content-ferjie/ContentExpore";
import Faq from "./Faq";
import Features from "./Features";
import Try from "./Hero/Try";
import Mentors from "./Reviews/Mentors";
import ReviewParent from "./Reviews/Parent/Parent";
import ParentsTrust from "./Reviews/Parent/ParentsTrust";
import ReviewStudent from "./Reviews/Student";
import WhatNext from "./JEE-ferjie";
import Class1 from "./Content-ferjie/Class1/Class1";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Class1 />
      <Try />
      <Features />
      <Classes />
      <ReviewStudent />
      <ReviewParent />
      <ParentsTrust />
      <Mentors />
      <BookClass />
      <ContactHome />
      <ContentExpore />
      <Faq />
      <WhatNext />
      <Footer />
    </Fragment>
  );
};

export default Home;
