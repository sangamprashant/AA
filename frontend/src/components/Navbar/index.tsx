import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { email, phone } from "../Strings";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavItemClick = () => {
    if (window.innerWidth < 992) {
      setIsNavCollapsed(true);
    }
  };

  const handleToggleClick = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        className="navbar navbar-expand-lg position-fixed w-100 sticky-top backdrop-nav no-print"
        data-navbar-on-scroll="data-navbar-on-scroll"
        variants={navItemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <motion.img
              src="/navbar/logo.png?cache-control=max-age=31536000"
              height="60"
              alt="logo"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1 }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={handleToggleClick}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse mt-4 mt-lg-0 ${isNavCollapsed ? "" : "show"
              }`}
          >
            <ul className="navbar-nav ms-auto gap-2 align-items-center justify-content-start">
              <motion.li
                className="nav-item"
                key="about-us"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <Link
                  className="nav-link"
                  to="/about-us"
                  onClick={handleNavItemClick}
                >
                  About Us
                </Link>
              </motion.li>
              <motion.li
                className="nav-item"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <Link
                  to="/contact-us"
                  className="nav-link"
                  onClick={handleNavItemClick}
                >
                  Contact Us
                </Link>
              </motion.li>
              <motion.li
                className="nav-item"
                key="about-us"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <Link
                  className="nav-link"
                  to="/demo-class"
                  onClick={handleNavItemClick}
                >
                  Free Classes
                </Link>
              </motion.li>
              <motion.li
                className="nav-item"
                key="about-us"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <Link
                  className="nav-link"
                  to="/study-material"
                  onClick={handleNavItemClick}
                >
                  Study Materials
                </Link>
              </motion.li>
              <motion.li
                className="nav-item"
                key="mobile number"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <Link
                  className="nav-link btn theme-btn"
                  to={`tel:+91${phone}`}
                  onClick={handleNavItemClick}
                >
                  +91 {phone}
                </Link>
              </motion.li>
              <motion.li
                className="nav-item"
                key="Email"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <Link
                  className="nav-link btn theme-btn"
                  to={`mailto:${email}`}
                  onClick={handleNavItemClick}
                >
                  {email}
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
