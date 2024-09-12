"use client"
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { scrollToSection } from "../../Reuse/functions";
import { FaCheckCircle } from "react-icons/fa";
import "./youtube.css";

const Try = () => {
  const [active, setActive] = React.useState(0);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  useEffect(() => {
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
        carousel.removeEventListener(
          "slide.bs.carousel",
          updateActiveIndicator
        );
      };
    }
  }, []);

  const scrollToSlide = (slideIndex: number) => {
    setActive(slideIndex);
    const carousel = document.querySelector("#customCarousel1");
    if (carousel) {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const bootstrapCarousel = new bootstrap.Carousel(carousel);
        bootstrapCarousel.to(slideIndex);
      }
    }

  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 3); // Update active index cyclically
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    scrollToSlide(active); // Ensure carousel syncs with active state
  }, [active]);

  const listItems = [
    "Experienced and highly qualified instructors dedicated to student success.",
    "Comprehensive and up-to-date curriculum covering all key areas of math.",
    "Personalized learning plans tailored to individual student needs.",
    "Interactive and engaging teaching methods to enhance understanding.",
    "Proven track record of high student achievement and satisfaction.",
    "State-of-the-art facilities and resources for an optimal learning environment.",
    "Regular progress reports and parent-teacher meetings to ensure student growth.",
    "Flexible scheduling options to accommodate students' busy lives.",
    "Extracurricular activities and math clubs to foster a love for math.",
    "Scholarship opportunities and financial aid for deserving students.",
  ];

  return (
    <div>
      <div className="hero_area">
        <div className="bg-box">
          {!videoLoaded && (
            <img
              src="/home/girl.jpg?cache-control=max-age=31536000"
              className="placeholder-image"
              alt="Loading"
            />
          )}
          <video
            src="/video.mp4?cache-control=max-age=31536000"
            autoPlay
            muted
            loop
            className={videoLoaded ? "show-video" : "hide-video"}
            onLoadedData={handleVideoLoaded}
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
                    <div className="col-md-7 col-lg-6">
                      <div className="detail-box">
                        <h1 className="display-1 text-white">
                          Welcome to{" "}
                          <span className="text-yellow">
                            The A to Z Classes
                          </span>
                        </h1>
                        <ul className="list-unstyled my-3">
                          {listItems.slice(0, 5).map((item, index) => (
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
                    <div className="col-md-7 col-lg-6">
                      <div className="detail-box">
                        <h1 className="display-1">
                          <span>The A To Z Classes</span>
                        </h1>
                        <p className="text-white">
                          Empowering students with knowledge and skills to
                          succeed. <br />
                          Watch our introduction video to learn more about what
                          we offer.
                        </p>
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
                    <div className="col-md-7 col-lg-6">
                      <div className="detail-box">
                        <h1>
                          <span>Best Teachers for You</span>
                        </h1>
                        <ul className="list-unstyled my-3">
                          {listItems.slice(5).map((item, index) => (
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
