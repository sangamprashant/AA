import Section from "../../../Reuse/Section";
import { motion } from "framer-motion";
import MentorsList from "./MentorsList";

const mentorsData = [
  "Highly qualified and experienced Maths tutors",
  "Passionate about helping students achieve academic goals",
  "In-depth understanding of Maths concepts",
  "Innovative teaching methods to make learning effective and enjoyable",
  "Personalized attention to cater to individual learning styles",
  "Emphasis on developing strong problem-solving skills",
  "Dedicated to helping students excel in Maths",
];

const listVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const Mentors = () => {
  return (
    <Section id="mentor" className="py-5">
      <div className="row align-items-center">
        <motion.div
          className="col-md-5"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <header>
            <motion.h1
              className="mentor-header"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Meet Your Mentors
            </motion.h1>
          </header>
          <motion.article
            className="mentor-content mt-2"
            initial="hidden"
            whileInView="visible"
            variants={listVariants}
            viewport={{ once: true }}
          >
            <ul className="list-unstyled">
              {mentorsData.map((item, index) => (
                <motion.li key={index} variants={itemVariants}>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.article>
        </motion.div>
        <motion.div
          className="col-md-7 mt-2"
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <MentorsList />
        </motion.div>
      </div>
    </Section>
  );
};

export default Mentors;
