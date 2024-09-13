"use client"
import { motion } from "framer-motion";
import React from "react";
import CountUp from "react-countup";
import { FaCheckCircle } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Footer from "../../Footer";
import { featuresData } from "../../Home/Features";
import Section from "../../Reuse/Section";
import PageHeaders from "../PageHeaders";

const AboutUs: React.FC = () => {
  const listItems = [
    "Our instructors are experienced professionals with a strong background in mathematics, committed to ensuring each student's success.",
    "We offer a comprehensive and up-to-date curriculum that covers all the key areas of mathematics, from basic arithmetic to advanced calculus.",
    "Each student receives a personalized learning plan that is tailored to their unique needs and learning style, ensuring optimal progress.",
    "We employ interactive and engaging teaching methods that make learning mathematics both enjoyable and effective for our students.",
    "Our institute has a proven track record of high student achievement and satisfaction, with many students excelling in their academic pursuits.",
    "We provide state-of-the-art facilities and resources that create an optimal learning environment, enhancing the educational experience.",
    "Regular progress reports and parent-teacher meetings are conducted to ensure that students are on track and achieving their academic goals.",
    "We offer flexible scheduling options to accommodate the busy lives of our students, making it easier for them to attend classes and succeed.",
    "Our extracurricular activities and math clubs are designed to foster a love for mathematics and provide additional learning opportunities.",
    "Scholarship opportunities and financial aid are available for deserving students, ensuring that everyone has access to quality education.",
  ];

  return (
    <>
      <PageHeaders
        title="ABOUT US"
        description="Get Everything You Want to Know about The A to Z Classes"
      />
      <Section className="py-5">
        <article>
          <h1 className="text-center">Who We Are</h1>
          <p>
            At The A to Z Classes, we are passionate about helping students
            excel in math. With years of experience in education, our team is
            dedicated to providing high-quality math instruction tailored to
            meet the needs of each student. We believe in the power of
            personalized learning and strive to create an environment where
            every student can thrive.
          </p>
          <ul className="list-unstyled">
            {listItems.map((item, index) => (
              <li key={index} className="d-flex align-items-start mb-3">
                <FaCheckCircle className="text-success me-2" size="1.5em" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </Section>
      <Section className="py-5">
        <article>
          <h1 className="text-center">What We Do</h1>
          <div className="row">
            <div className="col-md-6">
              <img src="/aboutus/teacher1.jpg" width="100%" alt="Expert" />
            </div>
            <div className="col-md-6">
              <p>
                At The A to Z Classes, we offer a range of math courses designed
                to meet the needs of students at all levels. From foundational
                concepts to advanced topics, our curriculum is comprehensive and
                designed to foster deep understanding and proficiency in math.
                Our interactive and engaging teaching methods ensure that
                students not only learn but also enjoy the process.
              </p>
              <p>
                We provide individualized attention to each student, creating
                personalized learning plans that address their specific
                strengths and areas for improvement. Our goal is to build
                confidence and mastery in math, preparing students for academic
                success and beyond.
              </p>
              <p>
                Our classes are designed to be interactive and student-centered,
                with a focus on problem-solving and critical thinking. We
                incorporate the latest educational technology to enhance the
                learning experience and ensure that our students have access to
                the best resources available.
              </p>
            </div>
          </div>
        </article>
      </Section>
      <Section className="py-5">
        <article>
          <h1 className="text-center">How We Do It</h1>
          <div className="row">
            <div className="col-md-6">
              <p>
                Our teaching methodology is grounded in research and best
                practices in education. We use a variety of instructional
                techniques to cater to different learning styles, including
                direct instruction, collaborative learning, and hands-on
                activities. Our instructors are not only experts in math but
                also skilled educators who know how to make complex concepts
                accessible and understandable.
              </p>
              <p>
                We believe that assessment is a key component of effective
                teaching. We use both formative and summative assessments to
                monitor student progress and adjust instruction as needed. This
                ensures that our students are continuously challenged and
                supported throughout their learning journey.
              </p>
              <p>
                In addition to regular classes, we offer supplemental resources
                such as tutoring, study groups, and online materials. These
                resources provide additional support and enrichment
                opportunities for our students, helping them to achieve their
                full potential in math.
              </p>
            </div>
            <div className="col-md-6">
              <img src="/aboutus/teacher2.jpg" width="100%" alt="Expert" />
            </div>
          </div>
        </article>
      </Section>

      <Section className="py-5">
        <article>
          <h1 className="text-center">The A to Z Classes by the Numbers</h1>
          <div className="about-us-count-container mt-5">
            {featuresData.map((data, index) => {
              return (
                <NumbersCount
                  end={data.end}
                  suffix={data.suffix}
                  title={data.title}
                  key={index}
                />
              );
            })}
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="col-md-10">
              <img
                src="/aboutus/map.webp"
                width="100%"
                alt="Map"
                className="about-map-image"
              />
            </div>
          </div>
        </article>
      </Section>
      <Footer />
    </>
  );
};

export default AboutUs;

interface NumbersCountProps {
  end: number;
  suffix?: string;
  title: string;
}

export const NumbersCount: React.FC<NumbersCountProps> = ({
  end,
  suffix,
  title,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const decimalPlaces = (number: number): number => {
    if (number % 1 !== 0) {
      return number.toString().split(".")[1].length || 0;
    }
    return 0;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center">
        {inView && (
          <h1 className="text-danger display-1">
            <CountUp
              end={end}
              suffix={suffix}
              duration={2}
              decimals={decimalPlaces(end)}
              style={{ color: "var(--theme-color)" }}
            />
          </h1>
        )}
        <h5 className="p-0 m-0">{title}</h5>
      </div>
    </motion.div>
  );
};
