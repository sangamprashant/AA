import React, { useState, useEffect, useRef } from "react";
import "./CarouselComponent.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface CarouselComponentProps {
  children: React.ReactNode[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const transitionDuration = 500;
  const slideDuration = 10000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    }, slideDuration);

    return () => resetTimeout();
  }, [children.length]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = window.setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handlePrevClick = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  return (
    <div className="custom-carousel">
      <div
        className={`custom-carousel-inner ${
          isTransitioning ? "transition" : ""
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div className="custom-carousel-item" key={index}>
            {child}
          </div>
        ))}
      </div>
      <div className="custom-carousel-controls">
        <button onClick={handlePrevClick}>
          <ArrowBackIosIcon />
        </button>
        <button onClick={handleNextClick}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;
