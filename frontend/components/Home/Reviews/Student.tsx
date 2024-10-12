"use client"
import $ from "jquery";
import { useEffect } from "react";
import "slick-carousel";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Section from "../../Reuse/Section";
import "./Review.css";
import { motion } from "framer-motion";
import { reviewImg } from "@/assets/links";

const ReviewStudent = () => {
  useEffect(() => {
    const $slider: any = $(".tarkikComandSlider");

    if ($slider.length > 0) {
      $slider?.slick({
        slidesToShow: calculateSlidesToShow(),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }

    // Cleanup function to remove slick initialization
    return () => {
      if ($slider.length > 0) {
        $slider?.slick("unslick");
      }
    };
  }, []);

  // Function to calculate initial slides to show
  const calculateSlidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 768) {
        return 3;
      } else if (window.innerWidth > 576) {
        return 2;
      } else {
        return 1;
      }
    }
  
    return 1;
  };
  

  const teamMembers = [
    {
      name: "Drishti Singh",
      role: "Class 10 Math Topper",
      photo: "drishti.jpg",
      desc: "The A to Z Classes maths coaching has exceeded my expectations in every way. I have learned so much about how to solve problems quickly and efficiently, and my math skills have improved significantly. I am so grateful for this coaching and the support of the teachers here.",
    },
    {
      name: "Madhur Arora",
      role: "94% in Maths",
      photo: "madhur.jpg",
      desc: "I used to dread math class, but after taking classes at The A to Z Classes, I have actually started to enjoy it. The techniques and strategies taught here have made math more interesting and accessible to me. I am so grateful for everything I have learned here.",
    },
    {
      name: "Daksh Goyal",
      role: "94% in Maths",
      photo: "daksh.jpg",
      desc: "The teachers at The A to Z Classes are amazing. They are patient, knowledgeable, and really care about their students' success. I have learned so much about how to solve math problems in a shorter amount of time and am now able to tackle even the most difficult problems with confidence.",
    },
    {
      name: "Arhan Bafna",
      role: "Math Enthusiast",
      photo: "arhan.jpg",
      desc: "I was never good at math, but after taking classes at The A to Z Classes, I am now able to solve problems that I never thought I could. The techniques and strategies taught here have made math seem less daunting and more manageable.",
    },
    {
      name: "Sanya Gupta",
      role: "Class 12 Math Topper",
      photo: "sanya.jpg",
      desc: "The math coaching classes at The A to Z Classes have been instrumental in my academic success. The teachers are dedicated and the study material is top-notch. I highly recommend The A to Z Classes to anyone looking to excel in math.",
    },
    {
      name: "Rajesh Kumar",
      role: "95% in Maths",
      photo: "rajesh.jpg",
      desc: "Math was always a challenging subject for me, but the coaching at The A to Z Classes made it much easier to understand. The teachers are very supportive and their teaching methods are excellent.",
    },
    {
      name: "Anjali Verma",
      role: "Class 12 Math Topper",
      photo: "anjali.jpg",
      desc: "The environment at The A to Z Classes is very conducive to learning math. The teachers are very approachable and always willing to help. I am very happy with my progress and would recommend this coaching to everyone.",
    },
    {
      name: "Karan Mehta",
      role: "Topper in Maths",
      photo: "karan.jpg",
      desc: "The A to Z Classes has helped me immensely in understanding complex math concepts. The teachers are very knowledgeable and their practical approach to teaching makes learning fun and interesting.",
    },
  ];

  return (
    <Section className="py-5">
      <header>
        <motion.h1
          className="review-student-header text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          What our Students say about us?
        </motion.h1>
      </header>
      <motion.div
        className="my-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="tarkikComandSlider ">
          {teamMembers.map((member, index) => (
            <article
              className="comandSlider__item "
              key={index}
              style={{ padding: "0 30px" }}
            >
              <header>
                <p>{member.desc}</p>
              </header>
              <div className="d-flex justify-content-center align-items-center gap-4">
                <div className="comandSlider__item_photo spaceship">
                  <img
                    src={`${reviewImg.student[member.photo]}?cache-control=max-age=31536000`}
                    alt={member.name}
                    className="students-photo-review "
                    loading="lazy"
                  />
                </div>
                <div className="comandSlider__item_text">
                  <h5 className="ReviewStudent-name p-0 m-0">{member.name}</h5>
                  <p className="p-0 m-0">{member.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default ReviewStudent;
