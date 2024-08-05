import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaymentsIcon from "@mui/icons-material/Payments";
import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

const FloatButtonComponent: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const shown = sessionStorage.getItem("side");

  useLayoutEffect(() => {
    if (!shown) {
      const timer = setTimeout(() => {
        setIsActive(false);
        sessionStorage.setItem("side", "true");
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setIsActive(false);
    }
  }, []);

  return (
    <div className="custom-float-button-wrapper no-print">
      <Link
        className={`custom-float-button my-2 text-white ${
          isActive ? "active" : "no-span"
        }`}
        style={{ backgroundColor: "var(--theme-color)" }}
        to="/pay"
      >
        <span className={`text-white ${isActive ? "d-block" : "text-display"}`}>
          Pay Fees
        </span>
        <PaymentsIcon style={{ fontSize: 30 }} />
      </Link>

      <Link
        className={`custom-float-button ${isActive ? "active" : "no-span"}`}
        to="https://wa.me/+919454509368"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={`text-white ${isActive ? "d-block" : "text-display"}`}>
          Connect on WhatsApp
        </span>
        <FontAwesomeIcon icon={faWhatsapp} size="2x" color="white" />
      </Link>
    </div>
  );
};

export default FloatButtonComponent;
