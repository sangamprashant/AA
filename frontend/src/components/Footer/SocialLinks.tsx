import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const SocialLinks = () => {
  return (
    <motion.div
      className="social-buttons mt-3"
      initial={{ opacity: 0, scale:.9 }}
      whileInView={{ opacity: 1, scale:1 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
    >
      <button className="btn facebook">
        <FontAwesomeIcon icon={faFacebook} /> <span>Facebook</span>
      </button>
      <button className="btn instagram">
        <FontAwesomeIcon icon={faInstagram} /> <span>Instagram</span>
      </button>
      <button className="btn twitter">
        <FontAwesomeIcon icon={faXTwitter} /> <span>Twitter</span>
      </button>
      <button className="btn linkedin">
        <FontAwesomeIcon icon={faLinkedin} /> <span>LinkedIn</span>
      </button>
      <button className="btn youtube">
        <FontAwesomeIcon icon={faYoutube} /> <span>YouTube</span>
      </button>
    </motion.div>
  );
};

export default SocialLinks;
