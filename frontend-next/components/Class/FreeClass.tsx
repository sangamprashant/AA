import { motion } from "framer-motion";
import Section from "../Reuse/Section";
import { scrollToSection } from "../Reuse/functions";
import { appName } from "@/strings";
// import { appName } from "../Strings";

const FreeClass = () => {
  return (
    <Section className="py-5">
      <div id="free-class">
        <h1 className="free-class-heading">
          Ensure Your Child Learns the Right Way with {appName}!
        </h1>
        <div className="row py-5 justify-content-center">
          <div
            className="col-md-4 d-flex justify-content-center"
            style={{ height: "350px" }}
          >
            <motion.div
              className="free-class-image-background"
              initial={{ rotate: 0 }}
              whileInView={{ rotate: -10 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            ></motion.div>
            <motion.div
              className="free-class-image"
              initial={{ rotate: -15 }}
              whileInView={{ rotate: 10 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
              style={{ backgroundImage: "url(price/free-class.png)" }}
            ></motion.div>
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-between">
            <div>
              <p>
                At {appName}, we offer a holistic learning experience that goes
                beyond traditional teaching methods. Our approach ensures that
                your child gains a strong foundation in mathematics, setting
                them up for long-term success.
              </p>
              <p className="mt-5">
                Our expert tutors focus on personalized learning, making sure
                each student grasps fundamental concepts thoroughly. Early
                mastery of core subject is a key predictor of future academic
                achievement.
              </p>
            </div>
            <div>
              <button
                className="btn theme-btn w-auto"
                onClick={() => scrollToSection("demo-class")}
              >
                Book a Free Class Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FreeClass;
