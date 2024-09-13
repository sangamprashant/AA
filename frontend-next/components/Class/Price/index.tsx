// import { Link } from "react-router-dom";
import Link from "next/link";
import Section from "../../Reuse/Section";
import { useClassContext } from "../ClassContext";
import MobilePrice from "./MobilePrice";
import PriceChart from "./PriceChart";

const Price = () => {
  const { classId } = useClassContext();

  const getClassSpecificPrice = (
    classId: string,
    prices: Record<string, string>
  ) => prices[classId] || "N.A";

  const pricePlans = [
    {
      title: "Premium Plan",
      price: getClassSpecificPrice(classId, {
        "1-4": "2648",
        "5": "3100",
        "6": "3100",
        "7": "3100",
        "8": "3100",
        "9": "3517",
        "10": "3517",
        "11": "3933",
        "12": "3933",
      }),
      perMonth: "/month",
      costPerClass: getClassSpecificPrice(classId, {
        "1-4": "126",
        "5": "155",
        "6": "155",
        "7": "155",
        "8": "155",
        "9": "175",
        "10": "175",
        "11": "197",
        "12": "197",
      }),
      perClass: "/class",
    },
    {
      title: "Personalised Plan",
      price: getClassSpecificPrice(classId, {
        "1-4": "8683",
        "5": "9100",
        "6": "9100",
        "7": "9100",
        "8": "9100",
        "9": "9517",
        "10": "9517",
        "11": "9933",
        "12": "9933",
      }),
      perMonth: "/month",
      costPerClass: getClassSpecificPrice(classId, {
        "1-4": "434",
        "5": "434",
        "6": "434",
        "7": "434",
        "8": "434",
        "9": "476",
        "10": "476",
        "11": "496",
        "12": "496",
      }),
      perClass: "/class",
    },
  ];

  const tbodyRows = [
    { label: "Live Classes with teacher", data: ["240", "240"] },
    { label: "Class Frequency", data: ["5/week", "5/week"] },
    {
      label: "Students per class",
      data: ["Up to 7 students", "1 Student exclusively"],
    },
    { label: "Class Duration", data: ["55 mins", "55 mins"] },
    { label: "Complete Homework Help", data: ["✘", "✔"] },
    {
      label: "Teacher Selection",
      data: [
        "Expert teacher",
        "Most suited expert teacher that matches your expectations and the child's needs",
      ],
    },
    {
      label: "Learning Gap Identification",
      data: [
        "Curriculum based",
        `Adapts basis analysis from: <br />- Exam Revisions <br />- Mock Assessments Resulting in comprehensive learning outcomes`,
      ],
    },
    {
      label: "Learning Plan Development",
      data: [
        "Curriculum based",
        "Tailored to your child’s pace and proficiency",
      ],
    },
    {
      label: "Learning Journey Evolution",
      data: [
        "Curriculum based",
        `Scientifically determined by: <br />- Cuemath Aptitude Score for benchmarking <br />- School Performance Understanding`,
      ],
    },
    { label: "Competitive Test Preparation", data: ["✘", "✔"] },
    { label: "Games & Puzzles to build Logical Reasoning", data: ["✔", "✔"] },
    { label: "Modules on real world maths application", data: ["✔", "✔"] },
    { label: "Parent Tutor Meetings", data: ["✔", "Minimum 1/month"] },
    { label: "Dedicated Relationship Manager", data: ["✘", "✔"] },
    {
      label: "Total Price",
      data: [
        `₹ ${getClassSpecificPrice(classId, {
          "1-4": "32,200",
          "5": "37,200",
          "6": "37,200",
          "7": "37,200",
          "8": "37,200",
          "9": "42,200",
          "10": "42,200",
          "11": "47,200",
          "12": "47,200",
        })} <sub>Incl. of all taxes</sub>`,
        `₹ ${getClassSpecificPrice(classId, {
          "1-4": "1,04,200",
          "5": "1,09,200",
          "6": "1,09,200",
          "7": "1,09,200",
          "8": "1,09,200",
          "9": "1,14,200",
          "10": "1,14,200",
          "11": "1,19,200",
          "12": "1,19,200",
        })} <sub>Incl. of all taxes</sub>`,
      ],
    },
  ];

  const samplingImages = [
    {
      src: "price/flexible.png",
      title: "Flexible & custom classes",
      desc: "Change teacher, class schedules, & plan leaves",
    },
    {
      src: "price/user.png",
      title: "Dedicated relationship manager",
      desc: "Your point-of-contact for any assistance regarding online class 5 maths classes",
    },
    {
      src: "price/cash.png",
      title: "No-questions-asked refund policy",
      desc: "Not satisfied? Get refund for the remaining classes",
    },
  ];

  if (!classId) return null;

  return (
    <Section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="text-center">
            <h2>Price Packages for Online Maths Classes for Class {classId}</h2>
            <p>
              For classes 1-12, we recommend 5 classes per week. Each of our
              online maths
              <br /> classes for class {classId} is a 55-minute live class with
              a dedicated teacher.
            </p>
          </div>
          <div className="price-main-container big-screen">
            <div className="price-table px-5">
              <div className="table-responsive mt-5">
                <table className="table p-0">
                  <colgroup className="colgroup"></colgroup>
                  <colgroup className="colgroup"></colgroup>
                  <colgroup className="colgroup"></colgroup>
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      {pricePlans.map((plan, index) => (
                        <th key={index}>
                          <h2>{plan.title}</h2>
                          <h4>
                            ₹ {plan.price}
                            <sub>{plan.perMonth}</sub>
                          </h4>
                          <p>
                            ~₹ {plan.costPerClass}
                            <sub>{plan.perClass}</sub>
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="mt-3">
                    {tbodyRows.map((row, index) => (
                      <tr key={index}>
                        <th>{row.label}</th>
                        {row.data.map((item, idx) => (
                          <td
                            key={idx}
                            dangerouslySetInnerHTML={{ __html: item }}
                          ></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <PriceChart />
              </div>
            </div>
            <div className="sampling-image">
              {samplingImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={`${image.src}?cache-control=max-age=31536000`}
                    alt={image.title}
                  />
                  <p className="price-title">{image.title}</p>
                  <p className="price-desc">{image.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="price-main-container small-screen mt-4">
            <div className="d-flex flex-column justify-content-center align-items-center">
              {pricePlans.map((data, index) => (
                <MobilePrice
                  key={index}
                  data={data}
                  index={index}
                  tbodyRows={tbodyRows}
                  pricePlans={pricePlans}
                />
              ))}
            </div>
            <PriceChart />
            <div className="sampling-image" style={{ marginTop: "30px" }}>
              {samplingImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={`${image.src}?cache-control=max-age=31536000`}
                    alt={image.title}
                  />
                  <p className="price-title">{image.title}</p>
                  <p className="price-desc">{image.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Link href="/pay" className="btn theme-btn">
            Fill Form to Pay Now
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Price;
