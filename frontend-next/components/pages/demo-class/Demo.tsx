import { useEffect } from "react";
import Partner from "../../Class/Partner";
import Footer from "../../Footer";
import BookClass from "../../Home/Book";
import ContactHome from "../Contact/ContactHome";

import { featuresData, NumbersCountFeatures } from "../../Home/Features";
import Section from "../../Reuse/Section";

const Demo = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <BookClass />
      <Section>
        <div className="about-us-count-container mt-5">
          {featuresData.map((data, index) => {
            return (
              <div className="shadow py-3">
                <NumbersCountFeatures
                  end={data.end}
                  suffix={data.suffix}
                  title={data.title}
                  key={index}
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
