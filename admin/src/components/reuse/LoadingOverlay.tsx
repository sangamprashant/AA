import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Loading...",
}) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { loading } = authContext;

  return (
    <div
      className={`position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center transition-opacity ${
        loading ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transition: "opacity 0.3s",
        pointerEvents: loading ? "auto" : "none" // Enable interactions only when loading
      }}
    >
      <div className="bg-white rounded p-4 shadow d-flex align-items-center">
        <div className="spinner-border text-secondary me-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="fs-5 text-secondary">{message}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
