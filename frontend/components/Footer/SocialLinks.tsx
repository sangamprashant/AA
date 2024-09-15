import { socialLinks } from "@/strings";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";

export const socialMediaLinks = [
  {
    platform: "Facebook",
    icon: faFacebook,
    className: "facebook",
    link: socialLinks.facebook,
  },
  {
    platform: "Instagram",
    icon: faInstagram,
    className: "instagram",
    link: socialLinks.instagram,
  },
  {
    platform: "Twitter",
    icon: faTwitter,
    className: "twitter",
    link: socialLinks.twitter,
  },
  {
    platform: "LinkedIn",
    icon: faLinkedin,
    className: "linkedin",
    link: socialLinks.linkedin,
  },
  {
    platform: "YouTube",
    icon: faYoutube,
    className: "youtube",
    link: socialLinks.youtube,
  },
];

const SocialLinks = () => {
  return (
    <motion.div
      className="social-buttons mt-3"
      initial={{ opacity: 1, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {socialMediaLinks.map((link, index) => (
        <Link key={index} className={`btn ${link.className}`} href={link.link}>
          <FontAwesomeIcon icon={link.icon} /> <span>{link.platform}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
