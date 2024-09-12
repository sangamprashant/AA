"use client"
import { useEffect } from "react";
import "./mentors.css";

const mentors = [
  {
    name: "Ujjawal Kumar",
    course: "B.Tech(Mechanical)",
    yearsOfExperience: "12+",
    hoursTaught: "13000+",
    imgSrc: "ujjawal.png",
  },
  {
    name: "Km. Kashish",
    course: "B.Sc (Maths), B.Ed",
    yearsOfExperience: "4+",
    hoursTaught: "6000+",
    imgSrc: "kashish.png",
  },
  {
    name: "Suryansh Kumar",
    course: "M.Sc (Maths)",
    yearsOfExperience: "4+",
    hoursTaught: "4000+",
    imgSrc: "suryansh1.png",
  },
];

  const MentorsList = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        const carouselElement = document.getElementById("mentors-list-content");
        if (carouselElement) {
          const bootstrap = (window as any).bootstrap;
          if (bootstrap) {
            const carousel = new bootstrap.Carousel(carouselElement);
            carousel.next();
          }
        }
      }, 3000);

      return () => clearInterval(interval);
    }, []);

  return (
    <div className="col-lg-12 col-md-12 col-sm-12">
      <div id="mentors-list-content" className="carousel slide">
        <div className="carousel-inner">
          {mentors.map((mentor, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div className="row p-4">
                <div className="row align-items-center">
                  <div className="col-sm-12 d-flex justify-content-center mt-2">
                    <div className="mentor-image-container">
                      <img
                        src={`review/mentors/${mentor.imgSrc}?cache-control=max-age=31536000`}
                        className="mentor-image blink img-fluid"
                        width={150}
                        alt={`${mentor.name}'s avatar`}
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
