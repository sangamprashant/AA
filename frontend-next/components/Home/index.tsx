import { Fragment } from "react";
import Footer from "../Footer";
// import ContactHome from "../pages/Contact/ContactHome";
import BookClass from "./Book";
import Classes from "./Classes";
import Faq from "./Faq";
import Features from "./Features";
import Try from "./Hero/Try";
import Mentors from "./Reviews/Mentors";
import ReviewParent from "./Reviews/Parent/Parent";
import ParentsTrust from "./Reviews/Parent/ParentsTrust";
import ReviewStudent from "./Reviews/Student";
import Class1 from "./Content/Class1/Class1";
import ContentExplore from "./Content/ContentExpore";
import WhatNext from "./JEE";

const Home = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

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
      {/* <ContactHome /> */}
      <ContentExplore />
      <Faq />
      <WhatNext />
      <Footer />
    </Fragment>
  );
};

export default Home;
