"use client";
import $ from "jquery";
import { useEffect } from "react";
import "slick-carousel";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../Review.css";
import { motion } from "framer-motion";
import Section from "../../../Reuse/Section";
// import Image from "next/image";

const ReviewParent = () => {
  useEffect(() => {
    const $carousel: any = $(".f");

    if ($carousel.length > 0) {
      $carousel.slick({
        slidesToShow: calculateSlidesToShow(),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1200,
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
      if ($carousel.length > 0) {
        $carousel.slick("unslick");
      }
    };
  }, []);

  const calculateSlidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 768) {
        return 2;
      } else if (window.innerWidth > 576) {
        return 2;
      } else {
        return 1;
      }
    }

    return 1;
  };


  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const teamMembers = [
    {
      name: "Joseph",
      photo: "josheph.jpg",
      desc: "The tutors at The A to Z Classes are patient, knowledgeable, and really care about their students' success in math.",
      rating: 4,
    },
    {
      name: "Sunita Singh",
      photo: "sunita.jpg",
      desc: "The A to Z Classes made Math easy and enjoyable for my daughter. Thank you!",
      rating: 5,
    },
    {
      name: "Meena Gupta",
      photo: "meena.jpg",
      desc: "My son's math grades improved significantly after joining The A to Z Classes.",
      rating: 3,
    },
    {
      name: "Rajeev Sharma",
      photo: "rajeev.jpg",
      desc: "Excellent math coaching and great results. Highly recommend The A to Z Classes for anyone struggling with Math.",
      rating: 4,
    },
    {
      name: "Anita Deshmukh",
      photo: "anita.jpg",
      desc: "The environment at The A to Z Classes is very conducive to learning math. The teachers are very approachable and always willing to help.",
      rating: 5,
    },
    {
      name: "Vikram Rao",
      photo: "vikram.jpg",
      desc: "My daughter has gained so much confidence in Math after attending The A to Z Classes. The teachers are fantastic.",
      rating: 4,
    },
    {
      name: "Nisha Patel",
      photo: "nisha.jpg",
      desc: "The A to Z Classes has been a game changer for my son's math performance. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <Section id="parent-review" className="py-5">
      <div className="row align-items-end">
        <motion.div
          className="col-md-3"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <motion.img
              src="review/family.png?cache-control=max-age=31536000"
              alt=""
              className="parent-image-banner"
              initial={{ opacity: 0, y: -90, x: -90 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1, delay: 0 }}
              viewport={{ once: true }}
              loading="lazy"
            />
            <motion.h5
              className="family-review-title m-0 p-0"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              A LOT OF
            </motion.h5>
            <motion.h5
              className="happy m-0 p-0"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            >
              HAPPY
            </motion.h5>
            <motion.h5
              className="parent m-0 p-0"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              viewport={{ once: true }}
            >
              PARENTS
            </motion.h5>
          </div>
        </motion.div>
        <motion.div
          className="col-md-9"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="f">
            {teamMembers.map((member, index) => (
              <article
                className="comandSlider__item"
                key={index}
                style={{ padding: "10px" }}
              >
                <header className="parent-review-card shadow p-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={`review/parents/${member.photo}?cache-control=max-age=31536000`}
                      alt={member.name}
                      className="parent-image shadow" loading="lazy"
                    />
                    <div>
                      <h5 className="p-0 m-0">{member.name}</h5>
                      <div className="star-rating">
                        {renderStars(member.rating)}
                      </div>
                      <p>{member.desc}</p>
                    </div>
                  </div>
                </header>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default ReviewParent;
