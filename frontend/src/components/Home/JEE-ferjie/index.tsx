import Section from "../../Reuse/Section";
import "./whatNext.css";

const WhatNext = () => {
  return (
    <Section id="what-next" className="my-5">
      <div className="d-flex justify-content-center">
        <div className="d-flex shadow-lg what-next-container col-md-10">
          <div className="col-md-4 left d-flex align-items-center justify-content-center flex-column py-5">
            <h2 className="text-center">What's Next?</h2>
            <p className="text-">
              Explore our upcoming streams and stay ahead in your preparation.
            </p>
          </div>
          <div className="col-md-8 p-3">
            <div className="next-steps">
              <p>
                Our JEE preparation resources offer detailed study guides,
                expert video tutorials, and interactive quizzes to help you
                excel. You’ll also find previous year’s papers to familiarize
                yourself with the exam pattern.
              </p>
              <p>
                In the coming weeks, look out for live Q&A sessions, specialized
                workshops, and mock test series to further support your
                preparation and boost your confidence.
              </p>
            </div>
            <div className="text-end  mx-5">
              <a className="btn theme-btn" href="/jee">
                Continue
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WhatNext;
