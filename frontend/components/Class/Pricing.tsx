import { classes } from "@/assets/links";
import { appName } from "@/strings";
import { motion } from "framer-motion";

const Pricing = () => {
  const items = [
    {
      img: `${classes.price.PRICE_ONLINE_class_online1}?cache-control=max-age=31536000`,
      title: "Comprehensive Curriculum",
      text: "Our classes cover a wide range of subjects and topics, ensuring a well-rounded education.",
    },
    {
      img: `${classes.price.PRICE_ONLINE_class_online2}?cache-control=max-age=31536000`,
      title: "Experienced Tutors",
      text: "Our tutors are highly qualified and experienced, providing personalized attention to each student.",
    },
    {
      img: `${classes.price.PRICE_ONLINE_class_online3}?cache-control=max-age=31536000`,
      title: "Interactive Learning",
      text: "We use interactive tools and methods to make learning engaging and effective.",
    },
    {
      img: `${classes.price.PRICE_ONLINE_class_online4}?cache-control=max-age=31536000`,
      title: "Regular Assessments",
      text: "Frequent tests and assessments help track progress and identify areas for improvement.",
    },
    {
      img: `${classes.price.PRICE_ONLINE_class_online5}?cache-control=max-age=31536000`,
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
                loading="lazy"
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
          style={{ backgroundImage: `url(${classes.priceBg})` }}
        >
          <motion.iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/sNywiSqYeGw?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=sNywiSqYeGw&disablekb=1&fs=0"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={false} // Ensures the fullscreen button is not available
            className="pricing-class-video"
            initial={{ opacity: 0, x: -50, scale: 0.4 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
