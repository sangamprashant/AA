import { motion } from "framer-motion";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export const featuresData = [
  {
    end: 10000,
    suffix: "+",
    title: "Students Enrolled",
  },
  {
    end: 50,
    suffix: "+",
    title: "Expert Instructors",
  },
  {
    end: 80,
    suffix: "+",
    title: "Countries",
  },
  {
    end: 99.8,
    suffix: "%",
    title: "Success Rate",
  },
];

const Features: React.FC = () => {
  return (
    <div className="banner-features">
      <div className="row">
        {featuresData.map((feature, index) => (
          <div className="col-md-3" key={index}>
            <div className="bg-white text-dark rounded-2 shadow p-3">
              <NumbersCountFeatures
                end={feature.end}
                suffix={feature.suffix}
                title={feature.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;

interface NumbersCountProps {
  end: number;
  suffix?: string;
  title: string;
}

export const NumbersCountFeatures: React.FC<NumbersCountProps> = ({
  end,
  suffix,
  title,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const decimalPlaces = (number: number): number => {
    if (number % 1 !== 0) {
      return number.toString().split(".")[1].length || 0;
    }
    return 0;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center">
        {inView && (
          <h4 className="display-6 p-0 m-0">
            <CountUp
              end={end}
              suffix={suffix}
              duration={2}
              decimals={decimalPlaces(end)}
              style={{ color: "var(--theme-color)" }}
            />
          </h4>
        )}
        <h5 className="p-0 m-0">{title}</h5>
      </div>
    </motion.div>
  );
};
