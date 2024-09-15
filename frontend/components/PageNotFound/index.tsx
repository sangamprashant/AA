"use client"
import React from "react";
import Footer from "../Footer";
import Section from "../Reuse/Section";
import "./pagenotfound.css";
import Link from "next/link";
// import Image from "next/image";

const PageNotFound = () => {
  const [rotate, setRotate] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotate("spin-earth-on-hover");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "black",
      }}
      className="text-white"
    >
      <Section
        className=" text-white d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="py-5">
          <img
            alt=""
            className="object_rocket object_rocket-2"
            src="/page/rocket.svg"
            width={40}
          />
          <div className="row align-items-center justify-content-center h-100">
            <div className="col-md-6">
              <p className=" display-6 p-0 m-0"> 404! page not found</p>
              <p className="display-4 ">
                The page you are looking for seems imaginary Keep it real!
              </p>
              <Link className="btn theme-btn" href="/">
                Go To Homepage
              </Link>
            </div>

            <div className="col-md-6">
              <div className="objects">
                <div className={`earth-moon ${rotate} `}>
                  <img
                    className="object_earth "
                    src="/page/moon.svg"
                    width={100}
                    alt=""
                  />
                  <img
                    className="object_moon"
                    src="/page/earth.svg"
                    width={80}
                    alt=""
                  />
                </div>
                <div className="box_astronaut">
                  <img
                    className="object_astronaut"
                    src="/page/astronaut.svg"
                    width={140}
                    alt=""
                  />
                </div>
              </div>
              <div className="glowing_stars">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default PageNotFound;
