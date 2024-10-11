import { logoCrop } from "@/assets/links";
import Link from "next/link";
import Section from "../../Reuse/Section";
import "./whatNext.css";

const WhatNext = () => {
  return (
    <Section id="what-next" className="my-5">
      <div className="d-flex justify-content-center">
        <div className="row shadow-lg what-next-container col-md-10">
          <div className="col-md-4 left d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-center flex-column py-5 my-auto">
              <div className="bg-white rounded-circle p-3 shadow mb-3 blink">
                <img
                  alt=""
                  src={logoCrop}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="rounded-5"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <h2 className="text-center">What's Next?</h2>
              <p className="text-">
                Explore streams and stay ahead in your preparation.
              </p>
            </div>
          </div>
          <div className="col-md-8 p-3">
            <div className="next-steps">
              <h3>For JEE Mains</h3>
              <p>
                At The A to Z Classes, we provide comprehensive JEE preparation resources, including detailed study guides, expert video tutorials, and interactive quizzes designed to help you excel. Access previous years' papers to get comfortable with the exam pattern.
              </p>
              <p>
                Stay tuned for live Q&A sessions, targeted workshops, and a series of mock tests coming soon-all crafted to support your preparation and boost your confidence. Enroll today and start your JEE success journey with us!
              </p>
              <div className="text-end mb-4">
                <Link className="btn theme-btn" href="/jee">
                  Continue JEE Preparation
                </Link>
              </div>
              <h3>For NEET</h3>
              <p>
                At The A to Z Classes, we provide everything you need for NEET preparation to help you excel. Our resources include detailed study materials, expert-led video tutorials, and interactive quizzes tailored to boost your scores. Dive into previous years' papers to familiarize yourself with the exam format.
              </p>
              <p>
                Join us for upcoming live Q&A sessions, specialized workshops, and a series of mock tests designed to enhance your preparation and build your confidence. Start your journey to success with us today!
              </p>
              <div className="text-end">
                <Link className="btn theme-btn" href="/neet">
                  Continue NEET Preparation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WhatNext;
