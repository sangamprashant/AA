import Section from "../../Reuse/Section";
import ClassList from "./Lists";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Classes = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Array of class numbers from 1 to 12
  const classNumbers = ["1-4", "5", "6", "7", "8", "9", "10", "11", "12"];

  return (
    <Section className="py-5 banner-show">
      <div className="classes-container" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          Classes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Find the best teacher for academic excellence
        </motion.p>
        <div className="classes-grid">
          {classNumbers.map((classNumber, index) => (
            <motion.div
              key={classNumber}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.2 * index + 1 }}
            >
              <ClassList classNumber={classNumber} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Classes;
