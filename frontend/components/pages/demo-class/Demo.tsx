"use client"
import Partner from "../../Class/Partner";
import Footer from "../../Footer";
import BookClass from "../../Home/Book";
import ContactHome from "../Contact/ContactHome";
import { featuresData, NumbersCountFeatures } from "../../Home/Features";
import Section from "../../Reuse/Section";

const Demo = () => {
  return (
    <>
      <BookClass />
      <Section>
        <div className="about-us-count-container mt-5">
          {featuresData.map((data, index) => {
            return (
              <div className="shadow py-3" key={index}>
                <NumbersCountFeatures
                  end={data.end}
                  suffix={data.suffix}
                  title={data.title}
                />
              </div>
            );
          })}
        </div>
      </Section>
      <Partner />
      <ContactHome />
      <Footer />
    </>
  );
};

export default Demo;
