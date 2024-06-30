import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./youtube.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { scrollToSection } from "../../Reuse/functions";

const Yout = () => {
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });



  return (
    <div className="row align-items-center">
      <div className="col-md-6 mb-2">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.2 }}
          className="card-body"
        >
          <motion.h1
            className="bold-text display-3"
            ref={textRef}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.2 }}
          >
            A To Z Classes
          </motion.h1>

          <p className="lead">
            Empowering students with knowledge and skills to succeed. <br />
            Watch our introduction video to learn more about what we offer.
          </p>
          <motion.button
            className="btn theme-btn btn-lg"
            onClick={() => scrollToSection("mentor")}
            initial={{ opacity: 0, y: 20 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            View Mentors
          </motion.button>
        </motion.div>
      </div>
      <div className="col-md-6 ">
        <div
          className="image-container"
          onClick={() => {
            alert("redirect to youtube");
          }}
        >
          <motion.img
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src="home/video.gif"
            className="img-fluid w-100 cursor-pointer"
          />
          <div className="image-overlay">
            <FontAwesomeIcon icon={faYoutube} className="youtube-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yout;
