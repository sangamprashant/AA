import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Hero_Data } from "../../Strings";
import { scrollToSection } from "../../Reuse/functions";

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <div className="row align-items-center">
      <div className="col-md-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.2 }}
          className="card-body"
        >
          <motion.h1
            className="bold-text display-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.2 }}
          >
            {Hero_Data.title.first}{" "}
            <span className="text-yellow">{Hero_Data.title.second}</span>
          </motion.h1>
          <h3 className="my-3 headinggg">{Hero_Data.subTitle}</h3>
          <ul className="list-unstyled my-3">
            {Hero_Data.points.map((point, index) => (
              <motion.li
                key={index}
                className="mt-2 hero-tag-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              >
                <img
                  src="tag.png?cache-control=max-age=31536000"
                  height={30}
                  className="hero-tag-image"
                  alt="tag"
                />
                {point}
              </motion.li>
            ))}
          </ul>
          <p className="lead">{Hero_Data.leadText}</p>
          <button
            className="btn theme-btn btn-lg"
            onClick={() => scrollToSection("demo-class")}
          >
            {Hero_Data.buttonText}
          </button>
        </motion.div>
      </div>
      <div className="col-md-6">
        <motion.img
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          src={Hero_Data.imgSrc}
          alt={Hero_Data.imgAlt}
          className="img-fluid"
        />
      </div>
    </div>
  );
};

export default Hero;
