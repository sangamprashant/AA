import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import BookClass from "../Home/Book";
import Section from "../Reuse/Section";
import { scrollToSection } from "../Reuse/functions";
import Award from "./Award";
import { useClassContext } from "./ClassContext";
import FreeClass from "./FreeClass";
import Partner from "./Partner";
import Price from "./Price";
import Pricing from "./Pricing";
import TimeLine from "./TimeLine";

const ClassRendering = () => {
  const { classId } = useClassContext();
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  React.useLayoutEffect(() => {
    handleImage(classId || "");
  }, [classId]);

  function handleHomeClick() {
    navigate("/");
  }

  return (
    <>
      <section className="class-section">
        <div className="class-content">
          <div className="container py-5">
            <div className="row align-items-start">
              <div className="col-lg-8">
                {componentRendering(classId, handleHomeClick)}
                <button
                  onClick={() => scrollToSection("demo-class")}
                  className="btn theme-btn"
                >
                  Book a Demo Class
                </button>
              </div>

              <div className="col-lg-4 text-center">
                <motion.img
                  src={`/class/list/${image}`}
                  alt="Image Alt Text"
                  className="img-fluid"
                  initial={{ opacity: 0, x: -50, scale: 0.4 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section className="pt-5">
        <Pricing />
        <FreeClass />
        <TimeLine />
      </Section>
      <Partner />
      <Section className="py-5">
        <Price />
      </Section>
      <Award />
      <Section>
        <BookClass />
      </Section>
      <Footer />
    </>
  );

  async function handleImage(code: string) {
    if (code === "1-4") setImage("1-4.webp");
    else if (code === "5" || code === "6" || code === "7" || code === "8")
      setImage("5-8.png");
    else if (code === "9" || code === "10") setImage("9-10.webp");
    else if (code === "11" || code === "12") setImage("11-12.webp");
  }
};

function componentRendering(classId: string, handleHomeClick: any) {
  if (!classId) return null;

  switch (classId) {
    case "1-4":
      return (
        <p>
          <b>Classes 1 to 4</b> are the foundation years of education. Students
          are learning the basics of reading, writing, and they are also
          developing their social and emotional skills. Take online classes from
          the best teachers who can help your children build a strong
          foundation. Book a free demo class now.
        </p>
      );
    case "5":
      return (
        <p>
          <b>Class 5</b> is a growth year. Students are developing their
          academic skills and making new friends. Take classes from caring
          teachers who can help your child feel supported and challenged. Book a
          demo class now.
        </p>
      );
    case "6":
      return (
        <p>
          <b>Class 6</b> is a year of discovery. Students are learning new
          things and exploring their own potential. Get classes from inspiring
          teachers who can help your children to develop a love of learning. Get
          a free demo class now.
        </p>
      );
    case "7":
      return (
        <p>
          Class 7 is a consolidation year. Students build on previous knowledge
          and develop their own unique interests. Find engaging teachers who
          help your kids learn fun and interactively. We provide the online
          tuition classes with best teachers for class 7 CBSE, IB Board, IGCSE
          Board, State Board & ICSE Students For English, Mathematics, Science,
          Computers, Social Science & Hindi. Book a free demo class Today.
        </p>
      );
    case "8":
      return (
        <p>
          Get the best online tuition for class 8th with experienced Indian
          teachers. We provide tuition to students of CBSE, IB, IGCSE, and all
          state boards with all subjects at affordable prices. Our classes are
          very flexible you can take classes according to your time and
          convenience. Book a free demo class today.
        </p>
      );
    case "9":
      return (
        <p>
          <b>Get the best one-to-one</b> online tuition for class 9 in your
          regional languages. Get solutions from NCERT-based books. Our online
          tutors are highly experienced and provide classes for all subjects and
          boards. Book a free demo class today.
        </p>
      );
    case "10":
      return (
        <>
          <p>
            Are you looking for the best one-to-one classes for Class 10 for all
            subjects? We provide tuition for 10 to help you excel in your
            studies and score well in your examinations.
          </p>
          <p>
            At e-Tuitions, we understand the unique needs of Class 10 students.
            Our online classes for 10th CBSE and all state boards are designed
            to make learning fun and effective.
          </p>

          <p>
            Our experienced online tutors for Class 10 are dedicated to
            providing the best tuition for Class 10 for all subjects at
            affordable prices. They make learning engaging, interactive, and
            easy to understand.
          </p>
          <p>
            We are committed to delivering results. Our students consistently
            achieve top scores in Class 10 exams. Book a free demo class today.
          </p>
        </>
      );

    case "11":
      return (
        <>
          <p>
            Experience the best online tuition for the sciences of physics,
            chemistry, biology, and math with our thorough online tuition.
          </p>
          <p>
            Get a deep understanding of forces and energy, from cells to
            ecosystems, chemical reactions to the periodic table, trigonometric
            functions to permutations and combinations, and more.
          </p>
          <p>Our expert online science tutors make complex concepts simple.</p>
        </>
      );
    case "12":
      return (
        <div className="content-12">
          Are you tired of struggling with Class 12 Science? Imagine a world
          where you can tackle complex subjects with ease and confidence.
          <h5>Act Now to Overcome These Common Pain Points:</h5>
          <ul>
            <li>
              <b>Complex Topics:</b> Do complex scientific theories leave you
              baffled and stressed?
            </li>
            <li>
              <b> Exam Anxiety:</b> Are you worried about your upcoming Class 12
              Science exams?
            </li>
            <li>
              <b>Lack of Personal Attention:</b> Do you feel lost in overcrowded
              classrooms?
            </li>
            <li>
              <b> Confidence Crisis:</b> Has your confidence taken a hit due to
              academic challenges?
            </li>
            <li>
              <b> Academic Excellence:</b> Dreaming of scoring top grades and
              securing a bright future?
            </li>
          </ul>
          <h5>
            <b>Your Solution:</b> Join Our Online Tuition for Class 12 Science
          </h5>
          <p>
            In our online classes, we understand your struggles and are here to
            help you overcome them. Our experienced educators will simplify
            complex topics, banish exam anxiety, and provide the personal
            attention you deserve. You'll leave our classes with newfound
            confidence, ready to excel in your academic journey.
          </p>
          <h3>Why Choose Us:</h3>
          <ul>
            <li>
              <b>Expert Instructors:</b> Our educators are experts in their
              fields, dedicated to your success.
            </li>
            <li>
              <b>Interactive Learning:</b> Engage in live classes, ask
              questions, and clarify doubts in real time.
            </li>
            <li>
              <b> Individualized Support:</b> Receive personalized guidance to
              address your unique needs.
            </li>
            <li>
              <b> Proven Results:</b> Join the ranks of our successful students
              who have aced their Class 12 Science exams.
            </li>
            <li>
              <b>Affordable Prices:</b> We provide the best teachers at
              affordable prices.
            </li>
          </ul>
          <h5>
            Find expert science teachers to help you achieve your academic
            goals.
          </h5>
        </div>
      );
    default:
      return (
        <div className="invalid-class-id">
          <p>
            Invalid class ID provided. Please check the URL or select a valid
            class.
          </p>
          <button onClick={handleHomeClick} className="btn theme-btn">
            Go to Home
          </button>
        </div>
      );
  }
}

export default ClassRendering;
