"use client"
import { Collapse, Space } from "antd";
import Section from "../../Reuse/Section";
import { useState } from "react";
import "./faq.css";
import { appName, email } from "@/strings";
import Link from "next/link";

const faqData = [
  {
    data: [
      {
        key: "1",
        label: 'What makes "The AtoZ Classes" different from other online math tuition platforms?',
        children: (
          <p>
            At The AtoZ Classes, we don’t just teach math-we build confidence. Every student has a unique way of learning, and we embrace that. Whether your child needs extra practice or a challenge, we tailor our approach to fit them. Our small class sizes, experienced tutors, and interactive methods make learning math enjoyable. We’re not just focused on improving grades—we’re here to help your child fall in love with math and believe in their own abilities.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "2",
        label: "How do the classes work?",
        children: (
          <p>
            We know life can be busy, so we’ve designed our classes to be flexible and easy to join. Your child can log into our live sessions from the comfort of your home, and don’t worry if you miss a class—recordings are available. We keep our sessions interactive, so students can ask questions, solve problems in real-time, and never feel left out. It’s like having a personal tutor right there with them, but online!
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "3",
        label: "Will my child receive individual attention during the sessions?",
        children: (
          <p>
            Yes! We keep our class sizes small for a reason. We believe every student deserves to be heard, and we make sure no question goes unanswered. Our tutors are patient, attentive, and skilled at giving personalized feedback. Your child won’t just be another face in the crowd—they’ll be our priority.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "4",
        label: "How do you handle doubts and queries outside of class hours?",
        children: (
          <p>
            We understand that questions don’t always come up during class—sometimes they pop up late at night or while doing homework. That’s why we’ve set up a special system where students can message us their doubts anytime, and our tutors will get back to them quickly. Plus, we hold regular doubt-clearing sessions to make sure no one is left confused.
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
          "How do you track the progress of students?",
        children: (
          <p>
            We keep parents in the loop every step of the way. After regular assessments, we share detailed reports that highlight your child’s progress. We don’t just focus on grades—we talk about their understanding of concepts, their confidence level, and how we can continue to support their growth. It’s about creating a learning path that works best for your child.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "6",
        label: "Are the classes aligned with the school curriculum?",
        children: (
          <>
            <p>
              Yes, absolutely! We make sure our classes cover everything your child needs to excel in their school exams. Whether your child is studying CBSE, ICSE, or a state board, we’ve got them covered. We also like to go a step further, preparing students not just for their exams, but to truly understand the subject.
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
        label: "What if my child finds math challenging or has math anxiety?",
        children: (
          <p>
            We understand math anxiety—it’s more common than people think. But at The AtoZ Classes, we have a solution. Our tutors are trained not only to teach math but to teach it with patience and compassion. We break down complex concepts into simple, digestible steps. We celebrate small victories, and before your child knows it, they’ll start feeling more confident and less anxious about math. It’s about progress, not perfection!

          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "8",
        label: "How do I enroll my child, and what is the fee structure?",
        children: (
          <p>
            Getting started is easy! You can either fill out the enrollment form on our website, give us a call at 9454509368, or drop us an email at connect@theatozclasses.com. Our fee structure is flexible to fit your needs, and we offer different packages depending on the number of sessions and the class level of your child. We’re always happy to talk and find a plan that works best for you.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "9",
        label: "Do you offer trial classes?",
        children: (
          <p>
            Yes! We understand that choosing the right tutor is important, so we offer a free trial class. This way, you and your child can experience firsthand how we teach and see if it’s a good fit. No pressure, just a chance to explore what we offer.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "10",
        label: "How are your tutors selected?",
        children: (
          <p>
            Our tutors are not just experts in math, they’re experts in teaching it too. We select tutors who are passionate about helping students and have a knack for making math interesting. All our tutors go through a careful screening process to ensure they are not only knowledgeable but also patient, approachable, and dedicated to making sure every student succeeds.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "11",
        label: "How do you ensure my child stays motivated?",
        children: (
          <p>
            We believe in making learning fun! At The AtoZ Classes, we use interactive methods like quizzes, math games, and real-world examples to keep students engaged. We celebrate progress and give constant encouragement. Our goal is to show students that math is not something to fear, but something they can conquer—and maybe even enjoy!
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "12",
        label: "My child is struggling in math. Can your classes really help?",
        children: (
          <p>
            Absolutely! Every student struggles at some point, but that’s exactly why we’re here. We start by understanding where your child is facing difficulties and then build a learning plan around that. Our tutors break down concepts into simple, manageable pieces, so your child doesn’t feel overwhelmed. Step by step, we’ll help them regain confidence and start seeing math in a new light.
          </p>
        ),
      },
    ],
  },
  {
    data: [
      {
        key: "13",
        label: "How do you handle students who are advanced in math and want more challenges?",
        children: (
          <p>
            We love helping students who want to go beyond the curriculum! For those who are ready for more challenges, we offer advanced problem-solving sessions and higher-level concepts. Our tutors work with students individually to push them to reach their full potential, whether that means preparing for competitive exams or just diving deeper into complex topics.
          </p>
        ),
      },
    ],
  },
  // 
  {
    data: [
      {
        key: "14",
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
        key: "15",
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
        key: "16",
        label: `What if I have any concerns related to live classes or other services?`,
        children: (
          <>
            <p>
              You can always reach out to us through chat box "<Link href="/contact-us">Contact Us</Link>" or
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
        <div>
          <h2>
            We Love Solving Doubts.!
          </h2>
          <p className="p-0 m-0">
            Our team will connect you with the Best Tutors
          </p>
        </div>
        <Space direction="vertical" style={{ width: "100%" }}>
          {faqData.map((item) => (
            <div>
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
            </div>
          ))}
        </Space>
      </div>
    </Section>
  );
};

export default Faq;
