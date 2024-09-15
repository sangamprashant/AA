import { Timeline } from "antd";
import { motion } from "framer-motion";
import Section from "../Reuse/Section";
import { appName } from "../Strings";

const TimeLine = () => {
  return (
    <Section className="py-5">
      <div id="free-class">
        <motion.h1
          className="free-class-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          Discover the Journey of Learning with {appName}
        </motion.h1>
        <motion.p
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
        >
          At {appName}, our curriculum is designed to nurture curiosity and
          foster academic excellence in a supportive and engaging environment.
          Here’s a glimpse of what our students experience:
        </motion.p>
        <div className="row py-5 justify-content-center">
          <motion.div
            className="col-md-6 d-flex justify-content-center"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <img
              width="100%"
              src="/class/timeline/timeline.gif?cache-control=max-age=31536000"
              alt="Timeline"
            />
          </motion.div>
          <motion.div
            className="col-md-6 d-flex flex-column justify-content-between"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: false }}
          >
            <Timeline
              items={[
                {
                  dot: <p className="p-0 m-0 timeline-dot">1</p>,
                  children: (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      viewport={{ once: false }}
                    >
                      {"Introduction to Core Concepts"}
                    </motion.p>
                  ),
                },
                {
                  dot: <p className="p-0 m-0 timeline-dot">2</p>,
                  children: (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      viewport={{ once: false }}
                    >
                      {"Interactive Learning Modules"}
                    </motion.p>
                  ),
                },
                {
                  dot: <p className="p-0 m-0 timeline-dot">3</p>,
                  children: (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      {"Personalized Worksheets"}
                    </motion.p>
                  ),
                },
                {
                  dot: <p className="p-0 m-0 timeline-dot">4</p>,
                  color: "red",
                  children: (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                      viewport={{ once: false }}
                    >
                      {"Regular Progress Assessments"}
                    </motion.p>
                  ),
                },
                {
                  dot: <p className="p-0 m-0 timeline-dot">5</p>,
                  color: "red",
                  children: (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                      viewport={{ once: false }}
                    >
                      {"Engaging Projects and Activities"}
                    </motion.p>
                  ),
                },
                {
                  dot: <p className="p-0 m-0 timeline-dot">6</p>,
                  color: "red",
                  children: (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.8 }}
                      viewport={{ once: false }}
                    >
                      {"Continuous Support and Guidance"}
                    </motion.p>
                  ),
                },
              ]}
            />
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default TimeLine;
