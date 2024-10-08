import { Collapse, Space } from "antd";
import Section from "../../Reuse/Section";
import { useState } from "react";
import "./faq.css";
import { motion } from "framer-motion";
import { appName, email } from "../../Strings";
import { Link } from "react-router-dom";

const faqData = [
  {
    data: [
      {
        key: "1",
        label: "What are the benefits of online tuition for school students?",
        children: (
          <div>
            <p>
              <b>
                Online tuition can provide several benefits to school students,
                including:
              </b>
            </p>

            <p>
              <b>Convenience and flexibility:</b> Students can attend classes
              with the best teachers from anywhere and at any time, without
              having to travel to a physical location.
            </p>

            <p>
              <b>Personalized learning:</b> Online tuition allows students to
              learn at their own pace and receive individualized attention from
              their teachers. This can help students to better understand
              difficult concepts and improve their academic performance.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "2",
        label: "How does online tuition work?",
        children: (
          <p>
            Online tuition is one-to-one tuition where the tutor and student are
            not in the same room or even the same location. Tutor and student
            connect which allows them to see each other, hear each other, share
            documents, and collaborate on problems together.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "3",
        label: "What subjects can I study through online tuition?",
        children: (
          <p>
            Online tuition is available for a wide range of subjects, including
            Math, Science, Arts, Commerce, and languages. It is also available
            for creative subjects such as music, art, drawing, painting, and
            singing. Students can find experienced teachers for any subject at
            affordable prices.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "4",
        label: "How do I sign up for a demo class?",
        children: (
          <p>
            A student who wants a free demo. simply sign up and choose your
            subject and teacher to start your class.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "5",
        label:
          "Can I access online tuition classes on a tablet or mobile phone?",
        children: (
          <p>
            Yes, you can access online tuition classes on a mobile phone, tablet
            or laptop/desktop.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "6",
        label: "How can online tuition help students prepare for exams?",
        children: (
          <>
            <p>
              Online tuition classes can be an effective medium for students
              preparing for exams, as they can provide them with access to
              additional resources and individualized attention from their
              tutors or teachers.
            </p>

            <p>
              {" "}
              <b>Online tuition can help students with:</b>
            </p>

            <p>
              <b>Identify areas of weakness:</b> Online tutors can help students
              identify areas for improvement and provide targeted feedback and
              guidance.
            </p>

            <p>
              <b>Practice exam techniques:</b> Expert teachers can help students
              develop effective exam-taking strategies and provide practice
              questions and mock exams to prepare.
            </p>
          </>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "7",
        label: `What is ${appName} refund policy?`,
        children: (
          <>
            <p>
              {appName} Refund policy depends on the type of the enrolled
              course.
            </p>
            <ol>
              <li> All Long Term courses/subscriptions - No Refund</li>
              <li>
                Rank Booster/Doubt App/Trimmed Down Products/ Crash Courses
                (JEE/NTSE/Olympiads) - No Refund
              </li>
              <li>
                One-to-One Tuition courses (for regular tuitions in grade 6-12)
                - No refund
              </li>
              <li>
                {appName} Superkids program ( Coding, Reading and other specialty
                classes) - No refund
              </li>
            </ol>
            <p>
              Please refer to the respective course enrolment page for specific
              details on refund policy before enrollment.
            </p>
          </>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "8",
        label: `How can I get a refund? (in cases where applicable)`,
        children: (
          <>
            <p>
              We would love to hear your problem & solve it before you decide to
              quit. However,if you wish to get a refund you can drop an email
              with your course details you want a refund for with your
              registered email id to {email}. Once you drop the email
              the concerned team will connect you. Alternatively, you can chat
              with our team using {appName} chat box.
            </p>
          </>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "9",
        label: `What if I have any concerns related to live classes or other services?`,
        children: (
          <>
            <p>
              You can always reach out to us through chat box "<Link to="/contact-us">Contact Us</Link>" or
              through mail {email} or call on our customer care number
              mentioned on the website and our team will resolve your issues
            </p>
          </>
        ),
      },
    ],
  },
];

const Faq = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);

  const handlePanelChange = (key: string | string[]) => {
    if (key === activeKey) {
      setActiveKey(undefined);
    } else {
      setActiveKey(key as string);
    }
  };

  return (
    <Section className="py-5">
      <div className="shadow p-5 rounded">
        <motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -50, x: -100 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            We Love Solving Doubts.!
          </motion.h2>
          <motion.p
            className="p-0 m-0"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Our team will connect you with the Best Tutors
          </motion.p>
        </motion.div>
        <Space direction="vertical" style={{ width: "100%" }}>
          {faqData.map((item) => (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              key={item.data[0].key}
            >
              <Collapse
                activeKey={activeKey}
                onChange={handlePanelChange}
                accordion
              >
                {item.data.map((data) => (
                  <Collapse.Panel header={data.label} key={data.key}>
                    {data.children}
                  </Collapse.Panel>
                ))}
              </Collapse>
            </motion.div>
          ))}
        </Space>
      </div>
    </Section>
  );
};

export default Faq;
