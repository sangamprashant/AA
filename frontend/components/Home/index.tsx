import dynamic from 'next/dynamic';
import { Fragment } from "react";

// Dynamically import all components
const Footer = dynamic(() => import("../Footer"), { ssr: false });
const ContactHome = dynamic(() => import("../pages/Contact/ContactHome"), { ssr: false });
const BookClass = dynamic(() => import("./Book"), { ssr: false });
const Classes = dynamic(() => import("./Classes"), { ssr: false });
const Faq = dynamic(() => import("./Faq"), { ssr: false });
const Features = dynamic(() => import("./Features"), { ssr: false });
const WhatNext = dynamic(() => import("./JEE"), { ssr: false });
const ContentExplore = dynamic(() => import("./Content/ContentExpore"), { ssr: false });
const ReviewStudent = dynamic(() => import("./Reviews/Student"), { ssr: false });
const ReviewParent = dynamic(() => import("./Reviews/Parent/Parent"), { ssr: false });
const ParentsTrust = dynamic(() => import("./Reviews/Parent/ParentsTrust"), { ssr: false });
const Mentors = dynamic(() => import("./Reviews/Mentors"), { ssr: false });
const Try = dynamic(() => import('./Hero/Try'), { ssr: false });

const Home = () => {
  return (
    <Fragment>
      <Try />
      <Features />
      <Classes />
      <ReviewStudent />
      <ReviewParent />
      <ParentsTrust />
      <Mentors />
      <BookClass />
      <ContactHome />
      <ContentExplore />
      <Faq />
      <WhatNext />
      <Footer />
    </Fragment>
  );
};

export default Home;
