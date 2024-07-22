import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaymentsIcon from "@mui/icons-material/Payments";
import { Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const FloatButtonComponent: React.FC = () => {
  return (
    <div className="custom-float-button-wrapper no-print">
      <Tooltip title="Fill a payment form to initiate payment">
        <Link
          className="custom-float-button my-2 text-white btn"
          style={{ backgroundColor: "var(--theme-color)" }}
          to="/pay"
        >
          <PaymentsIcon style={{ fontSize: 30 }} />
        </Link>
      </Tooltip>
      <Tooltip title="Connect with us on WhatsApp">
        <Link
          className="custom-float-button"
          to="https://wa.me/919140399023"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faWhatsapp} size="2x" color="white" />
        </Link>
      </Tooltip>
    </div>
  );
};

export default FloatButtonComponent;
