import React from "react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const FloatButtonComponent: React.FC = () => (
  <div className="custom-float-button-wrapper">
    <Link
      className="custom-float-button"
      to="https://wa.me/919984529509"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => console.log("WhatsApp Float Button Clicked")}
    >
      <FontAwesomeIcon icon={faWhatsapp} size="2x" color="white" />
    </Link>
    <div className="chat-bubble">Chat with us</div>
  </div>
);

export default FloatButtonComponent;
