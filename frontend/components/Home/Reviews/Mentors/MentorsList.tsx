"use client";
import { reviewImg } from "@/assets/links";
import { useEffect } from "react";
import "./mentors.css";

const mentors = [
  {
    id: 0,
    name: "Mr. Ujjawal Kumar",
    course: "B.Tech (Mechanical)",
    yearsOfExperience: "12+",
    hoursTaught: "13000+",
    imgSrc: "ujjawal.png",
  },
  {
    id: 1,
    name: "Km. Kashish",
    course: "B.Sc (Maths), B.Ed",
    yearsOfExperience: "4+",
    hoursTaught: "6000+",
    imgSrc: "kashish.png",
  },
  {
    id: 2,
    name: "Mr. Suryansh Kumar",
    course: "M.Sc (Maths)",
    yearsOfExperience: "4+",
    hoursTaught: "4000+",
    imgSrc: "suryansh1.png",
  },
];

const MentorsList = () => {
  useEffect(() => {
    const loadBootstrap = async () => {
      if (typeof window !== "undefined") {
        const { Carousel } = await import("bootstrap/dist/js/bootstrap.bundle.min.js");

        const carouselElement = document.getElementById("mentors-list-content");
        if (carouselElement) {
          new Carousel(carouselElement, {
            interval: 4000,
            pause: false,
            ride: "carousel"
          });
        }
      }
    };

    loadBootstrap();

    return () => {
      const carouselElement = document.getElementById("mentors-list-content");
      if (carouselElement) {
        const bootstrap = (window as any).bootstrap;
        if (bootstrap) {
          const carousel = bootstrap.Carousel.getInstance(carouselElement);
          if (carousel) carousel.dispose();
        }
      }
    };
  }, []);

  return (
    <div className="col-lg-12 col-md-12 col-sm-12">
      <div id="mentors-list-content" className="carousel slide">
        <div className="carousel-inner">
          {mentors.map((mentor, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={mentor.id}
            >
              <div className="row p-4">
                <div className="row align-items-center">
                  <div className="col-sm-12 d-flex justify-content-center mt-2">
                    <div className="mentor-image-container">
                      <img
                        src={`${reviewImg.mentor[mentor.imgSrc]}?cache-control=max-age=31536000`}
                        className="mentor-image blink img-fluid"
                        width={150}
                        alt={`${mentor.name}'s avatar`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div className="t-card">
                  <table className="table table-borderless p-0 m-0">
                    <tbody>
                      <tr className="text-white">
                        <td>
                          <h5 className="text-warning">{mentor.name}</h5>
                          <p>{mentor.course}</p>
                        </td>
                        <td>
                          <h5 className="text-warning">
                            {mentor.yearsOfExperience}
                          </h5>
                          <p>Yrs of exp</p>
                        </td>
                        <td>
                          <h5 className="text-warning">{mentor.hoursTaught}</h5>
                          <p>Hours Taught</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorsList;
