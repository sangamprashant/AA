import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaymentsIcon from "@mui/icons-material/Payments";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppProvider";
import { Tooltip } from "antd";

const FloatButtonComponent: React.FC = () => {
  const appContext = useContext(AppContext);

  if (!appContext) return null;
  const { showPayment } = appContext;

  return (
    <div className="custom-float-button-wrapper">
      <Tooltip title="Fill a payment form to initiate payment">
        <button
          className="custom-float-button my-2 text-white btn"
          style={{ backgroundColor: "var(--theme-color)" }}
          onClick={showPayment}
        >
          <PaymentsIcon style={{ fontSize: 30 }} />
        </button>
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
