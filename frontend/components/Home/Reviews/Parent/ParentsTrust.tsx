import React from "react";
import Section from "../../../Reuse/Section";
import { reviewImg } from "@/assets/links";

interface TrustReason {
  icon: string;
  title: string;
  description: string;
}

const trustReasons: TrustReason[] = [
  {
    icon: "satisfaction.png",
    title: "Highly Qualified Tutors",
    description:
      "We only select the best tutors from the topmost Universities. We do not compromise on the quality of our tutors; hence our tutoring is always the best.",
  },
  {
    icon: "screening.png",
    title: "Careful Tutor Screening",
    description:
      "All our tutors undergo a careful selection process. Each tutor is assessed individually and only those who we feel have the ability to offer high quality of tuition will be chosen.",
  },
  {
    icon: "student.png",
    title: "Grade Improvement",
    description:
      "Our personalized 1-to-1 classes help students to improve grade. Your child receives all the attention they need from our 1-on-1 tutor to get the best grades in class.",
  },
  {
    icon: "funding.png",
    title: "Affordable",
    description:
      "There is no commission for using our service. This advantage makes the tuition more affordable for students by avoiding the extra charges that agencies often impose on top of the tutor's fee.",
  },
];

const ParentsTrust: React.FC = () => {
  return (
    <Section id="parent-trust" className="py-4">
      <div className="parent-trust-content">
        <header>
          <h1 className="text-center display-4">Why Parents Trust Us</h1>
        </header>
        <main className="row">
          {trustReasons.map((reason, index) => (
            <div className=" col-md-6 text-center p-2" key={index}>
              <div className="parent-trust-card">
                <div className="icon">
                  <img
                    src={`${reviewImg.trust[reason.icon]}?cache-control=max-age=31536000`}
                    alt=""
                    width={80} loading="lazy"
                  />
                </div>
                <div className="text-container">
                  <h5 className=" display-6">{reason.title}</h5>
                  <p>{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </Section>
  );
};

export default ParentsTrust;
