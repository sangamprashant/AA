import dynamic from 'next/dynamic';
import { Fragment } from "react";

// Dynamically import all components
const Footer = dynamic(() => import("../Footer"), { ssr: true });
const ContactHome = dynamic(() => import("../pages/Contact/ContactHome"), { ssr: true });
const BookClass = dynamic(() => import("./Book"), { ssr: true });
const Classes = dynamic(() => import("./Classes"), { ssr: true });
const Faq = dynamic(() => import("./Faq"), { ssr: true });
const Features = dynamic(() => import("./Features"), { ssr: true });
const WhatNext = dynamic(() => import("./JEE"), { ssr: true });
const ContentExplore = dynamic(() => import("./Content/ContentExpore"), { ssr: true });
const ReviewStudent = dynamic(() => import("./Reviews/Student"), { ssr: false });
const ReviewParent = dynamic(() => import("./Reviews/Parent/Parent"), { ssr: false });
const ParentsTrust = dynamic(() => import("./Reviews/Parent/ParentsTrust"), { ssr: true });
const Mentors = dynamic(() => import("./Reviews/Mentors"), { ssr: true });
const Try = dynamic(() => import('./Hero/Try'), { ssr: true });

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
