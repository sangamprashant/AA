import { appName } from "@/strings";
import { motion } from "framer-motion";
// import Image from "next/image";
// import { appName } from "../Strings";

const Pricing = () => {
  const items = [
    {
      img: "price/online/class-online-1.svg?cache-control=max-age=31536000",
      title: "Comprehensive Curriculum",
      text: "Our classes cover a wide range of subjects and topics, ensuring a well-rounded education.",
    },
    {
      img: "price/online/class-online-2.svg?cache-control=max-age=31536000",
      title: "Experienced Tutors",
      text: "Our tutors are highly qualified and experienced, providing personalized attention to each student.",
    },
    {
      img: "price/online/class-online-3.svg?cache-control=max-age=31536000",
      title: "Interactive Learning",
      text: "We use interactive tools and methods to make learning engaging and effective.",
    },
    {
      img: "price/online/class-online-4.svg?cache-control=max-age=31536000",
      title: "Regular Assessments",
      text: "Frequent tests and assessments help track progress and identify areas for improvement.",
    },
    {
      img: "price/online/class-online-5.svg?cache-control=max-age=31536000",
      title: "Flexible Scheduling",
      text: "Our classes are scheduled to fit the busy lives of students and parents, with options for weekends and evenings.",
    },
  ];

  return (
    <div className="pricing-class-section">
      <h2 className="pricing-class-title text-center">How {appName} Works</h2>
      <div className="pricing-class-row row align-items-center justify-content-center mt-4">
        <div className="pricing-class-col col-md-5">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="pricing-class-item d-flex gap-3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <img
                src={item.img}
                height={80}
                alt={item.title}
                className="pricing-class-item-image"
              />
              <div>
                <p className="pricing-class-item-title p-0 m-0">{item.title}</p>
                <p className="pricing-class-item-text p-0 m-0">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="pricing-class-img-section col-md-5"
          style={{ backgroundImage: "url(price/pricing-bg.png)" }}
        >
          <motion.video
            src="price/a-to-z-classes.mp4?cache-control=max-age=31536000"
            width="100%"
            className="pricing-class-video"
            initial={{ opacity: 0, x: -50, scale: 0.4 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            loop
            muted
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
