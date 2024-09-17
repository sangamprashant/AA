"use client"
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { scrollToSection } from "../../Reuse/functions";

const Try = () => {
  const [active, setActive] = React.useState(0);

  useEffect(() => {
    // Browser-specific code here
    const carousel = document.querySelector("#customCarousel1");
    if (carousel) {
      const updateActiveIndicator = (event: any) => {
        const indicators = document.querySelectorAll("[data-slide-to]");
        indicators.forEach((indicator) => {
          indicator.classList.remove("active");
        });
        const activeIndicator = indicators[event.to];
        if (activeIndicator) {
          activeIndicator.classList.add("active");
        }
        setActive(event.to);
      };

      carousel.addEventListener("slide.bs.carousel", updateActiveIndicator);

      return () => {
        carousel.removeEventListener("slide.bs.carousel", updateActiveIndicator);
      };
    }
  }, []);

  const scrollToSlide = (slideIndex: number) => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      setActive(slideIndex);

      const carousel = document.querySelector("#customCarousel1");
      if (carousel) {
        const bootstrap = (window as any).bootstrap;
        if (bootstrap) {
          const bootstrapCarousel = new bootstrap.Carousel(carousel);
          bootstrapCarousel.to(slideIndex);
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToSlide(active);
  }, [active]);

  // const listItems = [
  //   "Experienced and highly qualified instructors dedicated to student success.",
  //   "Comprehensive and up-to-date curriculum covering all key areas of math.",
  //   "Personalized learning plans tailored to individual student needs.",
  //   "Interactive and engaging teaching methods to enhance understanding.",
  //   "Proven track record of high student achievement and satisfaction.",
  //   "State-of-the-art facilities and resources for an optimal learning environment.",
  //   "Regular progress reports and parent-teacher meetings to ensure student growth.",
  //   "Flexible scheduling options to accommodate students' busy lives.",
  //   "Online and in-person classes to suit different learning preferences.",
  //   "Affordable pricing plans to ensure access to quality education for all students.",
  //   "Access to exclusive study materials and practice exams.",
  //   "Supportive learning community fostering collaboration and teamwork.",
  // ];

  const listItems = [
    "Highly qualified instructors",
    "Comprehensive math curriculum",
    "Personalized learning plans",
    "Interactive teaching methods",
    "Proven student success",
    "State-of-the-art facilities",
    "Regular progress reports",
    "Flexible scheduling options",
    "Online and in-person classes",
    "Affordable pricing plans",
    "Exclusive study materials",
    "Supportive learning community",
  ];



  return (
    <div>
      <div className="hero_area">
        <div className="bg-box">
          <video
            src="/video.mp4?cache-control=max-age=31536000"
            autoPlay
            muted
            loop
            className="show-video"
          />
        </div>
        <div className="hero-area-bg-color position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"></div>

        <section className="slider_section">
          <div
            id="customCarousel1"
            className="carousel slide carousel-slide"
            data-ride="carousel"
          >
            <div className="carousel-inner align-items-start">
              <div className={`carousel-item ${active === 0 ? "active" : ""}`}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="detail-box">
                        <h1 className="text-white hero-title">
                          Welcome to{" "}
                          <span className="text-yellow">
                            The A to Z Classes
                          </span>
                        </h1>
                        <p className="text-white">
                          Empowering students with knowledge and skills to
                          succeed. <br />
                          Watch our introduction video to learn more about what
                          we offer.
                        </p>
                        <ul className="list-unstyled my-3">
                          {listItems.slice(0, 4).map((item, index) => (
                            <motion.li
                              key={index}
                              className="mt-2 hero-tag-text"
                            >
                              <FaCheckCircle
                                className="text-success me-2"
                                size="1.5em"
                              />
                              {item}
                            </motion.li>
                          ))}
                        </ul>

                        <button
                          className="btn theme-btn btn-lg"
                          onClick={() => scrollToSection("demo-class")}
                        >
                          Join Us
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`carousel-item ${active === 1 ? "active" : ""}`}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="detail-box">
                        <h1 className="hero-title">
                          <span>Best Teachers for You</span>
                        </h1>
                        <ul className="list-unstyled my-3">
                          {listItems.slice(4, 8).map((item, index) => (
                            <motion.li
                              key={index}
                              className="mt-2 hero-tag-text"
                            >
                              <FaCheckCircle
                                className="text-success me-2"
                                size="1.5em"
                              />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                        <div className="btn-box">
                          <motion.button
                            className="btn theme-btn btn-lg"
                            onClick={() => scrollToSection("mentor")}
                          >
                            View Mentors
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`carousel-item ${active === 2 ? "active" : ""}`}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="detail-box">
                        <h1 className="hero-title">
                          <span>The A To Z Classes</span>
                        </h1>

                        <ul className="list-unstyled my-3">
                          {listItems.slice(8, 12).map((item, index) => (
                            <motion.li
                              key={index}
                              className="mt-2 hero-tag-text"
                            >
                              <FaCheckCircle
                                className="text-success me-2"
                                size="1.5em"
                              />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                        <h5 className="lead text-white">
                          Learn mathematics from the best in the field.
                        </h5>
                        <div className="btn-box">
                          <motion.button
                            className="btn theme-btn btn-lg"
                            onClick={() => scrollToSection("mentor")}
                          >
                            View Mentors
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <ol className="carousel-indicators gap-2 list-unstyled">
                <li
                  data-slide-to="0"
                  className={active === 0 ? "active" : ""}
                  onClick={() => scrollToSlide(0)}
                ></li>
                <li
                  data-slide-to="1"
                  className={active === 1 ? "active" : ""}
                  onClick={() => scrollToSlide(1)}
                ></li>
                <li
                  data-slide-to="2"
                  className={active === 2 ? "active" : ""}
                  onClick={() => scrollToSlide(2)}
                ></li>
              </ol>
            </div>
          </div>


        </section>
      </div>
    </div>
  );
};

export default Try;
