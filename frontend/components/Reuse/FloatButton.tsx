"use client";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaymentsIcon from "@mui/icons-material/Payments";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FloatButtonComponent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  // Check if we are in the browser
  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  useEffect(() => {
    if (isBrowser) {
      setIsActive(true)
      const shown = sessionStorage.getItem("side");
      if (!shown) {
        const timer = setTimeout(() => {
          setIsActive(false);
          sessionStorage.setItem("side", "true");
        }, 5000);
        return () => clearTimeout(timer);
      } else {
        setIsActive(false);
      }
    }
  }, [isBrowser]);

  return (
    <div className="custom-float-button-wrapper no-print">
      <Link
        className={`custom-float-button my-2 text-white ${isActive ? "active" : "no-span"
          }`}
        style={{ backgroundColor: "var(--theme-color)" }}
        href="/pay"
      >
        <span className={`text-white ${isActive ? "d-block" : "text-display"}`}>
          Pay Fees
        </span>
        <PaymentsIcon style={{ fontSize: 30 }} />
      </Link>

      <Link
        className={`custom-float-button ${isActive ? "active" : "no-span"}`}
        href="https://wa.me/+919454509368"
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
