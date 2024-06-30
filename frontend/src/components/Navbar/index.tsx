import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarCollapseRef = React.useRef<HTMLDivElement>(null);

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleNavItemClick = () => {
    if (window.innerWidth < 992) {
      const collapseElement = navbarCollapseRef.current;
      if (collapseElement && collapseElement.classList.contains("show")) {
        collapseElement.classList.remove("show");
      }
    }
  };

  return (
    <>
      <motion.nav
        className="navbar navbar-expand-lg position-fixed w-100 sticky-top backdrop-nav"
        data-navbar-on-scroll="data-navbar-on-scroll"
        variants={navItemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <motion.img
              src="/navbar/logo.png"
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
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> </span>
          </button>
          <div
            className="collapse navbar-collapse mt-4 mt-lg-0"
            id="navbarSupportedContent"
            ref={navbarCollapseRef}
          >
            <ul className="navbar-nav ms-auto gap-2 align-items-center justify-content-start">
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
                  to="/about-us"
                  onClick={handleNavItemClick}
                >
                  About Us
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
                  to="tel:+919984539509"
                  onClick={handleNavItemClick}
                >
                  +91 9984529509
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
                  to="mailto:srivastavp891@gmail.com"
                  onClick={handleNavItemClick}
                >
                  srivastavp891@gmail.com
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
